import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ProgressLoader from 'rn-progress-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text, Snackbar, Appbar, Button, TextInput  } from 'react-native-paper';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';


const THEME_COLOR = '#ff4800';

export default class EmergencyAdd extends React.Component{
   constructor(props) {
    super(props);
    this.inputRefs = {
      job: null,
    };

    this.state = {
      name:"",
      pho:"",
      address:"",
      job: undefined,
      fee:"0",
      isname:false,
      ispho:false,
      isaddress:false,
      isjob:false,
      isfee:false,
      visible:false,
      isLoading: false,
      email:"",
      ap_id:0,
      jobtypes:props.route.params.d,
      message:"",
    };

  }

  getData = async () => {
    try {
        const value = await AsyncStorage.getItem('@storage_Key_who')
        const v2 = await AsyncStorage.getItem('@storage_Key_part')
        if(value !== null) {
          this.setState({ap_id:v2})
          this.setState({email:value})
        }else{
            navigation.navigate("Login")
        }
    } catch(e) {
        return(404)
    }
  }
  componentDidMount(){
    this.getData();
  }

  validation = ()=>{
    let status = true
    console.log(status)
    if(this.state.name == null || this.state.name == ""){
      this.setState({isname:true})
      status = false
    }

    if(this.state.pho == null || this.state.name == "" || this.state.pho.length != 10){
      this.setState({ispho:true})
      status = false
    }

    if(this.state.address == null || this.state.address == ""){
      this.setState({isaddress:true})
      status = false
    }

    if(this.state.job == null || this.state.job == ""){
      this.setState({isjob:true})
      status = false
    }

    if(status == true){
      this.BtnSave()
    }
  }

  BtnSave= ()=>{
    this.setState({isLoading:true});
    fetch('http://192.168.43.179:8000/emcsave', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:JSON.stringify({
        name:this.state.name,
        pho:this.state.pho,
        address:this.state.address,
        job:this.state.job,
        fee:this.state.fee,
        aprt:this.state.ap_id,
        user:this.state.email,
      })
    }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          console.log(responseJson.Status)
          if(responseJson.Status == "OK"){
            this.setState({isLoading:false});
            this.setState({visible:true})
            this.setState({message:"New Emergency Contact Added !!!"})
          }else{
            setMessage(responseJson.Status)
            console.log(responseJson.Status)
            this.setState({isLoading:false});
            this.setState({visible:true})
            this.setState({message:"Try Again !!!"})
          }
        })
        .catch((error) => {
          console.error(error);
          this.setState({isLoading:false});
          this.setState({visible:true})
          this.setState({message:error})
        });
  }



  render() {
    const placeholder = {
      label: 'Job Type',
      value: null,
      color: '#9EA0A4',
    };
    return(
      <>
        <Appbar.Header style={{backgroundColor:"#ff4800", borderColor:"#ff4800",elevation:0}}>
          <Appbar.BackAction 
          onPress={()=>{this.props.navigation.navigate("Emergency")}} />
          <Appbar.Content title="Emergency Contact"  />
          <Appbar.Action 
          icon="plus-circle" 
          onPress={()=>{this.props.navigation.navigate("Empcty")}} />
        </Appbar.Header>

        <ProgressLoader
          visible={this.state.isLoading}
          isModal={true} isHUD={true}
          hudColor={"#ff4800"}
          color={"#FFFFFF"} />
               
        <ScrollView style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>

          <TextInput
            style={{ margin:15,  height:60, backgroundColor:"white"}}
            label="Name"
            mode='outlined'
            value={this.state.name}
            onChangeText={(text) => {this.setState({
                name: text,
                isname: false
              });}}
          />

          {this.state.isname == true ? <Text style={{color:'red', marginLeft:17}}>Name should not be empty</Text> : null}

          <TextInput
            style={{margin:15,  height:60, backgroundColor:"white"}}
            label="Mobile Number"
            mode='outlined'
            value={this.state.pho}
            keyboardType={'phone-pad'}
            onChangeText={(text) => {this.setState({
                pho: text,
              });
              if(this.state.pho.length >= 9){
                this.setState({ispho:false})
              }
            }}
          />
          {this.state.ispho == true ? <Text style={{color:'red', marginLeft:17}}>Invalid Number</Text> : null}

          <TextInput
            style={{margin:15,  height:60, backgroundColor:"white"}}
            label="Address"
            mode='outlined'
            multiline={true}
            value={this.state.address}
            onChangeText={(text) => {this.setState({
                address: text,
                isaddress:false
              });}}
          />
          {this.state.isaddress == true ? <Text style={{color:'red', marginLeft:17}}>Address should not be empty</Text> : null}
              
          <RNPickerSelect
          placeholder={placeholder}
          items={this.state.jobtypes}
          onValueChange={value => {this.setState({job: value, isjob:false});}}
          style={pickerSelectStyles}
          value={this.state.job}
          useNativeAndroidPickerStyle={false}
          ref={el => {this.inputRefs.job = el;}}
          />
          {this.state.isjob == true ? <Text style={{color:'red', marginLeft:17}}>Invalid option selected</Text> : null}

          <TextInput
            style={{margin:15,  height:60, backgroundColor:"white"}}
            label="Fees"
            mode='outlined'
            value={this.state.fee}
            keyboardType={'phone-pad'}
            onChangeText={(text) => {this.setState({
                fee: text,
                isfee:false
              });}}
          />
          

          <Button
          style={{margin:20, padding:5, borderRadius:20 }}
          icon="content-save-all-outline" 
          mode="contained"
          onPress={this.validation}
          >
            Save
          </Button>
        </ScrollView>

        <Snackbar
            visible={this.state.visible}
            onDismiss={() =>{this.setState({visible:false})}}
            action={{
              label: 'Dismiss',
              onPress: () => {
                this.setState({visible:false})
              },
            }}>
            {this.state.message}
        </Snackbar>
      </>

    );
  }
}


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    marginHorizontal:15, 
    marginVertical:10,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'grey',
    color: 'black',
    backgroundColor:"white",
  },
});

  