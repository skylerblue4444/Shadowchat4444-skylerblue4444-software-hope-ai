import React, { useState } from 'react';

const Staking: React.FC = () => {
  const [amount, setAmount] = useState(4444);
  return (
    <div className="bg-[#0a0a2a] text-white min-h-screen p-8">
      <h1 className="text-5xl font-bold neon-purple mb-8">Stake SKY444 – 44.4% APY</h1>
      <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="bg-black/50 p-6 rounded-3xl text-3xl w-full" />
      <button className="mt-8 w-full bg-purple-600 py-8 rounded-3xl text-3xl font-bold">Stake Now</button>
    </div>
  );
};

export default Staking;