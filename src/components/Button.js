import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors'

const Button = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity style={styles.loginBtn} onPress={onPress}>
    <Text style={styles.loginText}>{title}</Text> 
  </TouchableOpacity> 
  )
}

export default Button

const styles = StyleSheet.create({
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
      },
      loginText:{
        color:COLORS.white,
      }
})