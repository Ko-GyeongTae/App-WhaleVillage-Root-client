import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { useEffect, useState } from 'react';
import { AuthProvider } from './AuthContext';
import NavController from './components/NavController';

export default () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const preLoad = async () => {
    try{
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn")
      if(!isLoggedIn || isLoggedIn === "false"){
        const token = await AsyncStorage.getItem("jwt");
        console.log(token);
        setIsLoggedIn(false);

      } else {
        setIsLoggedIn(true);
      } 
    } catch(e) {
      console.log(e);
    }
  };
  useEffect(() => {
    preLoad();
  }, []);
  return (
    <AuthProvider isLoggedIn={isLoggedIn}>
      <NavController />
    </AuthProvider>
  )
};
