import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { Feather } from '@expo/vector-icons'; 
import call from 'react-native-phone-call';

const ContactList = ({contact,navigation}) => {
  const fetchContactDetail = (contactDetail)=>{
    console.log(navigation.navigate);
    navigation.navigate('Root', { 
      screen: 'ContactDetail',
      params: {contactDetail:contactDetail}
    });
  }
    // to make a call we need to install external package called - react-native-phone-call
    const triggerCall = (phone_number)=>{
      if(phone_number){
        const args = {
            number: phone_number.toString(),
            prompt: true,
          };
          // Make a call
          call(args).catch(console.error);
      }
    }
  return (
    <>
    <TouchableOpacity onPress={()=>fetchContactDetail(contact)}>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth:0.2,
        borderColor:'grey'
      }}
    >
      <Image
        source={{ uri: contact.image }}
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          marginRight: 10,
          marginLeft:10,
        }}
      />
      <View style={{ flex: 1, marginLeft:10 }}>
        <Text style={{ fontSize: 16 }}>{contact.contact_name}</Text>
        <Text style={{ fontSize: 14, color: '#888' }}>{contact.mobile}</Text>
      </View>
      <TouchableOpacity onPress={()=>triggerCall(contact.mobile)}>
        <Feather name="phone-call" size={24} color="green" style={{ width: 30, height: 30,marginRight:10 }} />
      </TouchableOpacity>
    </View>
    </TouchableOpacity>
    </>
  )
}

export default ContactList

const styles = StyleSheet.create({})