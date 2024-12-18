import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(); //untuk membuat konteks yang memungkinkan data tertentu tersedia untuk seluruh komponen yang ada dalam hierarki

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (token) => {
    setUser({ token });
    setIsLoggedIn(true)
    await AsyncStorage.setItem('userToken', token);

  };
  const logout = async () => {
    setUser(null);
    setIsLoggedIn(false)
    await AsyncStorage.removeItem('userToken');
  };
  const fetchTransactions = async (token) => {
    setUser({ token });
    await AsyncStorage.setItem('userToken', token);
  }
  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);