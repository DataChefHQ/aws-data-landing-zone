/**
* Converts a CIDR notation string to a range of IPv4 addresses.
* @param cidr - The CIDR notation string.
* @returns - An array containing the start and end IPv4 addresses as 32-bit unsigned integers.
* @throws Will throw an error if the input is not a valid CIDR notation string or if the prefix length is invalid.
*/
function cidrToRange(cidr: string): [number, number] {
  const [ip, prefixString] = cidr.split('/');
  if (!ip || !prefixString) {
    throw new Error(`Invalid CIDR notation: ${cidr}`);
  }

  const prefix = parseInt(prefixString, 10);
  if (isNaN(prefix) || prefix < 0 || prefix > 32) {
    throw new Error(`Invalid prefix length: ${prefix}`);
  }

  const ipParts = ip.split('.').map(part => parseInt(part, 10));
  if (ipParts.length !== 4 || ipParts.some(part => part < 0 || part > 255 || isNaN(part))) {
    throw new Error(`Invalid IP address: ${ip}`);
  }
  const ipNumber = ((ipParts[0] << 24) >>> 0) + ((ipParts[1] << 16) >>> 0) + ((ipParts[2] << 8) >>> 0) + (ipParts[3] >>> 0);
  const mask = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;

  const networkStart = (ipNumber & mask) >>> 0;
  const networkEnd = (networkStart | (~mask >>> 0)) >>> 0;

  return [networkStart, networkEnd];
}

/**
 * Converts a 32-bit unsigned integer to its corresponding IPv4 address string.
 *
 * @param ipInt - The IPv4 address as a 32-bit unsigned integer.
 * @returns The IPv4 address in dotted-decimal notation.
 * @throws Will throw an error if the input is not a valid 32-bit unsigned integer.
 */
function intToIp(ipInt: number): string {
  // Validate that the input is a number
  if (typeof ipInt !== 'number' || !Number.isInteger(ipInt)) {
    throw new Error(`Invalid input: ${ipInt}. Input must be an integer.`);
  }

  // Validate that the number is within the IPv4 range
  if (ipInt < 0 || ipInt > 0xFFFFFFFF) {
    throw new Error(`Invalid input: ${ipInt}. Must be between 0 and 4294967295.`);
  }

  // Extract each octet using bitwise operations
  const octet1 = (ipInt >>> 24) & 0xFF;
  const octet2 = (ipInt >>> 16) & 0xFF;
  const octet3 = (ipInt >>> 8) & 0xFF;
  const octet4 = ipInt & 0xFF;

  return `${octet1}.${octet2}.${octet3}.${octet4}`;
}
/**
* Calculates the logarithm base 2 of a number.
*
* @param x - The number to calculate the log for.
* @returns The base-2 logarithm of x.
*/
function log2(x: number): number {
  return Math.log(x) / Math.log(2);
}

/**
* Converts a range of IPv4 addresses (start and end integers) to an array of CIDR notation strings.
*
* @param start - The start of the IPv4 range as a 32-bit unsigned integer.
* @param end - The end of the IPv4 range as a 32-bit unsigned integer.
* @returns An array of CIDR notation strings covering the range.
* @throws Will throw an error if inputs are invalid or if the range cannot be represented.
*/
function rangeToCidr(start: number, end: number): string {
  // Validate inputs
  if (typeof start !== 'number' || !Number.isInteger(start)) {
    throw new Error(`Invalid start: ${start}. Start must be an integer.`);
  }
  if (typeof end !== 'number' || !Number.isInteger(end)) {
    throw new Error(`Invalid end: ${end}. End must be an integer.`);
  }
  if (start < 0 || start > 0xFFFFFFFF) {
    throw new Error(`Start ${start} is out of IPv4 range (0 - 4294967295).`);
  }
  if (end < 0 || end > 0xFFFFFFFF) {
    throw new Error(`End ${end} is out of IPv4 range (0 - 4294967295).`);
  }
  if (start > end) {
    throw new Error(`Start (${start}) cannot be greater than end (${end}).`);
  }

  // Determine the maximum size of the block
  // The number of zero bits at the end of start
  const zeroBits = countTrailingZeroBits(start);
  // Maximum block size based on alignment
  const maxSize = 32 - zeroBits;
  // Number of addresses left in the range
  const remaining = end - start + 1;
  // Find the largest power of two less than or equal to remaining
  let size = 32 - Math.floor(log2(remaining));
  // Choose the larger prefix between alignment and remaining
  const prefix = Math.max(maxSize, size);
  // Add the CIDR block to the list
  return `${intToIp(start)}/${prefix}`;
  // Move to the next block
}

/**
* Counts the number of trailing zero bits in a number.
*
* @param x - The number to count trailing zeros for.
* @returns The number of trailing zero bits.
*/
function countTrailingZeroBits(x: number): number {
  if (x === 0) return 32;
  let count = 0;
  while ((x & 1) === 0) {
    count++;
    x = x >>> 1;
  }
  return count;
}

/**
 * Splits a CIDR notation string into a specified number of blocks.
 *
 * @param cidr The CIDR notation string.
 * @param blockCount an integer representing the number of blocks to split the CIDR into.
 * @returns an array of CIDR notation strings, each representing a block of the original CIDR.
 * @throws Will throw an error if the CIDR cannot be split into the specified number of blocks.
 */
export function splitCIDR(cidr: string, blockCount: number): string[] {
  const CIDRs: string[] = [];

  const [rangeStart, rangeEnd] = cidrToRange(cidr);
  const diff = rangeEnd - rangeStart;
  const blockSize = Math.floor(diff / blockCount);

  if (blockSize === 0) {
    throw new Error(`CIDR ${cidr} cannot be split into ${blockCount} blocks`);
  }

  let blockStart = rangeStart;
  for (let x = 0; x < blockCount; x++) {
    const blockEnd = blockStart + blockSize;
    const blockCidr = rangeToCidr(blockStart, blockEnd);
    const [_, newBlockEnd] = cidrToRange(blockCidr);
    blockStart = newBlockEnd + 1;

    if (newBlockEnd > rangeEnd) {
      throw new Error(`CIDR ${cidr} cannot be split into ${blockCount} invalid block size`);
    }

    CIDRs.push(blockCidr);
  }

  return CIDRs;
}