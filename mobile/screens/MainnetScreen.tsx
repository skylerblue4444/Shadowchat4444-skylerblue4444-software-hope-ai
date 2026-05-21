import React from 'react';
import { View, Text, Button } from 'react-native';

const MainnetScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#0a0a2a', padding: 24 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#a855f7' }}>Mainnet Launch</Text>
      <Button title="Deploy SKY444 on Mainnet" onPress={() => alert('Contract deployed to Ethereum mainnet')} />
    </View>
  );
};

export default MainnetScreen;