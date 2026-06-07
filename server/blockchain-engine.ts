/**
 * SkyCoin444 Blockchain Engine
 * Production-Grade Web3 Integration
 * Multi-Chain Support: Ethereum, Polygon, BSC, Arbitrum, Optimism, Avalanche
 */

import { ethers } from 'ethers';
import { EventEmitter } from 'events';

// ============================================================================
// BLOCKCHAIN PROVIDER MANAGER
// ============================================================================

interface ChainConfig {
  name: string;
  chainId: number;
  rpcUrl: string;
  explorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

interface SmartContractConfig {
  address: string;
  abi: any[];
  name: string;
}

class BlockchainProviderManager extends EventEmitter {
  private providers: Map<string, ethers.JsonRpcProvider> = new Map();
  private signers: Map<string, ethers.Wallet> = new Map();
  private contracts: Map<string, ethers.Contract> = new Map();

  private chains: Record<string, ChainConfig> = {
    ethereum: {
      name: 'Ethereum Mainnet',
      chainId: 1,
      rpcUrl: process.env.ETH_RPC_URL || 'https://eth-mainnet.g.alchemy.com/v2/demo',
      explorerUrl: 'https://etherscan.io',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    },
    polygon: {
      name: 'Polygon',
      chainId: 137,
      rpcUrl: process.env.POLYGON_RPC_URL || 'https://polygon-rpc.com',
      explorerUrl: 'https://polygonscan.com',
      nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    },
    bsc: {
      name: 'Binance Smart Chain',
      chainId: 56,
      rpcUrl: process.env.BSC_RPC_URL || 'https://bsc-dataseed.bnbchain.org',
      explorerUrl: 'https://bscscan.com',
      nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    },
    arbitrum: {
      name: 'Arbitrum One',
      chainId: 42161,
      rpcUrl: process.env.ARBITRUM_RPC_URL || 'https://arb1.arbitrum.io/rpc',
      explorerUrl: 'https://arbiscan.io',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    },
    optimism: {
      name: 'Optimism',
      chainId: 10,
      rpcUrl: process.env.OPTIMISM_RPC_URL || 'https://mainnet.optimism.io',
      explorerUrl: 'https://optimistic.etherscan.io',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    },
    avalanche: {
      name: 'Avalanche C-Chain',
      chainId: 43114,
      rpcUrl: process.env.AVALANCHE_RPC_URL || 'https://api.avax.network/ext/bc/C/rpc',
      explorerUrl: 'https://snowtrace.io',
      nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
    },
  };

  /**
   * Initialize provider for a chain
   */
  initializeProvider(chainName: string): ethers.JsonRpcProvider {
    const chain = this.chains[chainName];
    if (!chain) throw new Error(`Chain ${chainName} not supported`);

    if (this.providers.has(chainName)) {
      return this.providers.get(chainName)!;
    }

    const provider = new ethers.JsonRpcProvider(chain.rpcUrl);
    this.providers.set(chainName, provider);
    this.emit('provider:initialized', { chain: chainName, chainId: chain.chainId });

    return provider;
  }

  /**
   * Create signer for transaction signing
   */
  createSigner(chainName: string, privateKey: string): ethers.Wallet {
    const provider = this.initializeProvider(chainName);
    const wallet = new ethers.Wallet(privateKey, provider);

    this.signers.set(`${chainName}:${wallet.address}`, wallet);
    this.emit('signer:created', { chain: chainName, address: wallet.address });

    return wallet;
  }

  /**
   * Get provider for chain
   */
  getProvider(chainName: string): ethers.JsonRpcProvider {
    return this.initializeProvider(chainName);
  }

  /**
   * Deploy smart contract
   */
  async deployContract(
    chainName: string,
    signerKey: string,
    bytecode: string,
    abi: any[] = [],
    constructorArgs: any[] = []
  ): Promise<ethers.Contract> {
    const signer = this.signers.get(signerKey);
    if (!signer) throw new Error('Signer not found');

    try {
      const factory = new ethers.ContractFactory(abi, bytecode, signer);
      const contract = await factory.deploy(...constructorArgs);
      await contract.waitForDeployment();

      const contractKey = `${chainName}:${await contract.getAddress()}`;
      this.contracts.set(contractKey, contract);

      this.emit('contract:deployed', {
        chain: chainName,
        address: await contract.getAddress(),
      });

      return contract;
    } catch (error) {
      this.emit('contract:deployment:failed', { chain: chainName, error });
      throw error;
    }
  }

  /**
   * Load existing contract
   */
  loadContract(
    chainName: string,
    contractAddress: string,
    abi: any[]
  ): ethers.Contract {
    const provider = this.initializeProvider(chainName);
    const contract = new ethers.Contract(contractAddress, abi, provider);

    const contractKey = `${chainName}:${contractAddress}`;
    this.contracts.set(contractKey, contract);

    return contract;
  }

  /**
   * Call contract read function
   */
  async callContractFunction(
    chainName: string,
    contractAddress: string,
    functionName: string,
    args: any[] = []
  ): Promise<any> {
    const contractKey = `${chainName}:${contractAddress}`;
    let contract = this.contracts.get(contractKey);

    if (!contract) {
      throw new Error('Contract not loaded. Use loadContract first.');
    }

    try {
      const result = await (contract as any)[functionName](...args);
      return result;
    } catch (error) {
      this.emit('contract:call:failed', { chain: chainName, contractAddress, functionName, error });
      throw error;
    }
  }

