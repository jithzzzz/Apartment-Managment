import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { BottomNavigation, Text, icon } from 'react-native-paper';

import UserprofileScreen from "../Screen/userprofile_screen";
import SettingsScreen from "../Screen/settings";
import Analysis from "../Screen/analysis";
import Admin_dashboard from "../Screen/Admin_dashboard";


const BottamNavigator = (props) =>{
    const f = props.route.params.k
    const a = props.route.params.a
    const uasername = props.route.params.uasername
    console.log(f)
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'Home', title: 'Home', icon: 'home', props:props,  id:f, ap:a, uasername:uasername},
        { key: 'Dashboard', title: 'Dashboard', icon: 'chart-bar', props:props },
        { key: 'Profile', title: 'Profile', icon: 'account-cowboy-hat', props:props, },
        { key: 'Setings', title: 'Setings', icon: 'cog', props:props, },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        Home: Admin_dashboard,
        Dashboard:Analysis,
        Profile: UserprofileScreen,
        Setings: SettingsScreen,
    });

    return(
        <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{backgroundColor:"#ff4800"}}
        />
    );
}

export default BottamNavigator