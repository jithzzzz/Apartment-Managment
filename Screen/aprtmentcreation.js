import React, { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, View, TouchableOpacity, ScrollView } from 'react-native';
import { Text, TextInput, IconButton, Colors, Button } from 'react-native-paper';

const CreateApartment = ({navigation, route}) =>{
  const key = route.params.key
  const [loading, setLoading] = React.useState(false)
  const [name, setName] = React.useState("")
  const [state, setSate] = React.useState("")
  const [address, setAddress] = React.useState("")
  const [pincode, setPincode] = React.useState("")
  const [city, setCity] = useState("")

  const AprCheck = () =>{
    console.log("clicked");
    console.log(name);
    console.log(state);
    console.log(address)
    console.log(pincode)
    console.log(city)
    console.log(key)
    fetch('http://192.168.43.179:8000/RegAuthAprt', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:JSON.stringify({
        name:name,
        state:state,
        address:address,
        pincode:pincode,
        city:city,
        key:key,
      })
    }).then((response) => response.json())
        .then((responseJson) => {
          console.log('responseobject:',responseJson)
          console.log(responseJson.Status)
          if(responseJson.Status == "OK"){
            navigation.navigate("CTRAPRT2", {key:responseJson.Key, main:responseJson.Main})
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }
  
  return(
    <ScrollView style={{backgroundColor:"white"}}
        showsHorizontalScrollIndicator={false}>
       <TextInput
        style={{width:"100%", margin:10, backgroundColor:"white", height:60}}
        label="Apartment Name"
        value={name}
        onChangeText={text => setName(text)}
      />

      <TextInput
        style={{width:"100%", margin:10, backgroundColor:"white", height:60}}
        label="State"
        value={state}
        onChangeText={text => setSate(text)}
      />

      <TextInput
        style={{width:"100%", margin:10, backgroundColor:"white", height:60}}
        label="City"
        value={city}
        onChangeText={text => setCity(text)}
      />

      <TextInput
        style={{width:"100%", margin:10, backgroundColor:"white", height:60}}
        label="Address"
        value={address}
        onChangeText={text => setAddress(text)}
      />

       <TextInput
        style={{width:"100%", margin:10, backgroundColor:"white", height:60}}
        label="Pin Code"
        value={pincode}
        onChangeText={text => setPincode(text)}
      />

       <Button
        style={{width:"100%", margin:10}}
        icon="camera" 
        mode="contained"
        loading={loading}
        onPress={AprCheck}
        >
          Good To Go
        </Button>

    </ScrollView>
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

export default CreateApartment;