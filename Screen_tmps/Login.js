import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, View, TextInput, Button, TouchableOpacity, Text } from 'react-native';
//import { Container, Text, Button, Form, Item, Label, Input } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const USER_SERVICE_URL = 'http://auroxa.pythonanywhere.com/index';
    

const LoginScreen = ({navigation}) =>{
    
    const [username,Setusername] = useState("")
    const [password,Setpassword] = useState("")

    const login_check = () =>{
      console.log("clicked");
      console.log(username);
      console.log(password);
      fetch('http://192.168.43.179:8000/Auth', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:JSON.stringify({
          username:username,
          password:password
        })
      }).then((response) => response.json())
          .then((responseJson) => {
            console.log('responseobject:',responseJson)
            console.log(responseJson.Status)
            if(responseJson.Status == "OK"){
              navigation.navigate("Base")
            }
          })
          .catch((error) => {
            console.error(error);
          });
    }
    
    return(
        
        <ImageBackground source={require("../assets/login.jpg")} style={styles.image}>
          <View style={{backgroundColor:"white", height:"30%", padding:10, marginTop:"80%"}}>
          <TextInput
            style={styles.input}
            onChangeText={text => Setusername(text)}
            value={username}
            placeholder="User Name"
            underlineColorAndroid="transparent"
            />

            <TextInput
            style={styles.input}
            onChangeText={text => Setpassword(text)}
            value={password}
            placeholder="Password"
            underlineColorAndroid="transparent"
            />
            <View style={{backgroundColor:"white", flexDirection:"row", justifyContent:"space-around"}}>
              <View style={{width:"40%", height:100}}>
                <TouchableOpacity onPress={login_check} style={styles.appButtonContainer}>
                  <Text style={styles.appButtonText}>Login</Text>
                </TouchableOpacity> 
              </View>
              
            </View>
          </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
    container_form:{
        marginTop:"100%",
    },
    container_view: {
      margin:"10%",
      alignItems:"center",
      flex:1,
      flexDirection:'row',
      justifyContent:"space-between"
      
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"

    },
    btn:{
        marginTop:10,
        width:"40%",
    },
    input:{
      height: 50, 
      borderColor: 'black', 
      borderWidth: 1, 
      margin:10,
      padding:2,
      textAlign:"center"
    }

});

export default LoginScreen