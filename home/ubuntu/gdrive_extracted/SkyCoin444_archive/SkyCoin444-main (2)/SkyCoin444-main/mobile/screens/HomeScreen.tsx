import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#0a0a2a', padding: 24, justifyContent: 'center' }}>
      <Text style={{ fontSize: 48, fontWeight: 'bold', color: '#a855f7', textAlign: 'center' }}>ShadowChat</Text>
      <Button title="Go to Feed" onPress={() => navigation.navigate('Feed')} />
    </View>
  );
};

export default HomeScreen;