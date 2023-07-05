import { StyleSheet, Text, View , Image, Alert} from 'react-native';
import React, { useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Button from '../components/Button';
import { FieldPath, collection, deleteDoc, doc, documentId, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import { ref } from 'firebase/storage';



const ContactDetailScreen = ({route,navigation}) => {
    const {contactDetail} = route.params;

    const deleteContact = async () => {
        const docRef = doc(db, "contacts", contactDetail.cid );
        console.log(docRef);
        await deleteDoc(docRef).then(()=>{
            Alert.alert("Contact Deleted !")
            navigation.navigate('Home');
        });

      };
  return (
    <>
    <View style={{flex:1,alignItems:'center'}}>
        <Image 
            source={{ uri: contactDetail?.image }}
            style={{
                width: 200,
                height: 200,
                borderRadius: 100,
                marginRight: 10,
                marginLeft:10,
              }}
        />
        <Text style={{fontSize:30,margin:10}}>{contactDetail?.contact_name}</Text>
        <View>
        <Text style={{fontSize:20}}><MaterialCommunityIcons name="cellphone" style={{fontSize: 18, marginLeft:10, marginRight: 15, marginTop:11}} /> {contactDetail?.mobile} | <MaterialCommunityIcons name="calendar" style={{fontSize: 18, marginLeft:10, marginRight: 15, marginTop:11}} /> {contactDetail?.dob.slice(3,15)}</Text>
        </View>
        <Button title='Delete Contact' onPress={()=>deleteContact()}/>
    </View>
    </>
  )
}

export default ContactDetailScreen

const styles = StyleSheet.create({})