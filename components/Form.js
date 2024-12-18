import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { login, register } from '../api/restApi';
import { useAuth } from '../context/AuthContext';

export default function Form({ state }) {
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [errorFullName, setErrorFullName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  
  // const { login: setLoginState } = useAuth();
  // const { register: setRegisterState } = useAuth();
  const navigation = useNavigation();
  const auth = useAuth();


  const validateEmail = () => {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setErrorEmail(validEmail ? '' : 'Email tidak sesuai');
  };

  const validatePassword = () => {
    setErrorPassword(password.length >= 7 ? '' : 'Password kurang dari 7 karakter');
  };

  const validateNama = () => {
    if (state === 'register' && fullname.length < 3) {
      setErrorFullName('Nama harus lebih dari 2 karakter');
    } else {
      setErrorFullName('');
    }
  };

  const validated = async () => {
    validateEmail();
    validatePassword();
    if (state === 'register') validateNama();

    if (!errorEmail && !errorPassword && (!errorFullName || state !== 'register')) {
      if (state === 'register') {
        await handleRegister(fullname, email, password, avatar);
      } else {
        await handleLogin(email, password);
      }
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await login(email, password);
      // setLoginState(token);
      await auth.login(response.data.token);
      console.log(response.data.token)
      alert('Success', 'Login Successful');
      navigation.navigate('Home');
    } catch (error) {
      alert('Error', error.message);
    }
  };

  const handleRegister = async (fullnamename, email, password, avatar) => {
    try {
      const  token  = register(fullnamename, email, password, avatar);
      await auth.login(response.data.token);
      alert('Success', 'Register Successful');
      navigation.navigate('Login');
    } catch (error) {
      alert('Error', error.message);
    }
  };

  const handleSubmitLogin = async (email, password) => {
    if (!email || !password) {
      alert ('Validation Error', 'Email dan Password are required')
      return
    }
    handleLogin(email, password)
  }

  const handleSubmitRegister = async (fullname, email, password, avatar) => {
    if (!email || !password) {
      alert ('Validation Error', 'Email dan Password are required')
      return
    }
    handleRegister(email, fullname, password, avatar)
  }

  return (
    <SafeAreaView>
      {state === 'register' && (
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullname}
          onChangeText={(text) => {
            setName(text);
            validateNama();
          }}
          autoCorrect={false}
          autoCapitalize="none"
        />
      )}
      {errorFullName ? <Text style={styles.error}>{errorFullName}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          validateEmail();
        }}
        autoCorrect={false}
        autoCapitalize="none"
      />
      {errorEmail ? <Text style={styles.error}>{errorEmail}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          validatePassword();
        }}
        autoCorrect={false}
        autoCapitalize="none"
        secureTextEntry
      />
      {errorPassword ? <Text style={styles.error}>{errorPassword}</Text> : null}

      {state === 'register' && (
        <TextInput
          style={styles.input}
          placeholder="Avatar URL"
          value={avatar}
          onChangeText={setAvatar}
          autoCorrect={false}
          autoCapitalize="none"
        />
      )}
      

      <TouchableOpacity style={styles.button} onPress={validated}>
        <Text style={styles.buttonText}>
          {state === 'register' ? 'Register' : 'Login'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    padding: 17,
    marginBottom: 15,
    backgroundColor: '#FAFBFD',
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#19918F',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  error: {
    marginBottom: 10,
    color: 'red',
  },
});
