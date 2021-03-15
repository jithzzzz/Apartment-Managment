import React from 'react';
import {Platform, ScrollView, StyleSheet, TouchableWithoutFeedback,View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, TextInput, IconButton, Colors, Button } from 'react-native-paper';

export default class ApartmentDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nofloor:"",
      flatperfloor:"",
      tsqrt:"",
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
    console.log(this.state.nofloor);
    console.log(this.state.flatperfloor);
    console.log(this.state.tsqrt)
    console.log(this.state.key)
    console.log(this.state.main)
    fetch('http://192.168.43.179:8000/RegAuthAprtTwo', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:JSON.stringify({
        nofloor:this.state.nofloor,
        tsqrt:this.state.tsqrt,
        flatperfloor:this.state.flatperfloor,
        key:this.state.key,
        main:this.state.main
      })
    }).then((response) => response.json())
        .then((responseJson) => {
          console.log('responseobject:',responseJson)
          console.log(responseJson.Status)
          if(responseJson.Status == "OK"){
            this.props.navigation.navigate("CTRAPRT3", {key:responseJson.Key, main:responseJson.Main})
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }
  

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}>

          <TextInput
            style={{width:"100%", margin:10, backgroundColor:"white", height:60}}
            label="Total No.Floor"
            value={this.state.nofloor}
            onChangeText={(text) => {this.setState({
                nofloor: text,
              });}}
          />

          <TextInput
            style={{width:"100%", margin:10, backgroundColor:"white", height:60}}
            label="Flat Per Floor"
            value={this.state.flatperfloor}
            onChangeText={(text) => {this.setState({
                flatperfloor: text,
              });}}
          />

          <TextInput
            style={{width:"100%", margin:10, backgroundColor:"white", height:60}}
            label="Total Squar Feet"
            value={this.state.tsqrt}
            onChangeText={(text) => {this.setState({
              tsqrt: text,
              });}}
          />
         
          <Button
          style={{width:"100%", margin:10}}
          icon="camera" 
          mode="contained"
          loading={this.state.loading}
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

