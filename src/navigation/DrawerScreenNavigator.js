import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
  } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import AddContactScreen from '../screens/AddContactScreen';
import NoContactFound from '../components/NoContactFound';
import { useLogin } from '../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Drawer = createDrawerNavigator();

const CustomDrawer = props => {
  const { setIsLoggedIn, profile, setProfile } = useLogin();
  useEffect(()=>{
    getUserDetail();
  },[])
  const getUserDetail = async()=>{
    const userDetail = await AsyncStorage.getItem('user',(err, value) => {
        if (err) {
            Alert.alert("No data found");
        } else {
          // console.log('user-----',JSON.parse(value));
          setProfile(JSON.parse(value)) 
        }
      })
    }
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 20,
              backgroundColor: '#f6f6f6',
              marginBottom: 20,
            }}
          >
            <View>
              <Text>{profile.displayName}</Text>
            </View>
            <Image
              source={{
                uri:
                  'https://images.unsplash.com/photo-1624243225303-261cc3cd2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
              }}
              style={{ width: 60, height: 60, borderRadius: 30 }}
            />
          </View>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 0,
            left: 0,
            bottom: 50,
            backgroundColor: '#f6f6f6',
            padding: 20,
          }}
          onPress={() => {
              setIsLoggedIn(false)
              setProfile({});
              AsyncStorage.setItem('loggedIn', JSON.stringify(false))
              AsyncStorage.setItem('user',JSON.stringify({}))
              AsyncStorage.setItem('user_id',JSON.stringify(null))
          
          }}
        >
          <Text>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  };

const DrawerScreenNavigator = () => {
    return (
        <Drawer.Navigator
          screenOptions={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'transparent',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitle: '',
          }}
          drawerContent={props => <CustomDrawer {...props} />}
        >
          <Drawer.Screen component={HomeScreen} name='Home' />
          <Drawer.Screen component={AddContactScreen} name='AddContact' />
        </Drawer.Navigator>
      );
}

export default DrawerScreenNavigator

const styles = StyleSheet.create({})