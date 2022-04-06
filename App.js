import React, {useEffect, useCallback, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthScreensStack, HomeScreensStack} from './src/Navigation';

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [isCheckedSignIn, setCheckedSignIn] = useState(false);
  const [user, setUser] = useState();

  // Handle user state changes
  const onAuthStateChanged = useCallback(
    _user => {
      setUser(_user);
      if (!isCheckedSignIn) {
        setCheckedSignIn(true);
      }
    },
    [isCheckedSignIn],
  );

  useEffect(() => {
    if (isCheckedSignIn) {
      // Hide splash screen
    }
  }, [isCheckedSignIn]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  if (!isCheckedSignIn) {
    return null;
  }

  return (
    <NavigationContainer>
      {user ? <HomeScreensStack /> : <AuthScreensStack />}
    </NavigationContainer>
  );
}
