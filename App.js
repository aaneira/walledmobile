import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Button, SafeAreaView } from 'react-native';
import Box from './components/Box';

export default function App() {
  return (
    <ScrollView>
      <View style={styles.container}>
      <View style={{flexDirection: 'row', elevation: 3, paddingHorizontal: 20, display: 'flex', alignItems: 'center', height: 80, width: '100%'}}>
        <Image source={require('./assets/pp.jpeg')} style={{width: 46, height: 46, borderRadius: 40, borderWidth: 3, borderColor: 'teal'}}></Image>
        <View style={{ marginLeft: 20}}>
          <Text style={{fontWeight: 900}}>Aneira Shafi</Text>
          <Text >Personal Account</Text>
        </View>
        <View style={{flex: 1}}>

        </View>
        <Image source={require('./assets/logomata.png')} style={{width: 46, height: 46}}></Image>
      </View>
    </View>
    <View style={styles.welcomeHeader}>
    <View style={{width: 250}}>
      <Text style={{fontSize: 20, fontWeight: 1000, marginBottom: 5}}>Good Morning, Aneira!</Text>
      <Text style={{fontSize: 16}}>Check all your incoming and outgoing transactions here</Text>
    </View>
    <View>
      <Image source={require('./assets/Group.png')} ></Image>
    </View>
    </View>
    <View style={styles.accountNum}>
      <Text style={{color: 'white', fontWeight: 300, fontSize: 16 }}>Account No.</Text>
      <Text style={{color: 'white', fontWeight: 300, fontSize: 16 }}>0210202</Text>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  welcomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20
  },
  accountNum: {
    backgroundColor: 'lightseagreen', 
    padding: 15, 
    marginVertical: 20, 
    alignItems: 'center', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginHorizontal: 20,
    borderRadius: 15
  }
  // textWelcome: {
  //   fontSize: 30,
  //   fontWeight: 1000
  // }

});