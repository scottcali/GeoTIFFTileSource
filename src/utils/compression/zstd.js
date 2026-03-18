// Import from the base package
import { ZSTDDecoder } from 'zstddec';

// Import from the stream path (mapped to the same or specific file)
import { ZSTDDecoder as ZSTDStreamDecoder } from 'zstddec/stream';
//import { ZSTDDecoder } from 'zstddec/stream';
import BaseDecoder from './basedecoder.js';

export const zstd = new ZSTDDecoder();

export default class ZstdDecoder extends BaseDecoder {
  
  decodeBlock(buffer) {
    return zstd.decode(new Uint8Array(buffer)).buffer;
  }
}
