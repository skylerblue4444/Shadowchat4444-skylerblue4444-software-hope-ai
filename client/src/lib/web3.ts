import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
export const publicClient = createPublicClient({ chain: mainnet, transport: http() });
// TODO: Add TRUMP contract ABI and read/write functions