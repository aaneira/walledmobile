import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import HomePage from './screens/HomePage'
import LoginPage from './screens/LoginPage'
import TopUpPage from './screens/TopUpPage'
import TransferPage from './screens/TransferPage'
import RegisterPage from './screens/RegisterPage'
import Modal from './components/Modal'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'TopUp') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'Transfer') {
            iconName = focused ? 'send' : 'send-outline'
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="TopUp" component={TopUpPage} />
      <Tab.Screen name="Transfer" component={TransferPage} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen 
      name="Login" 
      component={LoginPage} 
        options={{
          // headerShown: false // menghilangkan header,
          title: 'Login',
          headerStyle: {
            backgroundColor: 'teal'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerRight: () => {
            // <Button 
            //   title='Menu'
            //   onPress={() => alert('Menu shown')}
            //   color='white'
            // />
          }
        }}
      />
        <Stack.Screen name="Home" component={TabNavigator} 
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'teal'
    
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}
        />
        <Stack.Screen name="Register" component={RegisterPage}
        options={{
          headerShown: false //menghilangkan header
        }}/>
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={() => (
            <View style={styles.screen}>
              <Text>Details Screen</Text>
            </View>
          )}
          options={{ title: 'Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});