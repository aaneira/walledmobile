import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TopUpPage() {
  const [paymentMethod, setPaymentMethod] = useState(null);

  const paymentOptions = [
    { label: 'BYOND Pay', value: 'BYOND Pay' },
    { label: 'ShopeePay', value: 'ShopeePay' },
    { label: 'Gopay', value: 'Gopay' },
    { label: 'OVO', value: 'OVO' },
  ];

  return (
    // <SafeAreaView>
    <ScrollView>
      {/* <View style={styles.container}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white'}}>Top Up</Text>
      </View> */}

      <View style={{marginHorizontal: 20}}>
        <Text style={{ fontSize: 20, color: '#999', marginVertical: 10 }}>Amount</Text>
        <View style={{ flexDirection: 'column'}}>
          <Text style={{ fontSize: 16, marginRight: 10, color: '#000' }}>IDR</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="100.000"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={{marginHorizontal: 20}}>
        <Text style={{ fontSize: 16, color: '#999', marginTop: 20, marginBottom: 15}}>Payment Method</Text>
        <Dropdown
          style={styles.dropdown}
          data={paymentOptions}
          labelField="label"
          valueField="value"
          placeholder="Select payment method"
          value={paymentMethod}
          onChange={(item) => setPaymentMethod(item.value)}
        />
      </View>

      <View style={{marginHorizontal: 20}}>
        <Text style={{ fontSize: 16, color: '#999', marginTop: 20, marginBottom: 15}}>Notes</Text>
        <TextInput
          style={styles.notesInput}
          // placeholder="Optional"
          multiline
          textAlignVertical="top"
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Top Up</Text>
      </TouchableOpacity>
    </ScrollView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'teal'
  },
  amountInput: {
    flex: 1,
    fontSize: 36,
    color: '#000',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 5,
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    // marginBottom: 20,
    backgroundColor: '#fff',
  },
  notesInput: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 30,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
  },
  button: {
    height: 50,
    backgroundColor: '#19918F',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20
  }
});
