import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  onPress,
  TouchableOpacity,
} from "react-native";
import { auth } from "../firebase/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";


const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = ()=>{
        if((email == null || email == '') || (password == null || password == ''))
        {
            console.log('Both Email and Password fields are required !');
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user.email;
            console.log("you are logged in as "+user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error.code +'-'+ error.message);
        });
    }
  return (
    <View style={styles.container}>
    <Image style={styles.image} source={{uri: 
   'https://img.freepik.com/free-vector/cloud-computing-security-abstract-concept-illustration_335657-2105.jpg?size=626&ext=jpg&ga=GA1.1.1349196585.1687175242&semt=sph'
    }} /> 
    <StatusBar style="auto" />
    <View style={styles.inputView}>
      <TextInput
        style={styles.TextInput}
        placeholder="Email."
        placeholderTextColor="#003f5c"
        onChangeText={(email) => setEmail(email)}
      /> 
    </View> 
    <View style={styles.inputView}>
      <TextInput
        style={styles.TextInput}
        placeholder="Password."
        placeholderTextColor="#003f5c"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      /> 
    </View> 
    <TouchableOpacity>
      <Text style={styles.forgot_button}>Forgot Password?</Text> 
    </TouchableOpacity> 
    <TouchableOpacity onPress={login} style={styles.loginBtn}>
      <Text style={styles.loginText}>LOGIN</Text> 
    </TouchableOpacity> 
  </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
        height:200,
        width:400,
      marginBottom: 40,
    },
    inputView: {
      backgroundColor: "#FFC0CB",
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
    },
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
    },
    forgot_button: {
      height: 30,
      marginBottom: 30,
    },
    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#FF1493",
    },
  });