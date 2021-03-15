import * as React from 'react';
import { View, StyleSheet, Image, ImageBackground, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const AdditionalHome = () =>{
    return(
       <View style={styles.container}>
           <View style={styles.headre}>

           </View>
           <View style={styles.sbheader}>

           </View>
           
       </View>
    );
}

const  styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
    },
    headre:{
        backgroundColor:"white",
        height:100,
        borderBottomRightRadius:30,
        borderBottomLeftRadius:30,
        zIndex:10,
        elevation: 24,
        padding:10,
        shadowColor: "#000",
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

    },
    sbheader:{
        backgroundColor:"#c6c9cf",
        height:120,
        borderBottomRightRadius:30,
        borderBottomLeftRadius:30,
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        elevation:5,
        marginTop:-50,
        zIndex:5
    }
});

export default AdditionalHome