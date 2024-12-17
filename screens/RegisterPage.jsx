import React, { useState } from 'react';
import { SafeAreaView, TextInput, Text, StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import Form from '../components/Form'
import Modal from '../components/Modal'

export default function RegisterPage({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);

  const handleRegister = () => {
    console.log('Registered');
  };

  const [isSelected, setSelection] = useState(false);

  return (
    <ScrollView style={{marginHorizontal: 22}}>
        <View style={{alignItems: 'center', marginTop: 120, marginBottom: 80}}>
            <Image source={require('../assets/Vector.png')} style={{width: 233, height:57}}></Image>
        </View>
      <View>
      <Form state='register'></Form>
      </View>
      <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
      onPress={() => setSelection(!isSelected)}
    >
      <View style={[styles.checkbox, isSelected && styles.checkedCheckbox]} />
    </TouchableOpacity>
    <View style={{ flexDirection: 'row', paddingVertical: 14 }}>
        {/* <Text style={{fontSize: 17}}>I have read and agree to the </Text>
        <Text style={{ color: 'teal', fontSize: 17}}>Terms and Conditions </Text>
        <Text style={{ color: 'red', fontSize: 17}}>* </Text> */}
          <Text style={{ fontSize: 16 }}>I have read and agree to the </Text>
          {/* <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={{ color: 'teal', fontSize: 17 }}>Terms and Conditions </Text>
          <Text style={{ color: 'red', fontSize: 17 }}>* </Text>
          </TouchableOpacity> */}
      </View>
      <Modal></Modal>
      </View>
      <View style={{flexDirection: 'row', marginTop: 15}}>
        <Text style={{fontSize: 16}}>Have an account?</Text>
        {/* <Text style={{fontSize: 16, color: '#19918F'}}> Login here</Text> */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{fontSize: 16, color: '#19918F'}}> Login Here</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    height: 24,
    width: 24,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 8,
    marginTop: 10
  },
  checkedCheckbox: {
    backgroundColor: '#4CAF50'
  }
});