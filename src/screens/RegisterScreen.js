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
import Input from "../components/Input";
import Button from "../components/Button";


import { auth } from "../../firebase/firebase.config";
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { db } from "../../firebase/firebase.config";
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

const RegisterScreen = ({navigation}) => {
  const[inputs,setInputs] = useState({
    name:'',
    email:'',
    password:''
  })

  const {name,email,password} = inputs;

  const handleOnChange = (text,input)=>{
    setInputs(prevState => ({...prevState, [input]:text}));
  }

  const register = async()=>{
    if((name == null || name == ''))
    {
        Alert.alert("Please Enter Your Name ");            
        return;
    }
    if((email == null || email == ''))
    {
        Alert.alert("Please Enter Your Email ");            
        return;
    }
    if((password == null || password == ''))
    {
        Alert.alert("Please Enter Your Password ");            
        return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth,email,password);
      // for update user profile detail
      updateProfile(auth.currentUser,{
        displayName:name
      })
      const user = userCredential.user;
      // deleting password
      const formDataCopy = {...inputs};
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      formDataCopy.user_id = user.uid;
      // adding uesr data into database
      await setDoc(doc(db,"users",user.uid),formDataCopy);
      Alert.alert("Succussfully Sign Up");
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
}

  return (
    <View style={styles.container}>
    <Image style={styles.image} source={{uri: 
   'https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?size=626&ext=jpg&ga=GA1.2.1349196585.1687175242&semt=sph'
    }} /> 
    <StatusBar style="auto" />
      <Input
        iconName="account"
        placeholder="Enter your Name"
        onChangeText={text => handleOnChange(text,'name')}
      />
      <Input
        iconName="email-alert-outline"
        placeholder="Enter your Email Address"
        onChangeText={text => handleOnChange(text,'email')}
      />
      <Input
        iconName="lock-outline"
        placeholder="Enter your Password"
        onChangeText={text => handleOnChange(text,'password')}
        password
      />
      <Button title='Sign Up' onPress={register}/>

      <TouchableOpacity style={{marginTop:10}} onPress={()=>navigation.navigate('Login')}>
        <Text style={{color:'blue'}}>Already Have An Account ? Login</Text>
      </TouchableOpacity>
  </View>
  )
}

export default RegisterScreen

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
})