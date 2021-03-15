import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, View, ScrollView, Dimensions, FlatList, RefreshControl } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { BottomNavigation, Text, icon, Appbar, Avatar, Title, Subheading, Card, Paragraph, Button  } 
from 'react-native-paper';
import ProgressLoader from 'rn-progress-loader';

import Basic_satistic_cards from "../components/Basic_satistics";
import SatisticCards  from "../components/statistic";
import Ad_Menu from "../components/AD_Menu";
import AppStatusBar from "../components/AppStatusBar";



const THEME_COLOR = '#ff4800';

const RulesView = (props) =>{

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(()=>{
    loadingRules()
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadingRules()
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const loadingRules = () =>{
    setIsLoading(true);
    console.log("Lodedd......")
    fetch('http://192.168.43.179:8000/RulesLoad', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body:JSON.stringify({
      aprt:props.route.params.ap,
      user:props.route.params.id
    })
  }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.Status == "OK"){
          setData(responseJson.Data)
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }
  
  const _goBack = () =>{
      props.navigation.navigate("Main")
  };

  const Item = ({ title, date, dis }) => (
    <Card style={{elevation:10, margin:10, borderRadius:10}}>
      <Card.Title title={title} subtitle={date}  />
      <Card.Content>
        <Paragraph>
          {dis}
        </Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button 
        icon="file-edit" 
        mode="contained" 
        style={{backgroundColor:"#ff4800", borderRadius:18}} 
        onPress={() => console.log('Pressed')}>
        Edit
        </Button>
        <Button 
        icon="delete-alert" 
        mode="contained" 
        style={{marginLeft:10, backgroundColor:"#ff4800", borderRadius:18}} 
        onPress={() => console.log('Pressed')}>
        Delete
        </Button>
      </Card.Actions>
    </Card>
  )

  const renderItem = ({ item }) => (
    <Item title={item.rule_heading} date={item.created_date} dis={item.rule_message}  />

  );
  return(
      <>
        <Appbar.Header style={{backgroundColor:"#ff4800", borderColor:"#ff4800", elevation:0}}>
          <Appbar.BackAction onPress={_goBack} />
          <Appbar.Content 
          title="Rules" subtitle="Rules are in place to keep people safe" />
          <Appbar.Action icon="plus-circle" 
          onPress={()=>{props.navigation.navigate("rulesadd", {ap:props.route.params.ap, id:props.route.params.id})}} />
        </Appbar.Header>

        <ProgressLoader
        visible={isLoading}
        isModal={true} isHUD={true}
        hudColor={"#ff4800"}
        color={"#FFFFFF"} />
            

        <ScrollView style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        >
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={{marginTop:0}}
          />
          
        </ScrollView>
        <ImageBackground
        style={[styles.fixed, styles.containter, {zIndex: -1}]}
        source={require("../assets/Memberlist.jpg")}>
        </ImageBackground>
      </>
  );
    
}


const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: 'transparent',
      marginHorizontal:15
    },
    containter: {
      width: Dimensions.get("window").width, //for full screen
      height: Dimensions.get("window").height //for full screen
    },
    fixed: {
      position: "absolute",
      top: 30,
      left: 0,
      right: 0,
      bottom: 0
    },
});
  

export default RulesView