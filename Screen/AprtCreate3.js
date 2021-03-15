import React from 'react';
import {Platform, ScrollView, StyleSheet, TouchableWithoutFeedback,View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
// import RNPickerSelect, { defaultStyles } from './debug';
import { Text, TextInput, IconButton, Colors, Button } from 'react-native-paper';

const flattypes = [
  {
    label: 'Owner',
    value: 'Owner',
  },
  {
    label: 'Rent',
    value: 'Rent',
  },
  {
    label: 'Close',
    value: 'Close',
  },
];

const membertypes = [
  {
    label: 'Admin',
    value: 'Admin',
  },
  {
    label: 'Secotry',
    value: 'Secotry',
  },
  {
    label: 'Tenant',
    value: 'Tenant',
  },
  {
    label: 'Member',
    value: 'Member',
  },
];

export default class Whocreated extends React.Component {
  constructor(props) {
    super(props);
    this.inputRefs = {
      flattype: null,
      membertype:null
    };

    this.state = {
      name:"",
      flatno:"",
      nmembers:"",
      flattype: undefined,
      membertype:undefined,
      loading:false,
      key:this.props.route.params.key,
      main:this.props.route.params.main,
    };

  }

  BtnSave = () =>{
    this.setState({
      loading: true
    });
    console.log("clicked");
    console.log(this.state.name);
    console.log(this.state.flatno);
    console.log(this.state.nmembers)
    console.log(this.state.flattype)
    console.log(this.state.membertype)
    console.log(this.state.key)
    console.log(this.state.main)
    fetch('http://192.168.43.179:8000/RegAuthAprtThree', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:JSON.stringify({
        name:this.state.name,
        flatno:this.state.flatno,
        nmembers:this.state.nmembers,
        flattype:this.state.flattype,
        membertype:this.state.membertype,
        key:this.state.key,
        main:this.state.main,
      })
    }).then((response) => response.json())
        .then((responseJson) => {
          console.log('responseobject:',responseJson)
          console.log(responseJson.Status)
          if(responseJson.Status == "OK"){
            this.props.navigation.navigate("Login", {key:responseJson.Key, main:responseJson.Main})
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }
  
  render() {
    const placeholder = {
      label: 'Flat Type',
      value: null,
      color: '#9EA0A4',
    };

    const placeholder2 = {
      label: 'Member Type',
      value: null,
      color: '#9EA0A4',
    };

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}>

          <TextInput
            style={{width:"100%", margin:10, backgroundColor:"white", height:60}}
            label="Your Name"
            value={this.state.name}
            onChangeText={(text) => {this.setState({
                name: text,
              });}}
          />

          <TextInput
            style={{width:"100%", margin:10, backgroundColor:"white", height:60}}
            label="Your Flat No."
            value={this.state.flatno}
            onChangeText={(text) => {this.setState({
                flatno: text,
              });}}
          />

          <TextInput
            style={{width:"100%", margin:10, backgroundColor:"white", height:60}}
            label="No. Of Members"
            keyboardType={'phone-pad'}
            value={this.state.nmembers}
            onChangeText={(text) => {this.setState({
                nmembers: text,
              });}}
          />

          <RNPickerSelect
            placeholder={placeholder}
            items={flattypes}
            onValueChange={value => {this.setState({flattype: value,});}}
            style={pickerSelectStyles}
            value={this.state.flattype}
            useNativeAndroidPickerStyle={false}
            ref={el => {this.inputRefs.flattype = el;}}
          />

          <RNPickerSelect
            placeholder={placeholder2}
            items={membertypes}
            onValueChange={value => {this.setState({membertype: value,});}}
            style={pickerSelectStyles}
            value={this.state.membertype}
            useNativeAndroidPickerStyle={false}
            ref={el => {this.inputRefs.membertype = el;}}
          />
          
          <Button 
          style={{width:"100%", margin:10}}
          icon="camera" 
          mode="contained"
          onPress={this.BtnSave}
          >
          Good To Go
          </Button>
      

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  scrollContentContainer: {
    paddingTop: 40,
    paddingBottom: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    margin:10,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 0.5,
    borderColor: 'white',
    color: 'black',
    backgroundColor:"white",
    width:"100%",
    paddingLeft: 12, // to ensure the text is never behind the icon
  },
});
