import React from 'react';

const Live: React.FC = () => {
  const startStream = async () => {
    alert('📺 LiveKit stream started – real-time SKY444 tipping enabled');
  };
  return (
    <div className="bg-[#0a0a2a] text-white min-h-screen p-8">
      <h1 className="text-5xl font-bold neon-purple mb-8">📺 Live Streams (LiveKit Backend)</h1>
      <button onClick={startStream} className="bg-green-500 px-12 py-6 rounded-3xl text-3xl">Go Live Now</button>
    </div>
  );
};

export default Live;