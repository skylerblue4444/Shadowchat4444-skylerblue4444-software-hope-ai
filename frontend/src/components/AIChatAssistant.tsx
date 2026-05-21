import React, { useState } from 'react';

const AIChatAssistant: React.FC = () => {
  const [message, setMessage] = useState('');
  const sendToAI = () => {
    alert(`🤖 AI Assistant: "You have 4,444 SKY444 available to stake at 44.4% APY"`);
    setMessage('');
  };
  return (
    <div className="fixed bottom-8 right-8 bg-[#1a0b3d] rounded-3xl p-6 w-80">
      <h3 className="font-bold mb-4">Shadow AI Assistant</h3>
      <input value={message} onChange={e => setMessage(e.target.value)} className="w-full bg-black/50 p-4 rounded-3xl" placeholder="Ask anything about SKY444..." />
      <button onClick={sendToAI} className="mt-4 w-full bg-purple-600 py-4 rounded-3xl">Send to AI</button>
    </div>
  );
};

export default AIChatAssistant;