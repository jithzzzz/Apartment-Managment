import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, View, SafeAreaView, ScrollView } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { BottomNavigation, Text, icon, Appbar, Avatar, Title, Subheading  } from 'react-native-paper';
import ProgressLoader from 'rn-progress-loader';

import Basic_satistic_cards from "../components/Basic_satistics";
import SatisticCards  from "../components/statistic";
import Ad_Menu from "../components/AD_Menu";
import AppStatusBar from "../components/AppStatusBar";

import BottamNavigator from "../navigator/bottomnavigator";
import AsyncStorage from '@react-native-async-storage/async-storage';

const _goBack = () => console.log('Went back');

const _handleSearch = () => console.log('Searching');

const _handleMore = () => console.log('Shown more');

const THEME_COLOR = '#ff4800';

const Admin_dashboard = (props, id) =>{
    const [ap_id, setAPID] = useState(props.route.ap)
    const [email, setEmail] = useState(props.route.id)
    const [uname, setUname] = useState(props.route.uasername)
    const [isLoading, setIsLoading] = useState(false)
    const [mydate, setMydate] = useState("")

    const [inc, setInc] = useState(0)
    const [exp, setExp] = useState(0)

    const lk = () =>{
        console.log("++++ LK ++++++")
        setIsLoading(true);
        fetch('http://192.168.43.179:8000/personalized', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:JSON.stringify({
            aprt:ap_id,
            user:email,
        })
        }).then((response) => response.json())
            .then((responseJson) => {
            console.log(responseJson)
            console.log(responseJson.Status)
            if(responseJson.Status == "OK"){
                setInc(responseJson.inc)
                setExp(responseJson.exp)
                setMydate(responseJson.CM)
                setIsLoading(false)
            }
            })
            .catch((error) => {
            console.log('5555555')
            console.error(error);
            setIsLoading(false);
            setVisible(true)
            });
    }

    useEffect(() => {
        lk()
    }, []);


    

    const [name, setName] = useState("")
    return(
        <>
          <Appbar.Header style={{backgroundColor:"#ff4800", borderColor:"#ff4800", elevation:0}}>
                <Avatar.Image size={24} source={require('../assets/user.png')} style={{backgroundColor:"#ff4800", paddingLeft:5}}/>
                <Appbar.Content title="Apartment Care" style={{width:5, alignItems:"center"}} />
                <Avatar.Image size={24} source={require('../assets/bell.png')} style={{backgroundColor:"#ff4800", paddingRight:20}}/>
            </Appbar.Header>

            <ProgressLoader
          visible={isLoading}
          isModal={true} isHUD={true}
          hudColor={"#ff4800"}
          color={"#FFFFFF"} />
            <ScrollView style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
          
            <View style={{backgroundColor:"#ff4800", padding:15, }}>
                <Title style={{color:"white", fontWeight:"bold", marginLeft:20}}>HI {uname}</Title>
                <Subheading style={{color:"white", marginLeft:20}}>What would you like to do today?</Subheading>
                <View style={{backgroundColor:"#ff4800", padding:15, }}>
                    <Title style={{color:"white", fontWeight:"bold", marginLeft:20}}>Let's Get your ApartmentInAction</Title>
                </View>
            </View>
            
            <ImageBackground source={require("../assets/homewhitebg2.jpg")} style={styles.image}>

            <View style={{backgroundColor:"red"}}>
            
            </View>
            <SatisticCards props={props.route.props} param ={{inc:inc, mydate:mydate, exp:exp}} />
            <Ad_Menu props={props.route.props} param ={{id:props.route.id, ap:props.route.ap}} />
            </ImageBackground>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    image: {
        flex:1,
        resizeMode: "cover",
        justifyContent:"flex-start",
        alignItems:"center",
        height:"100%",
        width:"100%"
    },
    scrollView: {
        backgroundColor: 'white',
        marginHorizontal: 0,
        height:"100%",
        flex:1
    },
});

export default Admin_dashboard


