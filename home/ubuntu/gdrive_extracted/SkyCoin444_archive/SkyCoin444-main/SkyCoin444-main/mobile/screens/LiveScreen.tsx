import React from 'react';
import { View, Text, Button } from 'react-native';

const LiveScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#0a0a2a', padding: 24 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#a855f7' }}>LiveKit Streaming</Text>
      <Button title="Start Live Stream" onPress={() => alert('LiveKit stream active with SKY444 tips')} />
    </View>
  );
};

export default LiveScreen;