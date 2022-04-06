import React, {useState} from 'react';
import {Button, View, StyleSheet, TextInput, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onPressSignUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }
        console.warn(error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={email}
        placeholder="Email"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        value={password}
        secureTextEntry
        placeholder="Password"
        onChangeText={setPassword}
      />
      <Button onPress={onPressSignUp} title="Register" />
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
  input: {
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});
