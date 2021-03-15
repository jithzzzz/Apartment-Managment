import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, View, ScrollView, Dimensions, FlatList, RefreshControl } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { BottomNavigation, Text, icon, Appbar, Avatar, Title, Subheading, Card, Paragraph, Button  } 
from 'react-native-paper';
import ProgressLoader from 'rn-progress-loader';



const THEME_COLOR = '#ff4800';

const Flatdetails = (props) =>{

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
    fetch('http://192.168.43.179:8000/FlatDetailsLoad', {
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
          console.log(responseJson)
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



  const Item = ({ title, floor_no, total_no_members, primary_tenant_name, sqrt }) => (
    
    <Card style={{elevation:10, margin:10, borderRadius:10}}>
      <Card.Title title={title} subtitle='Flat No.'  />
      <Card.Content>
        
        <View style={{flex:1}}>
          <View style={{flexDirection:'row', margin:3}}>
            <Avatar.Icon size={30} icon="office-building" style={{marginTop:1}} />
            <Text style={{fontSize:16, fontWeight:'400', padding:5,}}>
              Floor. : {floor_no}
            </Text>
          </View>

          <View style={{flexDirection:'row', margin:3}}>
            <Avatar.Icon size={30} icon="account-check" style={{marginTop:1}} />
            <Text style={{fontSize:16, fontWeight:'400', padding:5}}>
              Member Name : {primary_tenant_name}
            </Text>
          </View>

          <View style={{flexDirection:'row', margin:3}}>
            <Avatar.Icon size={30} icon="account-group" style={{marginTop:1}} />
            <Text style={{fontSize:16, fontWeight:'400', padding:5}}>
              Number Of Members : {total_no_members}
            </Text>
          </View>

          <View style={{flexDirection:'row', margin:3}}>
            <Avatar.Icon size={30} icon="panorama-wide-angle" style={{marginTop:1}} />
            <Text style={{fontSize:16, fontWeight:'400', padding:5}}>
              Sqrt. : {sqrt}
            </Text>
          </View>
        </View>
        
      </Card.Content>
      <Card.Actions style={{justifyContent:'flex-end'}}>
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
    <Item title={item.flat_no} floor_no={item.floor_no} sqrt={item.sqrt} primary_tenant_name={item.primary_tenant_name}  
    total_no_members={item.total_no_members} />

  );
  const floors =()=>{
    setIsLoading(true);
    fetch('http://192.168.43.179:8000/Floors', {
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
            console.log(responseJson.Data[0]['aprtment_total_sqrt'])
            setIsLoading(false);
            props.navigation.navigate("FADD", {ap:props.route.params.ap, id:props.route.params.id,
                aprtment_total_sqrt:responseJson.Data[0]['aprtment_total_sqrt'],
                flat_per_floor:responseJson.Data[0]['flat_per_floor'],
                no_floor:responseJson.Data[0]['no_floor'],
                fd:responseJson.FD,
            })
        }
        else{
            setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
    
  }
  return(
      <>
        <Appbar.Header style={{backgroundColor:"#ff4800", borderColor:"#ff4800", elevation:0}}>
          <Appbar.BackAction onPress={_goBack} />
          <Appbar.Content 
          title="Flat Details" subtitle="" />
          <Appbar.Action icon="plus-circle" 
          onPress={()=>{floors()}} />
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
  

export default Flatdetails