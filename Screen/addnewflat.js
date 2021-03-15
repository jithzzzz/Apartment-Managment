import React, { useEffect } from 'react';
import { StyleSheet, ImageBackground, View, ScrollView } from 'react-native';
import { Appbar, Button, TextInput, Snackbar, Text } from 'react-native-paper';

import ProgressLoader from 'rn-progress-loader';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';



const THEME_COLOR = '#ff4800';

export default class FlatAdd extends React.Component{
  constructor(props){
    console.log(props)
    super(props);
    this.state = {
      flatno:"",
      sqrt:"",
      floorno:"",
      isflatno:false,
      issqrt:false,
      isfloorno:false,
      floornumbers:props.route.params.fd,
      visible:false,
      isLoading: false,
      ruleValid:false,
      disValid:false,
      email:props.route.params.id,
      ap_id:props.route.params.ap,
      status:true,
      message:"",
    };
    
  }

  

  
  BtnSave = () =>{
    this.setState({ isLoading: true });
    fetch('http://192.168.43.179:8000/FlatNoSave', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:JSON.stringify({
        flatno:this.state.flatno,
        sqrt:this.state.sqrt,
        floorno:this.state.floorno,
        aprt:this.state.ap_id,
        user:this.state.email
      })
    }).then((response) => response.json())
        .then((responseJson) => {
          console.log('responseobject:',responseJson)
          if(responseJson.Status == "OK"){
            console.log("OK")
            this.setState({message:responseJson.Message})
            this.setState({visible:!this.state.visible})
            this.setState({ isLoading: false });
          }
          else{
            this.setState({message:responseJson.Message})
            this.setState({visible:!this.state.visible})
            this.setState({ isLoading: false });
          }
        })
        .catch((error) => {
          console.error(error);
          this.setState({ isLoading: false });
        });
  }

  validation =() =>{
    let status = true
    if(this.state.flatno == "" || this.state.flatno == null){
      this.setState({isflatno:true})
      status = false
    }else{
      this.setState({isflatno:false})
    }

    if(this.state.sqrt  == "" || this.state.sqrt == 0 || this.state.sqrt == null){
      this.setState({issqrt:true})
      status = false
    }

    if(this.state.floorno  == "" || this.state.floorno == 0 || this.state.floorno == null){
      this.setState({isfloorno:true})
      status = false
    }

    if(status == true){
      this.BtnSave()
    }
  }

    placeholder = {
        label: 'Select Floor Number',
        value: null,
        color: '#9EA0A4',
    };

  render(){
    return(
      <>
        <Appbar.Header style={{backgroundColor:"#ff4800", borderColor:"#ff4800",elevation:0}}>
          <Appbar.BackAction onPress={()=>{this.props.navigation.navigate("Fdetails")}} />
          <Appbar.Content title="Add Flat Details"  />
        </Appbar.Header>

        <ProgressLoader
          visible={this.state.isLoading}
          isModal={true} isHUD={true}
          hudColor={"#ff4800"}
          color={"#FFFFFF"} />
              


        <ScrollView style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>

          <View style={{width:"100%"}}>
            <TextInput
              style={{marginHorizontal:15, marginVertical:10,  backgroundColor:"white"}}
              label="Flat No."
              mode='outlined'
              value={this.state.flatno}
              onChangeText={(text) => {
                this.setState({flatno: text,})
                this.setState({isflatno:false})
              }}
            />
            {this.state.isflatno == true ? <Text style={{color:"red", marginLeft:15}}>Field must not be empty</Text> : null}

            <TextInput
              style={{marginHorizontal:15, marginVertical:10,  backgroundColor:"white"}}
              label="Total Square Feet"
              mode='outlined'
              value={this.state.dis}
              keyboardType={'phone-pad'}
              onChangeText={(text) => {
                this.setState({sqrt: text,})
                this.setState({issqrt:false})
              }}
            />
            {this.state.issqrt == true ? <Text style={{color:"red", marginLeft:15}}>Field must not be empty</Text> : null}

            <RNPickerSelect
            placeholder={this.placeholder}
            items={this.state.floornumbers}
            onValueChange={value => {this.setState({floorno: value, isfloorno:false});}}
            style={pickerSelectStyles}
            value={this.state.floorno}
            useNativeAndroidPickerStyle={false}
            />
            {this.state.isfloorno == true ? <Text style={{color:"red", marginLeft:15}}>Invalid option selected</Text> : null}

            <Button
            style={{ margin:20, padding:5, borderRadius:20}}
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
      paddingVertical:20
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