import React, { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, View, TextInput, Button, TouchableOpacity, Text,  } from 'react-native';
import * as Font from 'expo-font';
import ProgressLoader from 'rn-progress-loader';
import { Snackbar  } from 'react-native-paper';



const USER_SERVICE_URL = 'http://192.168.43.179:8000/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
    
 
import {openDatabase} from "expo-sqlite";
import { or } from 'react-native-reanimated';


const LoginScreen = ({navigation}) =>{
  // When you have the JWT credentials

    useEffect(() => {
      getData()
      console.log("**************************** %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    }, []);

    const storeData = async (value, a_name, name) => {
      try {
        console.log(value)
        console.log(a_name)
        await AsyncStorage.setItem('@storage_Key_who', value)
        await AsyncStorage.setItem('@storage_Key_part', a_name)
        await AsyncStorage.setItem('@storage_Key_name', name)
      } catch (e) {
        // saving error
      }
    }
  
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key_who')
        const v2 = await AsyncStorage.getItem('@storage_Key_part')
        const v3 = await AsyncStorage.getItem('@storage_Key_name')
        if(value !== null) {
          // value previously stored
          console.log("Page  LOGin : " + value + " " + v2)

          navigation.navigate("Main", {k:value, a:v2, uasername:v3})
        }
        else{
          console.log("Null")
        }
      } catch(e) {
        return(404)
      }
    }


    const [username,Setusername] = useState(null)
    const [password,Setpassword] = useState(null)
    const [userValid, SetUserValid] = useState(false)
    const [passValid, SetPassValid] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [uvtext, SetUvtext] = useState({txt:"Wrong Username", color:"red"})
    const [pvtext, SetPvtext] = useState({txt:"Wrong Password", color:"red"})
    const [message, setMessage] = useState("")
    const validation = () =>{
      let status = true
      console.log(status)
      if(username == null || username == "" || username.length != 10){
        SetUserValid(true)
        status = false
        console.log("8888888")
      }
      if(password == null || password == ""){
        SetPassValid(true)
        status = false
      }
      if(status == true){
        login_check()
      }
    }
    const login_check = () =>{
      setIsLoading(true);
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
            if(responseJson.Status == "OK"){
              console.log("########################################")
              console.log(responseJson)
              storeData(responseJson.s_name, responseJson.a_name, responseJson.Name)
              setIsLoading(false);
              navigation.navigate("Main", {k:responseJson.s_name, a:responseJson.a_name, uasername:responseJson.Name})
            }
            else{
              setMessage(responseJson.Status)
              setIsLoading(false);
              setVisible(true)
            }
          })
          .catch((error) => {
            console.error(error);
            setIsLoading(false);
          });
    }
    
    return(
        
        <ImageBackground source={require("../assets/login.jpg")} style={styles.image}>
          <ProgressLoader
          visible={isLoading}
          isModal={true} isHUD={true}
          hudColor={"#ff4800"}
          color={"#FFFFFF"} />

          <View style={{backgroundColor:"white", padding:10, marginTop:"80%",}}>

            <TextInput
            style={styles.input}
            onChangeText={text =>{Setusername(text); SetUserValid(false)}}
            
            value={username}
            placeholder="Mobile Number"
            underlineColorAndroid="transparent"
            keyboardType={'phone-pad'}
            />
            {userValid == true ? <Text style={{color:uvtext.color, marginLeft:15}}>{uvtext.txt}</Text> : null}

            <TextInput
            style={styles.input}
            onChangeText={text =>{Setpassword(text); SetPassValid(false)}}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            />
            {passValid == true ? <Text style={{color:pvtext.color, marginLeft:15}}>{pvtext.txt}</Text> : null}


            <View style={{backgroundColor:"white", flexDirection:"row", justifyContent:"space-around"}}>
              <View style={{width:"90%", marginTop:10}}>
                <TouchableOpacity onPress={validation} style={styles.appButtonContainer}>
                  <Text style={styles.appButtonText}>Login</Text>
                </TouchableOpacity> 
              </View>
            </View>
           
            <TouchableOpacity
            onPress={()=>{navigation.navigate("BasicRregitser")}}>
              <Text
               style={{fontSize:16, fontWeight:"bold", margin:14}}
              >
                Don't have an account? Sign Up here</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text
              style={{fontSize:16, fontWeight:"bold", marginLeft:14}}
              >
                Forgot Password</Text>
            </TouchableOpacity>
          </View>

          <Snackbar
            visible={visible}
            onDismiss={() =>{setVisible(false)}}
            action={{
              label: 'Dismiss',
              onPress: () => {
                setVisible(false)
              },
            }}>
            {message} !!!
          </Snackbar>
          
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#ff4800",
    borderRadius: 10,
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
      textAlign:"center",
      borderRadius:10
    }

});

export default LoginScreen