import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DrawerScreenNavigator from './DrawerScreenNavigator';
import NoContactFound from '../components/NoContactFound';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../context/LoginProvider';


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
    const {isLoggedIn,setIsLoggedIn} = useLogin();

    useEffect(()=>{
      loginStatus();
    },[isLoggedIn])

    const loginStatus = async()=>{
      const loggedIn = await AsyncStorage.getItem('loggedIn',(err, value) => {
          if (err) {
              Alert.alert("No data found");
          } else {
              setIsLoggedIn(JSON.parse(value)) 
          }
        })
      }

  return (
    isLoggedIn ? <DrawerScreenNavigator/> : <StackNavigator/>
  )
}

export default StackScreenNavigator

const styles = StyleSheet.create({})