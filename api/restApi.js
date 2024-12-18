import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to retrieve the token asynchronously
const getToken = async () => {
  const token = await AsyncStorage.getItem('userToken');
  return token;
};

// Axios instance configuration
const api = axios.create({
  baseURL: 'http://54.254.164.127/api/v1'
});

export const fetchUser = async () => {
  try {
    const response = await api.get('/users/me', {
      headers: { Authorization: `Bearer ${token}`},
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 500) {
      console.error(error.response.data)
      throw new Error('Failed to fetch user');
    }
    return error.response.data;
  }
}; 

// Function to fetch transactions
export const fetchTransactions = async () => {
  const token = await AsyncStorage.getItem('userToken')

  try {
    const response = await api.get('/transactions', {
      headers: { Authorization: `Bearer ${token}`}
    })
    return response.data;
  } catch (error) {
    if (error.response.status === 500) {
      console.error(error.response.data)
      throw new Error('Failed to fetch transactions');
    }

    return error.response.data
  }
};

export const createTransactions = async (data) => {
  const token = await AsyncStorage.getItem('userToken')

  try {
    const response = await api.post('/transcations', data, {
      headers: { Authorization: `Bearer ${token}`},
    });
  return response.data;
} catch (error) {
  if (error.response.status === 500) {
    console.error(error.response.data);
    throw new Error('Failed to Create Transaction')
  }
  return error.response.data
  }
}

// Function to fetch posts
export const fetchPosts = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch posts');
  }
};

// Function to create a post
export const createPost = async (postData) => {
  try {
    const response = await api.post('/auth/users', postData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create post: ' + error.message);
  }
};

// Login function with token retrieval logging
export const login = async (email, password) => {
  try {
    const body = {
      email: email,
      password: password
    };
    const response = await api.post('/auth/login', body);
    return response.data;
  } catch (error) {
    if (error.response.status === 500) {
      console.error(error.response.data)
      throw new Error('Failed to login');
    }

    return error.response.data
  }
};

// Register function to create a new user
export const register = async (fullname, email, password, avatar) => {
  console.log(name, email, password, avatar);
  try {
    const body = {
      full_name: fullname,
      email: email,
      password: password,
      phone_number: avatar
    };
    const response = await api.post('/auth/register', body);
    return response.data;
  } catch (error) {
    // console.error('Registration Error:', error.response?.data);
    // throw new Error(error.response?.data?.error || 'Registration failed');
    if (error.response.status === 500) {
      console.error(error.response.data);
      throw new Error('Failed to register')
    }
    
    return error.response.data;
  }
};

export default api;
