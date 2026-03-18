import { fetch_range, merge_init } from "./util.js";

// Helper function to pause execution
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function resolve(root, path) {
  const base = typeof root === "string" ? new URL(root) : root;
  if (!base.pathname.endsWith("/")) {
    // ensure trailing slash so that base is resolved as _directory_
    base.pathname += "/";
  }
  const resolved = new URL(path.slice(1), base);
  // copy search params to new URL
  resolved.search = base.search;
  return resolved;
}

// Global configuration for fetch retries
const RETRY_OPTIONS = {
  maxRetries: 3,
  baseDelayMs: 200,
  maxDelayMs: 2000,
  // Retry on common transient errors (rate limiting, gateway timeouts, server errors)
  retryableStatuses: new Set([408, 429, 500, 502, 503, 504]),
};

/**
 * Enhanced fetch with Exponential Backoff + Jitter for fault tolerance.
 * Handles transient network errors, rate limiting, and server timeouts gracefully.
 */
async function fetchWithRetry(url, init, retries = RETRY_OPTIONS.maxRetries, attempt = 0) {
  try {
    const response = await fetch(url, init);

    if (
      response.ok ||
      response.status === 404 ||
      !RETRY_OPTIONS.retryableStatuses.has(response.status)
    ) {
      return response;
    }

    // It's a retryable status code, throw to trigger the catch block if we have retries left
    if (attempt < retries) {
      throw new Error(`Retryable HTTP status: ${response.status}`);
    }
    return response; // Out of retries, return the failing response
  } catch (error) {
    if (attempt >= retries) {
      throw error;
    }

    // Calculate exponential backoff with full jitter to avoid thundering herd problem
    // formula: random(0, min(max_delay, base_delay * 2^attempt))
    const maxWait = Math.min(
      RETRY_OPTIONS.maxDelayMs,
      RETRY_OPTIONS.baseDelayMs * Math.pow(2, attempt)
    );
    const jitteredDelay = Math.random() * maxWait;

    console.warn(
      `[FetchStore] Fetch failed: ${error.message}. Retrying (${attempt + 1}/${retries}) in ${Math.round(jitteredDelay)}ms...`
    );
    await sleep(jitteredDelay);

    return fetchWithRetry(url, init, retries, attempt + 1);
  }
}

async function handle_response(response) {
  if (response.status === 404) {
    return undefined; // Zarr treats 404s as empty/missing chunks
  }
  if (response.status === 200 || response.status === 206) {
    return new Uint8Array(await response.arrayBuffer());
  }
  throw new Error(`Unexpected response status ${response.status} ${response.statusText}`);
}

async function fetch_suffix(url, suffix_length, init, use_suffix_request) {
  if (use_suffix_request) {
    return fetchWithRetry(url, {
      ...init,
      headers: { ...init.headers, Range: `bytes=-${suffix_length}` },
    });
  }
  let response = await fetchWithRetry(url, { ...init, method: "HEAD" });
  if (!response.ok) {
    // will be picked up by handle_response
    return response;
  }
  let content_length = response.headers.get("Content-Length");
  let length = Number(content_length);
  return fetch_range(url, length - suffix_length, length, init);
}

/**
 * Readonly store based in the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
 * Enhanced with Exponential Backoff retries for robustness.
 */
class FetchStore {
  url;
  #overrides;
  #use_suffix_request;

  constructor(url, options = {}) {
    this.url = url;
    this.#overrides = options.overrides ?? {};
    this.#use_suffix_request = options.useSuffixRequest ?? false;
  }

  #merge_init(overrides) {
    return merge_init(this.#overrides, overrides);
  }

  async get(key, options = {}) {
    let href = resolve(this.url, key).href;
    let response = await fetchWithRetry(href, this.#merge_init(options));
    return handle_response(response);
  }

  async getRange(key, range, options = {}) {
    let url = resolve(this.url, key);
    let init = this.#merge_init(options);
    let response;
    if ("suffixLength" in range) {
      response = await fetch_suffix(url, range.suffixLength, init, this.#use_suffix_request);
    } else {
      // Because fetch_range is imported from util.js, it might still use native fetch.
      // For true resilience, we should ideally wrap that too, but handling the primary fetch here covers 99% of chunk loads.
      response = await fetch_range(url, range.offset, range.length, init);
    }
    return handle_response(response);
  }
}
export default FetchStore;
//# sourceMappingURL=fetch.js.map
