import * as React from 'react';
import { View, StyleSheet, Image, ImageBackground, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Ad_Menu({navigation}) {
  return (
    <View style={styles.menu_container}>
      <View style={{height:110, flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
        <View style={{backgroundColor:"white", elevation:10, flex:1, height:100,justifyContent:"center", alignItems:"center"}}>
          <Image source={require("../assets/income1.png")} style={{width:50, height:50}}></Image>
          <Text style={{fontWeight:"bold"}}>Income</Text>
        </View>
        <View style={{ backgroundColor:"white", elevation:10, flex:1, height:100,justifyContent:"center", alignItems:"center", margin:10}}>
          <Image source={require("../assets/expense.png")} style={{width:50, height:50}}></Image>
          <Text style={{fontWeight:"bold"}}>Expence</Text>
        </View>
        <View style={{backgroundColor:"white", elevation:10, flex:1, height:100,justifyContent:"center", alignItems:"center"}}>
          <Image source={require("../assets/accounting.png")} style={{width:50, height:50}}></Image>
          <Text style={{fontWeight:"bold"}}>Accounting</Text>
        </View>
      </View>


      <View style={{height:110, flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
        <View style={{backgroundColor:"white", elevation:10, flex:1, height:100,justifyContent:"center", alignItems:"center"}}>
          <Image source={require("../assets/income1.png")} style={{width:50, height:50}}></Image>
          <Text style={{fontWeight:"bold"}}>Income</Text>
        </View>
        <View style={{ backgroundColor:"white", elevation:10, flex:1, height:100,justifyContent:"center", alignItems:"center", margin:10}}>
          <Image source={require("../assets/expense.png")} style={{width:50, height:50}}></Image>
          <Text style={{fontWeight:"bold"}}>Expence</Text>
        </View>
        <View style={{backgroundColor:"white", elevation:10, flex:1, height:100,justifyContent:"center", alignItems:"center"}}>
          <Image source={require("../assets/accounting.png")} style={{width:50, height:50}}></Image>
          <Text style={{fontWeight:"bold"}}>Accounting</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
menu_container:{
  borderTopLeftRadius:20,
  borderTopRightRadius:20,
  padding:20,
  width:"100%",
  marginTop:100,
},
});