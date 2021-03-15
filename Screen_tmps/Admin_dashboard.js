import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, ImageBackground, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { BottomNavigation, Text, icon } from 'react-native-paper';

import Basic_satistic_cards from "../components/Basic_satistics";
import SatisticCards  from "../components/statistic";
import Ad_Menu from "../components/AD_Menu";
import AppStatusBar from "../components/AppStatusBar";


const THEME_COLOR = '#ff4800';

const Admin_dashboard = ({navigation}) =>{
    
    return(
        <>
            <SafeAreaView style={styles.topSafeArea} />
            <SafeAreaView style={styles.bottomSafeArea}>
                <AppStatusBar backgroundColor={THEME_COLOR} barStyle="light-content" />
                <ImageBackground source={require("../assets/homewhitebg2.jpg")} style={styles.image}>
                    <Basic_satistic_cards/>
                    <SatisticCards/>
                    <Ad_Menu/>
                </ImageBackground>
            </SafeAreaView>
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
    topSafeArea: {
        flex: 0, 
        backgroundColor: "#ff4800"
    },
    bottomSafeArea: {
        flex: 1, 
        backgroundColor: "#ff4800"
    }
});

export default Admin_dashboard


