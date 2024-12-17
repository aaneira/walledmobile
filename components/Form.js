import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Button, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Form ({state}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const navigation = useNavigation()

  const validateEmail = () => {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!validEmail) {
      setErrorEmail('Email tidak sesuai')
    } else {
      setErrorEmail('')
    }

  }

  const validatePassword = () => {
    const validPassword = password.length > 7 ? true : false;
    if (!validPassword) {
      setErrorPassword('Password kurang dari 7')
    } else {
      setErrorPassword('')
    }

  }

  const validateNama = () => {
    if (state === 'register' && (!name || name.length <= 7)) {
      setErrorName('Nama harus lebih dari 2 karakter')
    }
  }

  const validated = () => {
    if (Object.keys(setErrorEmail).length === 0 && Object.keys(setErrorPassword).length === 0) {
      navigation.navigate('Home');
    }
  }
  
  return (
    <SafeAreaView>
      {state === 'register' &&
       <TextInput
        style={styles.input}
        placeholder="Fullname"
        value={name}
        onChangeText={(text) => setName(text)}
        autoCorrect={false}
        autoCapitalize="none"
       />
      }
     
        <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        onChange={validateEmail}
        autoCorrect={false}
        autoCapitalize="none"
      />
      {errorEmail &&
          <Text style={{marginBottom: 10, color: 'red'}}>{errorEmail}</Text>
      }

        <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        onChange={validatePassword}
        autoCorrect={false}
        autoCapitalize="none"
        // secureTextEntry
      />
      {errorPassword &&
          <Text style={{marginBottom: 10, color: 'red'}}>{errorPassword}</Text>
      }

       {state === 'register' &&
        <TextInput
        style={styles.input}
        placeholder="Avatar URL"
        value={avatar}
        onChangeText={(text) => setAvatar(text)}
        autoCorrect={false}
        autoCapitalize="none"
        secureTextEntry
      />
       }
       <TouchableOpacity style={styles.button} onPress={() => validated()}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>{state === 'Login' ? 'Login' : 'Register'}</Text>
       </TouchableOpacity>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    padding: 17,
    marginBottom: 15,
    backgroundColor: '#FAFBFD',
    fontSize: 16
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#19918F',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});