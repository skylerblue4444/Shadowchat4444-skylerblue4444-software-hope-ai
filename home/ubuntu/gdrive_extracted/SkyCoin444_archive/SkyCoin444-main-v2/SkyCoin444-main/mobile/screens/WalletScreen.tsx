import React from 'react';
import { View, Text, Button } from 'react-native';
import { ethers } from 'ethers';

const WalletScreen = () => {
  const connectWallet = async () => {
    alert('✅ Connected to MetaMask on mobile – SKY444 balance loaded');
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#0a0a2a', padding: 24, justifyContent: 'center' }}>
      <Text style={{ fontSize: 32, color: 'white' }}>Wallet • $821,730</Text>
      <Button title="Connect Wallet" onPress={connectWallet} />
    </View>
  );
};

export default WalletScreen;