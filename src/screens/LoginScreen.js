import React, {useState} from 'react';
import {
  Button,
  View,
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

GoogleSignin.configure({
  webClientId:
    '561444294558-n6dqlcn4p8ra18s9l4tihjhqbkqk9dan.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onPressLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }
        if (error.code === 'auth/user-disabled') {
          Alert.alert('User disabled!');
        }

        if (error.code === 'auth/user-not-found') {
          Alert.alert('User not found');
        }
        if (error.code === 'auth/wrong-password') {
          Alert.alert('Wrong password!');
        }
        console.log(error);
      });
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
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
      <Button onPress={onPressLogin} title="Login" />
      <Pressable style={styles.register} onPress={navigateToRegister}>
        <Text>Register</Text>
      </Pressable>
      <Button title="Sign-In with Google" onPress={onGoogleButtonPress} />
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
  register: {
    padding: 10,
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});
