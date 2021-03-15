import React, { useState, useRef  } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';



// or any pure javascript modules available in npm
import { Card, Button, Paragraph, Title, Avatar, Text, TextInput, Appbar } from 'react-native-paper';

import StepIndicator from 'react-native-step-indicator';
import RBSheet from "react-native-raw-bottom-sheet";
import { Rating, AirbnbRating } from 'react-native-ratings';

export default function requeststatus(props) {
  const refRBSheet = useRef();
  const [currentPosition, setCurrentPosition] = useState(3)
  const labels = ["Requset Initiated","Assigned","Work In Progress","Completed","Rating"];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013'
  }

  const LeftContent = props => <Avatar.Icon {...props} icon="account-tie`" />

  const _goBack = () =>{ props.navigation.navigate("RQV") };

  

  return (
    <>
    <Appbar.Header 
    style={{backgroundColor:"#ff4800", borderColor:"#ff4800", elevation:0}}>
      <Appbar.BackAction onPress={_goBack} />
      <Appbar.Content 
        title="Requsts" subtitle="" />
     
    </Appbar.Header>
    <ScrollView style={styles.scrollView}
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}>
        <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            labels={labels}
        />

    <View 
    style={styles.chatText}>
    <Avatar.Icon size={24} icon="chat" style={{}}/>
    <Text style={{padding:4, fontSize:14, fontWeight:'100'}}>Hi We Initiated Ajith will come to fix the 
    issue today<Text style={{fontWeight:'bold'}}> - Jitheesh</Text></Text>
    </View>

    <View 
    style={styles.chatText}>
    <Avatar.Icon size={24} icon="chat" style={{}}/>
    <Text style={{padding:4, fontSize:14, fontWeight:'100'}}>Hi We the 
    issue today</Text>
    </View>

    <View 
    style={styles.chatText}>
    <Avatar.Icon size={24} icon="chat" style={{}}/>
    <Text style={{padding:4, fontSize:14, fontWeight:'100'}}>
    How satisfied your in this service 
    <AirbnbRating
    count={10}
    reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable",]}
    defaultRating={0}
    size={20}
    onFinishRating={(value) =>{alert(value)}}
    />
    </Text>
    </View>

    </ScrollView>
    </>

  );
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white',
      },
    chatText:{
        flexDirection:"row", 
        margin:10, 
        padding:10, 
        backgroundColor:"#f7f5f5", 
        borderTopLeftRadius:30, 
        borderTopRightRadius:30, 
        borderBottomRightRadius:30,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
    }
});
