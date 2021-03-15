import * as React from 'react';
import { View, StyleSheet, Image, ImageBackground, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SatisticCards({navigation}) {
  return (
    <View style={{height:100, width:"100%", marginTop:10}}>
      <View style={styles.card_container}>
        <TouchableOpacity style={{backgroundColor:"#0072bc", padding:10, textAlign:"center", width:"45%", borderRadius:10, alignItems:"center", justifyContent:"center"}}>
            <Text style={{fontSize:20, fontWeight:"bold", color:"white"}}>30000</Text>
            <Text style={{color:"white"}}>Income</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{backgroundColor:"#00bff3", padding:10, textAlign:"center", width:"45%", borderRadius:10, alignItems:"center", justifyContent:"center"}}>
            <Text style={{fontSize:20, fontWeight:"bold", color:"white"}}>30000</Text>
            <Text style={{color:"white"}}>Income</Text>
          </TouchableOpacity>
      </View>
    </View>

    
    
  );
}

const styles = StyleSheet.create({
  card_container:{
    //marginTop:-50,
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
    backgroundColor:"#00bff3",
  },
  card2:{
    width:90,
    height:90,
    backgroundColor:"#ec00Bc",
  },
  body:{
    justifyContent: 'center',
    flex:1,
    alignItems:"center",
  },
  text_color:{
    color:"white",
  },
  text_color_b:{
    color:"white",
    textAlign:"center",
    padding:1,
    fontWeight:"bold",
    fontSize:20
  },
});