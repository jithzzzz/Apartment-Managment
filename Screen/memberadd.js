import React from 'react';
import {Platform, ScrollView, StyleSheet, TouchableWithoutFeedback,View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
// import RNPickerSelect, { defaultStyles } from './debug';
import { Text, TextInput, IconButton, Colors, Button, Appbar, Snackbar } from 'react-native-paper';
import ProgressLoader from 'rn-progress-loader';

const flattypes = [
  {
    label: 'Owner',
    value: 'Owner',
  },
  {
    label: 'Rent',
    value: 'Rent',
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

export default class Memberadd extends React.Component {
  constructor(props) {
    console.log(props)
    super(props);
    this.inputRefs = {
      flattype: null,
      membertype:null
    };

    this.state = {
      name:"",
      mob:"",
      flatno:undefined,
      nmembers:"",
      password:"",
      conpassword:"",
      flattype: undefined,
      membertype:undefined,
      isLoading:false,
      isname:"",
      ismob:"",
      isflatno:"",
      isnmembers:"",
      ispassword:"",
      isconpassword:"",
      isflattype:"",
      ismembertype:"",
      flatnumbers:props.route.params.d,
      ap_id:props.route.params.ap,
      user:props.route.params.user,
      message:'',
      visible:false,
    };

  }

  validation = () =>{
    let status = true
    console.log(status)
    if(this.state.name == null || this.state.name == ""){
      this.setState({isname:true})
      status = false
    }

    if(this.state.mob == null || this.state.mob == "" || this.state.mob.length != 10){
      this.setState({ismob:true})
      status = false
    }

    if(this.state.flatno == null || this.state.flatno == ""){
      this.setState({isflatno:true})
      status = false
    }

    if(this.state.nmembers == null || this.state.nmembers == ""){
      this.setState({isnmembers:true})
      status = false
    }

    if(this.state.password == null || this.state.password == ""){
      this.setState({ispassword:true})
      status = false
    }

    if(this.state.conpassword == null || this.state.conpassword == "" || this.state.conpassword != this.state.password){
      this.setState({isconpassword:true})
      status = false
    }
    
    if(this.state.flattype == null || this.state.flattype == ""){
      this.setState({isflattype:true})
      status = false
    }

    if(this.state.membertype == null || this.state.membertype == ""){
      this.setState({ismembertype:true})
      status = false
    }

    if(status == true){
      this.BtnSave()
    }
    


  }

  BtnSave = () =>{
    this.setState({
      isLoading: true
    });
    console.log("clicked");
    fetch('http://192.168.43.179:8000/savemembers', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:JSON.stringify({
        name:this.state.name,
        mob:this.state.mob,
        password:this.state.password,
        conpassword:this.state.conpassword,
        flatno:this.state.flatno,
        nmembers:this.state.nmembers,
        flattype:this.state.flattype,
        membertype:this.state.membertype,
        ap_id:this.state.ap_id,
        user:this.state.user,

      })
    }).then((response) => response.json())
        .then((responseJson) => {
          console.log('responseobject:',responseJson)
          console.log(responseJson.Status)
          if(responseJson.Status == "OK"){
            this.setState({message:responseJson.Message})
            this.setState({isLoading:false})
            this.setState({visible:true})
          }
        })
        .catch((error) => {
          console.error(error);
          this.setState({isLoading:false})
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

    const placeholder3 = {
      label: 'Flat Number',
      value: null,
      color: '#9EA0A4',
    };

    return (
      <>
        <Appbar.Header 
            style={{backgroundColor:"#ff4800", borderColor:"#ff4800",elevation:0}}>
            <Appbar.BackAction 
            onPress={()=>{this.props.navigation.navigate("MemberList")}} />
            <Appbar.Content title="Add Members"  />
        </Appbar.Header>
        <ProgressLoader
          visible={this.state.isLoading}
          isModal={true} isHUD={true}
          hudColor={"#ff4800"}
          color={"#FFFFFF"} />

        <ScrollView style={styles.scrollView}
        showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>

          <TextInput
            style={{ marginHorizontal:15, marginVertical:10, backgroundColor:"white" }}
            mode='outlined'
            label="Your Name"
            value={this.state.name}
            onChangeText={(text) => {this.setState({
                name: text,
                isname:false
              });}}
          />
          {this.state.isname == true ? <Text style={{color:'red', marginLeft:17}}>Name should not be empty</Text> : null}


          <TextInput
            style={{ marginHorizontal:15, marginVertical:10, backgroundColor:"white" }}
            mode='outlined'
            label="Mobile Number"
            value={this.state.mob}
            onChangeText={(text) => {this.setState({
                mob: text,
              });
            if(this.state.mob.length == 10){
              this.setState({
                ismob:false
              });
            }}}
            keyboardType={'phone-pad'}
          />
          {this.state.ismob == true ? <Text style={{color:'red', marginLeft:17}}>Invalid phone number</Text> : null}


          <TextInput
            style={{ marginHorizontal:15, marginVertical:10, backgroundColor:"white" }}
            mode='outlined'
            label="Password"
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(text) => {this.setState({
                password: text,
                ispassword:false
              });}}
          />
          {this.state.ispassword == true ? <Text style={{color:'red', marginLeft:17}}>Password should not be empty</Text> : null}


          <TextInput
            style={{ marginHorizontal:15, marginVertical:10, backgroundColor:"white" }}
            mode='outlined'
            label="Confirm Password"
            secureTextEntry={true}
            value={this.state.conpassword}
            onChangeText={(text) => {this.setState({
                conpassword: text,
              });
            if(this.state.conpassword == this.state.password){
              this.setState({
                isconpassword: false,
              });
            }}}
          />
          {this.state.isconpassword == true ? <Text style={{color:'red', marginLeft:17}}>Password miss match</Text> : null}


          <RNPickerSelect
            placeholder={placeholder3}
            items={this.state.flatnumbers}
            onValueChange={value => {this.setState({flatno: value, isflatno:false});}}
            style={pickerSelectStyles}
            value={this.state.flatno}
            useNativeAndroidPickerStyle={false}
            ref={el => {this.inputRefs.flatno = el;}}
          />
          {this.state.isflatno == true ? <Text style={{color:'red', marginLeft:17}}>Invalid option selected</Text> : null}



          

          <TextInput
            style={{ marginHorizontal:15, marginVertical:10, backgroundColor:"white" }}
            mode='outlined'
            label="No. Of Members"
            keyboardType={'phone-pad'}
            
            value={this.state.nmembers}
            onChangeText={(text) => {this.setState({
                nmembers: text,
                isnmembers:false
              });}}
          />
          {this.state.isnmembers == true ? <Text style={{color:'red', marginLeft:17}}>Invalid number</Text> : null}


          <RNPickerSelect
            placeholder={placeholder}
            items={flattypes}
            onValueChange={value => {this.setState({flattype: value, isflattype:false});}}
            style={pickerSelectStyles}
            value={this.state.flattype}
            useNativeAndroidPickerStyle={false}
            ref={el => {this.inputRefs.flattype = el;}}
          />
          {this.state.isflattype == true ? <Text style={{color:'red', marginLeft:17}}>Invalid option selected</Text> : null}

          

          <RNPickerSelect
            placeholder={placeholder2}
            items={membertypes}
            onValueChange={value => {this.setState({membertype: value, ismembertype:false});}}
            style={pickerSelectStyles}
            value={this.state.membertype}
            useNativeAndroidPickerStyle={false}
            ref={el => {this.inputRefs.membertype = el;}}
          />
          {this.state.ismembertype == true ? <Text style={{color:'red', marginLeft:17}}>Invalid option selected</Text> : null}

          
          <Button 
          style={{ margin:10, borderRadius:20, padding:4}}
          icon="content-save-settings" 
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
                this.setState({message:false})
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
    marginHorizontal: 0,
    flex:1,
    
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

