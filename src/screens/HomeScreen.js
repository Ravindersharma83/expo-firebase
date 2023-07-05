import { StyleSheet, Text, View, Image, FlatList,ActivityIndicator, RefreshControl, ScrollView } from 'react-native'
import React, {useState } from 'react'
import { auth, db } from "../../firebase/firebase.config";
import NoContactFound from '../components/NoContactFound';
import ContactList from '../components/ContactList';
import { useLogin } from '../context/LoginProvider';
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({navigation}) => {
  const {profile} = useLogin();
    const [loading, setLoading] = useState(true);
    const[contacts,setContacts] = useState([]);
    const[contactId,setContactId] = useState(null);

    useFocusEffect(
    React.useCallback(() => {
      getUserId()
    },[])
  )
    const getUserId = async()=>{
      const userDetail = await AsyncStorage.getItem('user_id',(err, value) => {
          if (err) {
              Alert.alert("No data found");
          } else {
            console.log('user-----',JSON.parse(value));
            getContactsData(JSON.parse(value))
          }
        })
      }
      
      
      const getContactsData = async (uid)=>{
      setLoading(true);
      console.log('login id' , uid);
      const q = query(collection(db, "contacts"), where("user_id", "==", uid));
      const querySnapshot = await getDocs(q);
      // const contactsData = querySnapshot.docs.map((doc) =>doc.data());
      const contactsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        cid: doc.id,
      }));
      setLoading(false);
      setContacts(contactsData);
      console.log(contactsData);
    }


  return (
    <>
    <View style={{flex:1}}>
      {contacts && contacts.length ?
            <FlatList
            data={contacts.sort((a, b) => a.contact_name.localeCompare(b.contact_name))}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ContactList contact={item} navigation={navigation} />}
            />
      : loading ?  
        <View style={styles.loading}><ActivityIndicator size='large' color='blue'  /></View> : 
        <NoContactFound navigation={navigation}/>}
    
    </View>
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  loading: {
    flex:1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center'
}
})