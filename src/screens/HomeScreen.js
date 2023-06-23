import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { auth } from "../../firebase/firebase.config";
import { onAuthStateChanged } from 'firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NoContactFound from '../components/NoContactFound';

const HomeScreen = ({navigation}) => {
    useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
        console.log('user----',user);
      })
    },[])
  return (
    <>
    <NoContactFound navigation={navigation}/>
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
})