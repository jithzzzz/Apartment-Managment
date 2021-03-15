import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, ImageBackground, View, SafeAreaView, ScrollView } from 'react-native';

import { Text, icon, Appbar, Avatar, Title, Subheading, Card, Snackbar, Button, TextInput  } 
from 'react-native-paper';

import ProgressLoader from 'rn-progress-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';


const THEME_COLOR = '#ff4800';

export default class Empcty extends React.Component{
   constructor(props) {
    super(props);

    this.state = {
      job:"",
      dis:"",
      isjob:false,
      isdis:false,
      visible:false,
      isLoading: false,
      email:"",
      ap_id:0,
      msg:"",
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
    if(this.state.job == null || this.state.job == ""){
      this.setState({isjob:true})
      status = false
    }
    if(this.state.dis == null || this.state.dis == ""){
      this.setState({isdis:true})
      status = false
    }
    if(status == true){
      this.BtnSave()
    }
  }

  BtnSave= ()=>{
    console.log(this.state.ap_id)
    console.log(this.state.email)
    this.setState({ isLoading: true });
    
    fetch('http://192.168.43.179:8000/jobtype', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:JSON.stringify({
        job:this.state.job,
        dis:this.state.dis,
        aprt:this.state.ap_id,
        user:this.state.email
      })
    }).then((response) => response.json())
        .then((responseJson) => {
          console.log('responseobject:',responseJson)
          console.log(responseJson.Status)
          if(responseJson.Status == "OK"){
            console.log("OK")
            this.setState({msg:"New Job Categorry Creacted !!!"})
            this.setState({ isLoading: false });
            this.setState({visible:!this.state.visible})
          }
        })
        .catch((error) => {
          console.log("++++ Error ++++")
          console.error(error);
          this.setState({msg:"Somthing went wrong!!!"})
          this.setState({ isLoading: false });
          this.setState({visible:!this.state.visible})
        });
        
  }

  render() {
    
    return(
      <>
       <Appbar.Header style={{backgroundColor:"#ff4800", borderColor:"#ff4800",elevation:0}}>
              <Appbar.BackAction onPress={()=>{this.props.navigation.navigate("AddeEMC")}} />
              <Appbar.Content title="Employee Type"  />
            </Appbar.Header>
          <ScrollView style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>

        <ProgressLoader
          visible={this.state.isLoading}
          isModal={true} isHUD={true}
          hudColor={"#ff4800"}
          color={"#FFFFFF"} />
           
               
             
              <View style={{margin:10,}}>
                <TextInput
                  style={{margin:10,  height:60, backgroundColor:"white"}}
                  label="Employee Type"
                  mode='outlined'
                  value={this.state.job}
                  onChangeText={(text) => {this.setState({
                      job: text,
                      isjob:false
                    });}}
                />
                {this.state.isjob == true ? <Text style={{color:'red', marginLeft:17}}>Job should not be empty</Text> : null}

                

                <TextInput
                  style={{margin:10, backgroundColor:'white'}}
                  label="Discription"
                  mode='outlined'
                  multiline={true}
                  value={this.state.dis}
                  onChangeText={(text) => {this.setState({
                      dis: text,
                      isdis:false,
                    });}}
                />
                {this.state.isdis == true ? <Text style={{color:'red', marginLeft:17}}>Discription should not be empty</Text> : null}
               
              

               <Button
          style={{margin:20, padding:5, borderRadius:20 }}
          icon="content-save-all-outline" 
          mode="contained"
          onPress={this.validation}
          >
            Save
          </Button>
              
              </View>
          </ScrollView>

          <Snackbar
          visible={this.state.visible}
          onDismiss={() =>{this.setState({visible:!this.state.visible})}}
          action={{
            label: 'Dismiss',
            onPress: () => {
              this.setState({visible:!this.state.visible})
            },
          }}>
          {this.state.msg}
        </Snackbar>
      </>
    );
  }
}


const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: 'transparent',
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
    width:"100%",
    paddingLeft: 12, // to ensure the text is never behind the icon
  },
});
  