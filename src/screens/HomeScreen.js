import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from "../../firebase/firebase.config";
import { onAuthStateChanged } from 'firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NoContactFound from '../components/NoContactFound';
import { contactsDetails } from '../Api/contacts';
import ContactList from '../components/ContactList';

const HomeScreen = ({navigation}) => {
    const[contacts,setContacts] = useState([]);

    useEffect(()=>{
      setContacts(contactsDetails)
    },[])

    useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
        // console.log('user----',user);
      })
    },[])
  return (
    <>
    
      {contacts && contacts.length ?
            <FlatList
            data={contacts.sort((a, b) => a.contact_name.localeCompare(b.contact_name))}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ContactList contact={item} />}
            />
      : <NoContactFound navigation={navigation}/>}
    
    
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
})