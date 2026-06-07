import React from 'react';
import { View, Text, FlatList } from 'react-native';

const FeedScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#0a0a2a', padding: 24 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#a855f7' }}>AI-Ranked Feed</Text>
      <FlatList data={[{id: '1', text: 'Building the future with SKY444'}]} renderItem={({item}) => <Text style={{color: 'white', marginVertical: 12}}>{item.text}</Text>} />
    </View>
  );
};

export default FeedScreen;