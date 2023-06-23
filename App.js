// import { StatusBar } from 'expo-status-bar';
// import { Button, View, Text, StyleSheet } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginScreen from './src/screens/LoginScreen';
// import RegisterScreen from './src/screens/RegisterScreen';
// import HomeScreen from './src/screens/HomeScreen';

// export default function App() {
//   const Stack = createNativeStackNavigator();
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Register" component={RegisterScreen} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });


import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import StackScreenNavigator from "./src/navigation/StackScreenNavigator";

export default function App(){
  return(
      <NavigationContainer>
        <StackScreenNavigator/>
      </NavigationContainer>
  )
}