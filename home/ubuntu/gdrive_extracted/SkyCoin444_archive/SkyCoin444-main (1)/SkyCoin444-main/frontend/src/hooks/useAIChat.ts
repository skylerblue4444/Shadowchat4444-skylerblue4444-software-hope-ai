import { useState } from 'react';

export const useAIChat = () => {
  const [response, setResponse] = useState('');
  const askAI = async (query: string) => {
    setResponse('🤖 Processing with AI...');
    // Mock AI response
    setResponse(`AI: Based on current market, stake your ${query} SKY444 now for 44.4% APY`);
  };
  return { response, askAI };
};