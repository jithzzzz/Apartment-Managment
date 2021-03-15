import * as React from 'react';
import { View, StyleSheet, Image,ImageBackground, TouchableOpacity, Text } from 'react-native';


export default function Basic_satistic_cards({navigation}) {
  return (
    <View style={{height:100, width:"100%", marginTop:10}}>
      <View style={styles.card_container}>
        <TouchableOpacity style={{backgroundColor:"#10bf4e", padding:10, textAlign:"center", width:"45%", borderRadius:10, alignItems:"center", justifyContent:"center"}}>
          <Text style={{fontSize:20, fontWeight:"bold", color:"white"}}>30000</Text>
          <Text style={{color:"white"}}>Income</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{backgroundColor:"#f9e93b", padding:10, textAlign:"center", width:"45%", borderRadius:10, alignItems:"center", justifyContent:"center"}}>
          <Text style={{fontSize:20, fontWeight:"bold", color:"white"}}>30000</Text>
          <Text style={{color:"white"}}>Income</Text>
        </TouchableOpacity>
      </View>
    </View>

    
    
  );
}

const styles = StyleSheet.create({
  card_container:{
    flex:1,
    flexDirection:"row",
    marginRight:15,
    marginLeft:15,
    height:100,
    //backgroundColor:"white",
    justifyContent:"space-around",
  },
  card1:{
    width:90,
    height:90,
    backgroundColor:"#10bf4e",
    borderRadius:5,
  },
  card2:{
    width:90,
    height:90,
    backgroundColor:"#f9e93b",
  },
  card3:{
    width:90,
    height:90,
    backgroundColor:"#0072bc",
  },
  text_color:{
    color:"white",
    textAlign:"center",
    padding:1,
  },
  text_color_b:{
    color:"white",
    textAlign:"center",
    padding:1,
    fontWeight:"bold",
    fontSize:20
  },
  body:{
    justifyContent: 'center',
    flex:1,
    alignItems:"center"
  }
});