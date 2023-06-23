import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react';
import Button from './Button';

const NoContactFound = () => {
  return (
    <View style={{flex:1}}>
    <View style={styles.container}>
        <Image style={styles.image} source={{uri: 
      'https://img.freepik.com/premium-vector/no-data-illustration-concept_108061-573.jpg?w=826'
        }} /> 
    </View>
    
    <View style={styles.noContact}>
      <Text style={{marginLeft:'15%',fontSize:30,color:'#FF1493'}}>No Contact Found !</Text>
      <View style={{marginLeft:'15%'}}>
        <Button title='Add New Contact'/>
      </View>
    </View>
  </View>
  )
}

export default NoContactFound

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: "#fff",
      },
      image: {
        height:400,
        width:400,
        marginTop:40
      },
      noContact:{
        flex:1,
        backgroundColor: "#fff",
      }
})