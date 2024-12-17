import React, { useState } from 'react';
import { ScrollView, TextInput, Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Form from '../components/Form'
import { useNavigation } from '@react-navigation/native';

export default function LoginPage({ navigation }) {

  return (
    <ScrollView style={{marginHorizontal: 22}}>
        <View style={{alignItems: 'center', marginTop: 120, marginBottom: 170}}>
            <Image source={require('../assets/Vector.png')} style={{width: '233', height:'57'}}></Image>
        </View>
      <View>
        <Form state="Login"></Form>
      </View>
      <View style={{flexDirection: 'row', marginTop: 17}}>
        <Text style={{fontSize: 16}}>Don't have account?</Text>
        {/* <Text style={{fontSize: 16, color: '#19918F'}}> Register here</Text>  */}
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{fontSize: 16, color: '#19918F'}}> Register Here</Text>
        </TouchableOpacity>
      </View>
      
    </ScrollView>
  );
};