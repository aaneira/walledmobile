import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TransferScreen() {
  const [amount, setAmount] = useState('');

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Transfer</Text> */}

      <View style={styles.toSection}>
        <Text style={styles.toText}>To: 9000008940208</Text>
      </View>

      <Text style={{fontSize: 20, color: '#999', marginHorizontal: 20, marginVertical: 10}}>Amount</Text>
    
      <View style={styles.amountSection}>
      <Text style={{fontSize: 16, color: '#000',}}>IDR</Text>
        <TextInput
          style={styles.input}
          placeholder="100.000"
          keyboardType="numeric"
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20}}>
      <Text style={{fontSize: 16}}>Balance</Text>
      <Text style={{color: 'teal', fontSize: 16}}>IDR 100.000.000</Text>
      </View>

      <View style={styles.notesSection}>
        <Text style={{ fontSize: 16, color: '#999', marginTop: 20, marginBottom: 35}}>Notes</Text>
        <TextInput
          style={styles.notesInput}
          // placeholder="Notes"
        />
      </View>

      <TouchableOpacity style={styles.transferButton}>
        <Text style={styles.buttonText}>Transfer</Text>
      </TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // marginTop: 40
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginHorizontal: 20
  },
  toSection: {
    backgroundColor: '#1AA09C',
    // marginBottom: 20,
    height: 51
  },
  toText: {
    color: '#fff',
    fontSize: 20,
    paddingVertical: 15,
    paddingLeft: 20

  },
  amountSection: {
    flexDirection: 'column',
    marginBottom: 10,
    marginHorizontal: 20,
    height: 70
  },
  label: {
    fontSize: 16,
    color: '#999',
  },
  input: {
    flex: 1,
    fontSize: 36,
    color: '#000',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  balanceText: {
    fontSize: 14,
    color: '#1AA09C',
    marginBottom: 20,
  },
  notesSection: {
    marginBottom: 30,
    marginHorizontal: 20
  },
  notesInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    color: '#000',
  },
  transferButton: {
    backgroundColor: '#19918F',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
