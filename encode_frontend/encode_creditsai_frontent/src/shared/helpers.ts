/**
 * Formats an Ethereum address by trimming the middle section and replacing it with dots
 * @param address - The Ethereum address to format
 * @param startChars - Number of characters to show at start (default: 6)
 * @param endChars - Number of characters to show at end (default: 4)
 * @returns Formatted address string
 * @throws Error if address is invalid
 */
export const formatEthAddress = (
  address: string,
  startChars: number = 6,
  endChars: number = 4,
): string => {
  // Basic validation
  if (!address || typeof address !== 'string') {
    throw new Error('Invalid address provided');
  }

  // Remove '0x' prefix if present for consistent handling
  const cleanAddress = address.startsWith('0x') ? address.slice(2) : address;

  // Validate address length (standard ETH address is 40 chars without 0x)
  if (cleanAddress.length !== 40) {
    throw new Error('Invalid Ethereum address length');
  }

  // Validate requested lengths
  if (startChars + endChars >= cleanAddress.length) {
    return address; // Return full address if requested length exceeds address length
  }

  const start = address.slice(0, startChars + 2); // +2 to account for '0x'
  const end = address.slice(-endChars);

  return `${start}...${end}`;
};
