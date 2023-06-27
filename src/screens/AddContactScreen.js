import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState } from 'react';
import Input from '../components/Input';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import COLORS from '../constants/colors';

const AddContactScreen = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

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

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={{flex:1}}>
      <View style={{alignItems:'center', margin:20,}}>
        <Text style={{fontSize:24}}>Add Contact</Text>
      </View>
      <View style={{alignItems:'center'}}>
        <Input
          iconName="account"
          placeholder="Contact Name"
          // onChangeText={text => handleOnChange(text,'name')}
        />
        <Input
          iconName="cellphone"
          placeholder="Mobile Number"
          // onChangeText={text => handleOnChange(text,'name')}
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
      <Text>selected: {date.toLocaleString()}</Text>
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