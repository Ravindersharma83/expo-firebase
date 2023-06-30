import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import COLORS from '../constants/colors';

import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { db, storage } from '../../firebase/firebase.config';
import { auth } from "../../firebase/firebase.config";
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection } from '@firebase/firestore';



const AddContactScreen = ({navigation}) => {
  const[inputs,setInputs] = useState({
    contact_name:'',
    mobile:'',
  })
  const {contact_name,mobile} = inputs;
  
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [image,setImage] = useState(null);
  const [picture, setPicture] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled,setDisabled]=useState(true);
  const[userId,setUserId] = useState(null);

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      // console.log('user----',user.uid);
      setUserId(user ? user.uid : Date.now().toString());
      // console.log('navigation',navigation);
    })
  },[])

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  // choose image from gallery
  const pickImage = async ()=>{
    try {
      setIsLoading(true);
  
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (result !== null && !result.cancelled) {
        // setImage(result.assets[0].uri);
        const uploadUrl = await uploadImageAsync(result.assets[0].uri);
        setImage(uploadUrl);
        setPicture(uploadUrl);
        setDisabled(false);
      } else {
        setImage(null);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error occurred:', error);
      setIsLoading(false);
    }
  }

  // function to upload image on firebase storage
  const uploadImageAsync = async (uri)=>{
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    try {
      const storageRef = ref(storage,`Images/image-${Date.now()}`);
      const result = await uploadBytes(storageRef,blob);
      // We're done with the blob, close and release it
      blob.close();
      return await getDownloadURL(storageRef);
    } catch (error) {
      alert(`Error : ${error}`);
    }
  }

  const handleOnChange = (text,input)=>{
    setInputs(prevState => ({...prevState, [input]:text}));
  }

  const clearFields = () => {
    setInputs({
      contact_name: '',
      mobile: ''
    });
  };

  // save contact detail in firestore
  const saveContact = async ()=>{
    const contactData = {...inputs};
    contactData.dob = date.toString();
    contactData.image = picture;
    contactData.user_id = userId ? userId : Date.now().toString();
    console.log('contact-data',contactData);
    const docRef = await addDoc(collection(db, "contacts"), contactData)
    .then(()=>{
      setImage(null);
      // setInputs({ contact_name: '', mobile: '' });
      setDate(new Date());
      setDisabled(true);
      alert("Contact Saved !");
    });
    clearFields();
    navigation.navigate("Home");
    
  }

  return (
    <View style={{flex:1}}>
      <View style={{alignItems:'center', margin:20,}}>
        <Text style={{fontSize:24}}>Add Contact</Text>
        {image && (
            <View>
              <Image source={{uri:image}} style={{height:100,width:100,borderRadius:50}}/>
            </View>
          )}
      </View>
      <View style={{alignItems:'center'}}>
        <Input
          iconName="account"
          placeholder="Contact Name"
          onChangeText={text => handleOnChange(text,'contact_name')}
          value={contact_name}
        />
        <Input
          iconName="cellphone"
          placeholder="Mobile Number"
          onChangeText={text => handleOnChange(text,'mobile')}
          value={mobile}
        />
        <TouchableOpacity onPress={showDatepicker}>
          <View style={styles.inputView}>
            <MaterialCommunityIcons name="calendar" style={{color: COLORS.darkBlue, fontSize: 18, marginLeft:10, marginRight: 15, marginTop:11}} />
            <Text style={styles.textInput}>Select DOB - {date.toDateString()}</Text>
          </View>
        </TouchableOpacity>
        {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}
        {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}

        <Button onPress={pickImage} title='Choose an image'/>

        <Button onPress={saveContact} title='Save contact' disabled={disabled}/>
      </View>
    </View>
  )
}

export default AddContactScreen

const styles = StyleSheet.create({
  inputView: {
    backgroundColor: "#f7f2f5",
    borderRadius: 30,
    width: "90%",
    height: 45,
    marginBottom: 20,
    flexDirection:"row",
    borderWidth:1,
    // alignItems: "center",
  },
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: -10,
    color:'grey'
  },
})