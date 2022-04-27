import React from 'react';
import {StyleSheet, View} from 'react-native';
import CategoriesComponent from '../components/HomeScreen/Categories';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <CategoriesComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
});
