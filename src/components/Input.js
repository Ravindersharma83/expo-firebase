import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react';
import COLORS from '../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


const Input = ({label,iconName,error,password,onFocus=()=>{},...props}) => {
    const [hidePassword, setHidePassword] = useState(password);
    const [isFocused, setIsFocused] = useState(false);
  return (
    // <View style={{marginBottom:20}}>
    //   <Text style={styles.label}>{label}</Text>
    //   <View style={[
    //     styles.inputContainer,
    //     {
    //         borderColor: error ? COLORS.red : isFocused ? COLORS.darkBlue : COLORS.light
    //     }
    //     ]}>
    <View style={styles.inputView}>
            <MaterialCommunityIcons name={iconName} style={{color: COLORS.darkBlue, fontSize: 18, marginLeft:10, marginRight: 15, marginTop:11}} />
            <TextInput
            secureTextEntry={hidePassword}
            autoCorrect={false}
            onFocus={() => {
                onFocus();
                setIsFocused(true);
            }}
            onBlur={() => setIsFocused(false)}
            style={{color:COLORS.darkBlue}} 
            {...props}
            />
         </View>
    //     {password && (
    //       <MaterialCommunityIcons
    //         onPress={() => setHidePassword(!hidePassword)}
    //         name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
    //         style={{color: COLORS.darkBlue, fontSize: 22,marginTop:15}}
    //       />
    //     )}
    //   </View>
    //     {error && (
    //         <Text style={{marginTop: 7, color: COLORS.red, fontSize: 12}}>
    //         {error}
    //         </Text>
    //     )}
    // </View>
  )
}

export default Input

const styles = StyleSheet.create({
    inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        flexDirection:"row"
        // alignItems: "center",
      },
      TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
      },
})