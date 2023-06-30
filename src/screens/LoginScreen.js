import { StatusBar } from "expo-status-bar";
import React, {useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { auth } from "../../firebase/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import Input from "../components/Input";
import Button from "../components/Button";
import AsyncStorage from '@react-native-async-storage/async-storage'


//fetching data from LoginProvider Context
import { useLogin } from "../context/LoginProvider";


const LoginScreen = ({navigation}) => {
    const {setIsLoggedIn,setProfile,isLoggedIn} = useLogin();
    const[inputs,setInputs] = useState({
      email:'',
      password:''
    })
    const[errors,setErrors] = useState({});
    // const[loading,setLoading] = useState(false);

    const handleOnChange = (text,input)=>{
      setInputs(prevState => ({...prevState, [input]:text}));
    }
  
    const handleError = (errorMessage,input)=>{
      setErrors((prevState => ({...prevState, [input]:errorMessage})));
    }

    const login = ()=>{
        if((inputs.email == null || inputs.email == ''))
        {
            // handleError("Please input email","email");
            Alert.alert("Please Enter Your Email ");            
            return;
        }
        if((inputs.password == null || inputs.password == ''))
        {
            // handleError("Please input password","password");
            Alert.alert("Please Enter Your Password ");            
            return;
        }
        signInWithEmailAndPassword(auth, inputs.email, inputs.password)
        .then((userCredential) => {
            const user = userCredential.user;
            try {
              AsyncStorage.setItem('user',JSON.stringify(user))
              AsyncStorage.setItem('loggedIn', JSON.stringify(true))
              setIsLoggedIn(true);
              setProfile(user);// res.data (api logged in data)
              Alert.alert("Welcome "+user.displayName + " !");
            } catch (error) {
              Alert.alert("Error","Something went wrong");
            }
            // navigation.navigate('Home')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert(error.message);
        });
    }
  return (
    <View style={styles.container}>
    <Image style={styles.image} source={{uri: 
   'https://img.freepik.com/free-vector/cloud-computing-security-abstract-concept-illustration_335657-2105.jpg?size=626&ext=jpg&ga=GA1.1.1349196585.1687175242&semt=sph'
    }} /> 
    <StatusBar style="auto" />
      <Input
        iconName="email-alert-outline"
        placeholder="Enter your Email Address"
        onChangeText={text => handleOnChange(text,'email')}
        error={errors.email}
        onFocus={()=>{
          handleError(null,"email")
        }}
      />
      <Input
        iconName="lock-outline"
        placeholder="Enter your Password"
        password
        onChangeText={text => handleOnChange(text,'password')}
        error={errors.password}
        onFocus={()=>{
          handleError(null,"password")
        }}
      />
      <Button title='Sign In' onPress={login}/>
      <TouchableOpacity style={{marginTop:10}} onPress={()=>navigation.navigate('Register')}>
        <Text style={{color:'blue'}}>Do Not Have An Account ? Sign Up</Text>
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
  });