export function strip_prefix(path) {
  // @ts-expect-error - TS can't infer this type correctly
  return path.slice(1);
}
export function uri2href(url) {
  let [protocol, rest] = (typeof url === "string" ? url : url.href).split("://");
  if (protocol === "https" || protocol === "http") {
    return url;
  }
  if (protocol === "gc") {
    return `https://storage.googleapis.com/${rest}`;
  }
  if (protocol === "s3") {
    return `https://s3.amazonaws.com/${rest}`;
  }
  throw Error(`Protocol not supported, got: ${JSON.stringify(protocol)}`);
}

// Global configuration for fetch retries
const RETRY_OPTIONS = {
  maxRetries: 3,
  baseDelayMs: 200,
  maxDelayMs: 2000,
  // Retry on common transient errors (rate limiting, gateway timeouts, server errors)
  retryableStatuses: new Set([408, 429, 500, 502, 503, 504]),
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

    // Calculate exponential backoff with full jitter
    const maxWait = Math.min(
      RETRY_OPTIONS.maxDelayMs,
      RETRY_OPTIONS.baseDelayMs * Math.pow(2, attempt)
    );
    const jitteredDelay = Math.random() * maxWait;

    console.warn(
      `[Zarrita Storage] Fetch failed: ${error.message}. Retrying (${attempt + 1}/${retries}) in ${Math.round(jitteredDelay)}ms...`
    );
    await sleep(jitteredDelay);

    return fetchWithRetry(url, init, retries, attempt + 1);
  }
}

export function fetch_range(url, offset, length, opts = {}) {
  if (offset !== undefined && length !== undefined) {
    // merge request opts
    opts = {
      ...opts,
      headers: {
        ...opts.headers,
        Range: `bytes=${offset}-${offset + length - 1}`,
      },
    };
  }
  return fetchWithRetry(url, opts);
}
export function merge_init(storeOverrides, requestOverrides) {
  // Request overrides take precedence over storeOverrides.
  return {
    ...storeOverrides,
    ...requestOverrides,
    headers: {
      ...storeOverrides.headers,
      ...requestOverrides.headers,
    },
  };
}
/**
 * Make an assertion.
 *
 * Usage
 * @example
 * ```ts
 * const value: boolean = Math.random() <= 0.5;
 * assert(value, "value is greater than than 0.5!");
 * value // true
 * ```
 *
 * @param expression - The expression to test.
 * @param msg - The optional message to display if the assertion fails.
 * @throws an {@link Error} if `expression` is not truthy.
 */
export function assert(expression, msg = "") {
  if (!expression) throw new Error(msg);
}
//# sourceMappingURL=util.js.map
