import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { auth } from "../../firebase/firebase.config";
import { onAuthStateChanged } from 'firebase/auth';

const HomeScreen = () => {
    useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
        console.log('user----',user);
      })
    },[])
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})