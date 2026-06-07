import React from 'react';
import { ethers } from 'ethers';

const Web3Connect: React.FC = () => {
  const connect = async () => {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    await provider.send('eth_requestAccounts', []);
    alert('✅ Connected to Ethereum Mainnet – SKY444 ready');
  };
  return <button onClick={connect} className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-3xl font-bold">Connect Wallet</button>;
};

export default Web3Connect;