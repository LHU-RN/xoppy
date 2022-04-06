import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

export default function ProfileScreen() {
  const onPressSignOut = () => auth().signOut();

  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      <Button mode="contained" onPress={onPressSignOut}>
        <Text>Logout</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
