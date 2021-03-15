import * as React from 'react';
import { View, StyleSheet, Image, ImageBackground, Text, TouchableOpacity } from 'react-native';

import { Button } from "react-native-paper";

const Ad_Menu = (props, param) => {
  console.log("{{{{{{{{{{{{{{{{{{{{{{{")
  console.log(props)
  return (
    <View style={styles.menu_container}>
      {/* Menu Row 1 */}
      <View 
      style={{height:110, flexDirection:"row", 
      justifyContent:"space-between", alignItems:"center"}}>

        <TouchableOpacity 
        onPress={() => {props.props.navigation.navigate("Inc")}}  
        style={{ backgroundColor:"white", elevation:10, 
        flex:1, height:90,justifyContent:"center", alignItems:"center", margin:10, borderRadius:10}}>
          <View>
            <Image 
            source={require("../assets/income.png")} 
            style={{width:50, height:40}}>
            </Image>
            <Text style={{fontWeight:"bold"}}>Income</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={ () => {props.props.navigation.navigate("Exp")}}  
        style={{ backgroundColor:"white", elevation:10, 
        flex:1, height:90,justifyContent:"center", alignItems:"center", margin:10, borderRadius:10}}>
          <View>
            <Image 
            source={require("../assets/expense.png")} 
            style={{width:50, height:40}}>
            </Image>
            <Text style={{fontWeight:"bold"}}>Expense</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => {props.props.navigation.navigate("")}} 
        style={{ backgroundColor:"white", elevation:10, 
        flex:1, height:90,justifyContent:"center", alignItems:"center", margin:10, borderRadius:10}}>
          <View>
            <Image 
            source={require("../assets/accounting.png")} 
            style={{width:50, height:40, marginLeft:10}}>
            </Image>
            <Text style={{fontWeight:"bold"}}>Accounting</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* Menu Row 2 */}
      <View 
      style={{height:110, flexDirection:"row", 
      justifyContent:"space-between", alignItems:"center"}}>

        <TouchableOpacity 
        onPress={() => {props.props.navigation.navigate("MemberList")}}  
        style={{ backgroundColor:"white", elevation:10, 
        flex:1, height:90,justifyContent:"center", alignItems:"center", margin:10, borderRadius:10}}>
          <View>
            <Image 
            source={require("../assets/members.png")} 
            style={{width:50, height:40}}>
            </Image>
            <Text style={{fontWeight:"bold"}}>Members</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={ () => {props.props.navigation.navigate("rules", {ap:props.param.ap, id:props.param.id})}}  
        style={{ backgroundColor:"white", elevation:10, 
        flex:1, height:90,justifyContent:"center", alignItems:"center", margin:10, borderRadius:10}}>
          <View>
            <Image 
            source={require("../assets/rules.png")} 
            style={{width:50, height:40}}>
            </Image>
            <Text style={{fontWeight:"bold", marginLeft:5}}>Rules</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => {props.props.navigation.navigate("Emergency")}} 
        style={{ backgroundColor:"white", elevation:10, 
        flex:1, height:90,justifyContent:"center", alignItems:"center", margin:10, borderRadius:10}}>
          <View>
            <Image 
            source={require("../assets/emergencycontact-1.png")} 
            style={{width:50, height:40, marginLeft:10}}>
            </Image>
            <Text style={{fontWeight:"bold",}}>emergency</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View 
      style={{height:110, flexDirection:"row", 
      justifyContent:"space-between", alignItems:"center"}}>

        <TouchableOpacity 
        onPress={() => {props.props.navigation.navigate("Fdetails", {ap:props.param.ap, id:props.param.id})}}  
        style={{ backgroundColor:"white", elevation:10, 
        flex:1, height:90,justifyContent:"center", alignItems:"center", margin:10, borderRadius:10}}>
          <View>
            <Image 
            source={require("../assets/members.png")} 
            style={{width:50, height:40}}>
            </Image>
            <Text style={{fontWeight:"bold"}}>Flat Details</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={ () => {props.props.navigation.navigate("RQV", {ap:props.param.ap, id:props.param.id})}}  
        style={{ backgroundColor:"white", elevation:10, 
        flex:1, height:90,justifyContent:"center", alignItems:"center", margin:10, borderRadius:10}}>
          <View>
            <Image 
            source={require("../assets/rules.png")} 
            style={{width:50, height:40}}>
            </Image>
            <Text style={{fontWeight:"bold", marginLeft:5}}>Request</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => {props.props.navigation.navigate("Emergency", {ap:props.param.ap, id:props.param.id})}} 
        style={{ backgroundColor:"white", elevation:10, 
        flex:1, height:90,justifyContent:"center", alignItems:"center", margin:10, borderRadius:10}}>
          <View>
            <Image 
            source={require("../assets/emergencycontact-1.png")} 
            style={{width:50, height:40, marginLeft:10}}>
            </Image>
            <Text style={{fontWeight:"bold",}}>emergency</Text>
          </View>
        </TouchableOpacity>
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
    marginTop:10,
  },
});

export default Ad_Menu