  /**
   * Execute contract write function (transaction)
   */
  async executeContractFunction(
    chainName: string,
    contractAddress: string,
    functionName: string,
    signerKey: string,
    args: any[] = [],
    options: any = {}
  ): Promise<ethers.ContractTransactionResponse | null> {
    const signer = this.signers.get(signerKey);
    if (!signer) throw new Error('Signer not found');

    const provider = this.initializeProvider(chainName);
    const abi = []; // Should be provided or cached

    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
      const tx = await contract[functionName](...args, options);
      const receipt = await tx.wait();

      this.emit('contract:transaction:confirmed', {
        chain: chainName,
        contractAddress,
        functionName,
        txHash: tx.hash,
      });

      return tx;
    } catch (error) {
      this.emit('contract:transaction:failed', { chain: chainName, contractAddress, functionName, error });
      throw error;
    }
  }

  /**
   * Get account balance
   */
  async getBalance(chainName: string, address: string): Promise<string> {
    const provider = this.initializeProvider(chainName);
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  }

  /**
   * Get token balance (ERC20)
   */
  async getTokenBalance(
    chainName: string,
    tokenAddress: string,
    userAddress: string,
    abi: any[]
  ): Promise<string> {
    const contract = this.loadContract(chainName, tokenAddress, abi);
    const balance = await contract.balanceOf(userAddress);
    return ethers.formatEther(balance);
  }

  /**
   * Send transaction
   */
  async sendTransaction(
    chainName: string,
    signerKey: string,
    to: string,
    amount: string
  ): Promise<string> {
    const signer = this.signers.get(signerKey);
    if (!signer) throw new Error('Signer not found');

    try {
      const tx = await signer.sendTransaction({
        to,
        value: ethers.parseEther(amount),
      });

      const receipt = await tx.wait();

      this.emit('transaction:confirmed', {
        chain: chainName,
        from: signer.address,
        to,
        amount,
        txHash: tx.hash,
      });

      return tx.hash;
    } catch (error) {
      this.emit('transaction:failed', { chain: chainName, to, amount, error });
      throw error;
    }
  }

  /**
   * Listen to contract events
   */
  listenToContractEvents(
    chainName: string,
    contractAddress: string,
    eventName: string,
    abi: any[],
    callback: (event: any) => void
  ): void {
    const contract = this.loadContract(chainName, contractAddress, abi);

    contract.on(eventName, (...args: any[]) => {
      callback({
        chain: chainName,
        event: eventName,
        data: args,
      });
    });

    this.emit('event:listener:registered', { chain: chainName, contractAddress, eventName });
  }

  /**
   * Get transaction status
   */
  async getTransactionStatus(chainName: string, txHash: string): Promise<any> {
    const provider = this.initializeProvider(chainName);
    const receipt = await provider.getTransactionReceipt(txHash);

    if (!receipt) {
      return { status: 'pending', confirmations: 0 };
    }

    const blockNumber = await provider.getBlockNumber();
    const confirmations = blockNumber - receipt.blockNumber;

    return {
      status: receipt.status === 1 ? 'confirmed' : 'failed',
      confirmations,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed.toString(),
    };
  }

  /**
   * Get supported chains
   */
  getSupportedChains(): Record<string, ChainConfig> {
    return this.chains;
  }

  /**
   * Get chain info
   */
  getChainInfo(chainName: string): ChainConfig | null {
    return this.chains[chainName] || null;
  }
}

// ============================================================================
// TOKEN MANAGER
// ============================================================================

interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  chainId: number;
}

class TokenManager extends EventEmitter {
  private tokens: Map<string, TokenInfo> = new Map();
  private blockchainManager: BlockchainProviderManager;

  constructor(blockchainManager: BlockchainProviderManager) {
    super();
    this.blockchainManager = blockchainManager;
  }

  /**
   * Register token
   */
  registerToken(
    chainName: string,
    address: string,
    name: string,
    symbol: string,
    decimals: number,
    totalSupply: string
  ): TokenInfo {
    const chain = this.blockchainManager.getChainInfo(chainName);
    if (!chain) throw new Error(`Chain ${chainName} not supported`);

    const token: TokenInfo = {
      address,
      name,
      symbol,
      decimals,
      totalSupply,
      chainId: chain.chainId,
    };

    const key = `${chainName}:${address}`;
    this.tokens.set(key, token);

    this.emit('token:registered', token);
    return token;
  }

  /**
   * Get token info
   */
  getTokenInfo(chainName: string, tokenAddress: string): TokenInfo | null {
    const key = `${chainName}:${tokenAddress}`;
    return this.tokens.get(key) || null;
  }

  /**
   * Get all tokens on chain
   */
  getChainTokens(chainName: string): TokenInfo[] {
    return Array.from(this.tokens.values()).filter((t) => {
      const chain = this.blockchainManager.getChainInfo(chainName);
      return chain && t.chainId === chain.chainId;
    });
  }
}

export {
  BlockchainProviderManager,
  TokenManager,
  ChainConfig,
  SmartContractConfig,
  TokenInfo,
};
