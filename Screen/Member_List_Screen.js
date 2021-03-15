import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { BottomNavigation, Text, icon, Appbar, Avatar, Title, Subheading, Card, Paragraph, Button  } 
from 'react-native-paper';

import ProgressLoader from 'rn-progress-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';




const THEME_COLOR = '#ff4800';

export default function Member_list_Screen(props) {

  const [ap_id, setAPID] = useState(0)
  const [email, setEmail] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
      try {
          const value = await AsyncStorage.getItem('@storage_Key_who')
          const v2 = await AsyncStorage.getItem('@storage_Key_part')
          if(value !== null) {
            setAPID(v2)
            setEmail(value)
          }else{
              navigation.navigate("Login")
          }
      } catch(e) {
          return(404)
      }
      
  }

  const _goBack = () =>{
    props.navigation.navigate("Main")
  };
  const _handleSearch = () => console.log('Searching');

 


  const ft = ()=>{
    setIsLoading(true);
    fetch('http://192.168.43.179:8000/loadflats', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:JSON.stringify({
        ap:ap_id
      })
    }).then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.Status == "OK"){
            console.log(responseJson.data)
            setIsLoading(false);
            props.navigation.navigate("addmember", {d:responseJson.data, ap:ap_id, user:email})
          }
        })
        .catch((error) => {
          //setIsLoading(false);
          console.log(error)
        });
       
  }


  return(
    <>
      <Appbar.Header 
      style={{backgroundColor:"#ff4800", borderColor:"#ff4800", elevation:0}}>
          <Appbar.BackAction onPress={_goBack} />
          <Appbar.Content 
          title="Members" subtitle="" />
          <Appbar.Action icon="plus-circle" onPress={ft} />
      </Appbar.Header>
      <ProgressLoader
          visible={isLoading}
          isModal={true} isHUD={true}
          hudColor={"#ff4800"}
          color={"#FFFFFF"} />
        <ScrollView style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
            
                <View style={styles.content}>
                  <Card style={{margin:20, elevation:10, borderRadius:10}}>
                    <Card.Title title="Jitheesh" subtitle="Admin" left={props => <Avatar.Image size={28} source={require('../assets/user.png')} />} />
                    <Card.Content>
                    </Card.Content>
                    <Card.Actions>
                      <Button>Edit</Button>
                      <Button>Payments</Button>
                      <Button>Delete</Button>
                    </Card.Actions>
                  </Card>
                </View>
        </ScrollView>


        </>
  );
}

const styles = StyleSheet.create({

  scrollView: {
    backgroundColor: 'white',
  },
});
