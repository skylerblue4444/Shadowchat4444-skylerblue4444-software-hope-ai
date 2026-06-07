import React from 'react';

const Wallet: React.FC = () => {
  return (
    <div className="p-8 bg-[#0a0a2a] text-white">
      <h1 className="text-4xl font-bold">Wallet – $821,730</h1>
      <button className="mt-8 bg-purple-600 px-8 py-4 rounded-3xl">Connect MetaMask</button>
    </div>
  );
};

export default Wallet;