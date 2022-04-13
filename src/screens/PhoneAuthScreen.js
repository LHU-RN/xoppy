import React, {useState, useEffect} from 'react';
import {Button, View, StyleSheet, TextInput, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

export default function PhoneAuthScreen() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [lastGetOtp, setLastGetOtp] = useState(null);
  const [countDown, setCountDown] = useState(0);

  const [confirm, setConfirm] = useState(null);

  async function signInWithPhoneNumber() {
    const confirmation = await auth().signInWithPhoneNumber(
      phone.replace(/^0/, '+84'),
    );
    setConfirm(confirmation);
  }

  async function onPressLogin() {
    try {
      await confirm.confirm(otp);
    } catch (error) {
      console.log(error);
      console.log('Invalid code.');
    }
  }

  const onPressGetCode = () => {
    setCountDown(60);
    setLastGetOtp(new Date());
    signInWithPhoneNumber();
  };

  useEffect(() => {
    if (lastGetOtp !== null) {
      const interval = setInterval(() => {
        const diff = Math.floor(
          (new Date().getTime() - lastGetOtp.getTime()) / 1000,
        );
        const _countDown = 60 - diff;
        setCountDown(_countDown);
        if (_countDown <= 0) {
          clearInterval(interval);
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [lastGetOtp]);

  return (
    <View style={styles.container}>
      <View style={styles.phoneNumberContainer}>
        <TextInput
          style={styles.input}
          value={phone}
          placeholder="Phone number"
          keyboardType="phone-pad"
          onChangeText={setPhone}
        />
        <Pressable
          disabled={countDown > 0}
          onPress={onPressGetCode}
          style={styles.getCode}>
          <Text style={styles.getCodeText}>
            {countDown > 0 ? countDown : 'Get code'}
          </Text>
        </Pressable>
      </View>
      <TextInput
        style={styles.input}
        value={otp}
        keyboardType="numeric"
        placeholder="OTP"
        maxLength={6}
        onChangeText={setOtp}
      />
      <Button onPress={onPressLogin} title="Login" />
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
  phoneNumberContainer: {
    position: 'relative',
  },
  getCode: {
    position: 'absolute',
    right: 0,
    top: 20,
    bottom: 20,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  getCodeText: {
    color: 'blue',
  },
});
