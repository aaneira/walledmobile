import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function Box() {
  const navigation = useNavigation();
  return (
    <View style={[styles.box]}>
      <Text style={styles.text}>Ini Home</Text>
      <Button title="Go to Login" onPress={() => navigation.navigate('Login', {
        name: 'Fariz Ga' // params yang akan dipassing
      })} />
    </View>
  )
}
const styles = StyleSheet.create({
  box: {
    padding: 10
  },
  text: {
    fontSize: 24,
    textAlign: 'center'
  }
});