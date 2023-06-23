import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DrawerScreenNavigator from './DrawerScreenNavigator';
import NoContactFound from '../components/NoContactFound';


const Stack = createNativeStackNavigator();


const StackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen component={LoginScreen} name='Login' />
        <Stack.Screen component={RegisterScreen} name='Register' />
        <Stack.Screen component={NoContactFound} name='NotFound' />
      </Stack.Navigator>
    );
  };

const StackScreenNavigator = () => {
    const [isLoggedIn,setIsLoggedIn] = useState(true);
  return (
    isLoggedIn ? <DrawerScreenNavigator/> : <StackNavigator/>
  )
}

export default StackScreenNavigator

const styles = StyleSheet.create({})