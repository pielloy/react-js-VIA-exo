import React from 'react';
import ArmorDisplay from './ArmorDisplay';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default function App () {
  return (
    <View style={styles.container}>
      <ArmorDisplay></ArmorDisplay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

