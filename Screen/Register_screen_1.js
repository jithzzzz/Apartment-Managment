import React, { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, View, TouchableOpacity } from 'react-native';
import { Text, TextInput, IconButton, Colors, Button } from 'react-native-paper';

const BasicRegister = ({navigation}) =>{
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [pho, setPho] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false)

  const AprCheck = () =>{
    setLoading(true);
    console.log("clicked");
    console.log(email);
    console.log(name);
    console.log(pho);
    console.log(password);
    fetch('http://192.168.43.179:8000/RegAuth', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:JSON.stringify({
        name:name,
        email:email,
        pho:pho,
        password:password
      })
    }).then((response) => response.json())
        .then((responseJson) => {
          console.log('responseobject:',responseJson)
          console.log(responseJson.Status)
          if(responseJson.Status == "OK"){
            navigation.navigate("Register")
          }
          else if(responseJson.Status == "Good"){
            if(responseJson.PageKey == 1){
              navigation.navigate("Register", {key:responseJson.Key, main:responseJson.Main})
            }
            else if(responseJson.PageKey == 2){
              navigation.navigate("CTRAPRT2", {key:responseJson.Key, main:responseJson.Main})
            }
            else if(responseJson.PageKey == 3){
              navigation.navigate("CTRAPRT3", {key:responseJson.Key, main:responseJson.Main})
            }
          }
          else{
            console.log(responseJson.Message)
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }
  
  return(
    <ImageBackground style={styles.container} source={require("../assets/hello.jpg")}>
      <TextInput
        style={{width:"100%", margin:10}}
        label="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
       <TextInput
       style={{width:"100%", margin:10}}
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
       <TextInput
       style={{width:"100%", margin:10}}
          label="Mobile Number"
          maxLength={10}
          multiline={false}
          value={pho}
          onChangeText={text => setPho(text)}
      />
      <TextInput
       style={{width:"100%", margin:10}}
          label="Password"
          value={password}
          maxLength={8}
          multiline={false}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
      />
     <Button
     style={{width:"100%", margin:10, backgroundColor:"#ff4800", paddingTop:5, paddingBottom:5}}
     icon="camera" 
     mode="contained"
     loading={loading}
     onPress={AprCheck}>
     Get Start
     </Button>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
container:{
  flex:1,
  justifyContent:"center",
  alignItems:"center",
  padding:20,
  backgroundColor:"white"
}
});

export default BasicRegister;