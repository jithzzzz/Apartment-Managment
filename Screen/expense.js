import React, { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, View, TextInput, TouchableOpacity, Dimensions, SafeAreaView, ScrollView } from 'react-native';

import { BottomNavigation, Text, icon, Appbar, Avatar, Title, Subheading, Button, Headline, Caption } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const screenWidth = Dimensions.get("window").width;


import ProgressLoader from 'rn-progress-loader';

const THEME_COLOR = '#ff4800';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";



const Expense = (props) =>{

  const [ap_id, setAPID] = useState(0)
  const [email, setEmail] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
      try {
          const value = await AsyncStorage.getItem('@storage_Key_who')
          const v2 = await AsyncStorage.getItem('@storage_Key_part')
          if(value !== null) {
            setAPID(v2)
            setEmail(value)
          }else{
              navigation.navigate("Login")
          }
      } catch(e) {
          return(404)
      }
      
  }

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43]
      }
    ]
  };

  const ft = ()=>{
    setIsLoading(true);
    fetch('http://192.168.43.179:8000/loadexptype', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:JSON.stringify({
        ap:ap_id
      })
    }).then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.Status == "OK"){
            console.log(responseJson.data)
            setIsLoading(false);
            props.navigation.navigate("Expadd", {d:responseJson.data})
          }
        })
        .catch((error) => {
          //setIsLoading(false);
          console.log(error)
        });
       
  }

  return(
    <>
      <ProgressLoader
          visible={isLoading}
          isModal={true} isHUD={true}
          hudColor={"#ff4800"}
          color={"#FFFFFF"} />
      <ScrollView style={{backgroundColor:"#ff4800", height:"100%"}}
      showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <Appbar.Header 
        style={{backgroundColor:"#ff4800", borderColor:"#ff4800",elevation:0}}>
          <Appbar.BackAction 
          onPress={()=>{ props.navigation.navigate("Main")}} />
          <Appbar.Content title="My Apartment Expense"  />
          <Appbar.Action 
          icon="plus-circle" 
          onPress={ft} />
        </Appbar.Header>
        <View style={{flexDirection:"row", justifyContent:"space-evenly", width:"100%", backgroundColor:"#ff4800", padding:15, }}>
          <Button
          mode="contained" 
          onPress={() => console.log('Pressed')} 
          labelStyle={{fontSize:8, color:"#ff4800"}} 
          color="white" 
          style={{borderRadius:15}} >
            Overall
          </Button>
          <Button
          mode="contained" 
          onPress={() => console.log('Pressed')} 
          labelStyle={{fontSize:8, color:"#ff4800"}}
          color="white"
          style={{borderRadius:15}}>
          Weekly
          </Button>
          <Button  
          mode="contained" 
          onPress={() => console.log('Pressed')} 
          labelStyle={{fontSize:8, color:"#ff4800"}} 
          color="white"
          style={{borderRadius:15}}>
          Yearly
          </Button>
        </View>

        
        
        <View style={{justifyContent:"center", alignItems:"center", backgroundColor:"#ff4800", padding:20}}>
        <LineChart
        data={{
          labels: ["March", "April", "May", "June"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
              ]
            }
          ]
        }}
        width={Dimensions.get("window").width-50} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#ff4800",
          backgroundGradientFrom: "#ff4800",
          backgroundGradientTo: "#ff4800",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
        },
        propsForDots: {
          r: "6",
          strokeWidth: "10",
          stroke: "#ffa726"
        }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
        />
          <ScrollView
        showsHorizontalScrollIndicator={false}
          style={styles.container}
          //pagingEnabled={true}
          horizontal= {true}
          decelerationRate={0}
          snapToInterval={screenWidth - 60}
          snapToAlignment={"center"}
          contentInset={{
            top: 0,
            left: 30,
            bottom: 0,
            right: 30,
          }}>
          <View style={styles.viewMonths}>
            <Button
            mode="outlined" 
            onPress={() => console.log('Pressed')} 
            labelStyle={{fontSize:8, color:"white"}} 
            style={{borderRadius:15, borderColor:"white"}} >
              January 2020
            </Button>
          </View>
          <View style={styles.viewMonths}>
            <Button
            mode="outlined" 
            onPress={() => console.log('Pressed')} 
            labelStyle={{fontSize:8, color:"white"}} 
            style={{borderRadius:15, borderColor:"white"}} >
              January 2020
            </Button>
          </View>
          <View style={styles.viewMonths}>
            <Button
            mode="outlined" 
            onPress={() => console.log('Pressed')} 
            labelStyle={{fontSize:8, color:"white"}} 
            style={{borderRadius:15, borderColor:"white"}} >
              January 2020
            </Button>
          </View>
          <View style={styles.viewMonths}>
            <Button
            mode="outlined" 
            onPress={() => console.log('Pressed')} 
            labelStyle={{fontSize:8, color:"white"}} 
            style={{borderRadius:15, borderColor:"white"}} >
              January 2020
            </Button>
          </View>
          <View style={styles.viewMonths}>
            <Button
            mode="outlined" 
            onPress={() => console.log('Pressed')} 
            labelStyle={{fontSize:8, color:"white"}} 
            style={{borderRadius:15, borderColor:"white"}} >
              January 2020
            </Button>
          </View>
          <View style={styles.viewMonths}>
            <Button
            mode="outlined" 
            onPress={() => console.log('Pressed')} 
            labelStyle={{fontSize:8, color:"white"}} 
            style={{borderRadius:15, borderColor:"white"}} >
              January 2020
            </Button>
          </View>
          <View style={styles.viewMonths}>
            <Button
            mode="outlined" 
            onPress={() => console.log('Pressed')} 
            labelStyle={{fontSize:8, color:"white"}} 
            style={{borderRadius:15, borderColor:"white"}} >
              January 2020
            </Button>
          </View>
          </ScrollView>
        <ScrollView
        showsHorizontalScrollIndicator={false}
          style={styles.container}
          //pagingEnabled={true}
          horizontal= {true}
          decelerationRate={0}
          snapToInterval={screenWidth - 60}
          snapToAlignment={"center"}
          contentInset={{
            top: 0,
            left: 30,
            bottom: 0,
            right: 30,
          }}>
          <View style={styles.view}>
            <Headline color="black" style={{fontSize:18, fontWeight:"bold"}}>Total Expense</Headline>
            <Caption>April 2020</Caption>
            <View style={{flexDirection:"row", justifyContent:"space-between", }}>
              <Subheading style={{color:"#ff4800", fontWeight:"bold", fontSize:20}}>150000.00</Subheading>
              <Avatar.Icon size={34} icon="folder"  />
            </View>
          </View>
          <View style={styles.view2}>
            <Headline color="black" style={{fontSize:18, fontWeight:"bold"}}>Total Expense</Headline>
            <Caption>April 2020</Caption>
            <View style={{flexDirection:"row", justifyContent:"space-between", }}>
              <Subheading style={{color:"#ff4800", fontWeight:"bold", fontSize:20}}>150000.00</Subheading>
              <Avatar.Icon size={34} icon="folder"  />
            </View>
          </View>
          <View style={styles.view}>
            <Headline color="black" style={{fontSize:18, fontWeight:"bold"}}>Total Expense</Headline>
            <Caption>April 2020</Caption>
            <View style={{flexDirection:"row", justifyContent:"space-between", }}>
              <Subheading style={{color:"#ff4800", fontWeight:"bold", fontSize:20}}>150000.00</Subheading>
              <Avatar.Icon size={34} icon="folder"  />
            </View>
          </View>
          <View style={styles.view2}>
            <Headline color="black" style={{fontSize:18, fontWeight:"bold"}}>Total Expense</Headline>
            <Caption>April 2020</Caption>
            <View style={{flexDirection:"row", justifyContent:"space-between", }}>
              <Subheading style={{color:"#ff4800", fontWeight:"bold", fontSize:20}}>150000.00</Subheading>
              <Avatar.Icon size={34} icon="folder"  />
            </View>
          </View>
          <View style={styles.view}>
            <Headline color="black" style={{fontSize:18, fontWeight:"bold"}}>Total Expense</Headline>
            <Caption>April 2020</Caption>
            <View style={{flexDirection:"row", justifyContent:"space-between", }}>
              <Subheading style={{color:"#ff4800", fontWeight:"bold", fontSize:20}}>150000.00</Subheading>
              <Avatar.Icon size={34} icon="folder"  />
            </View>
          </View>
        </ScrollView>
        </View>
        </ScrollView>
      </>
  );
}


const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    width: screenWidth - 80,
    margin: 10,
    height: 140,
    borderRadius: 10,
    padding:10,
    //paddingHorizontal : 30
  },
  view2: {
    backgroundColor: 'white',
    width: screenWidth - 80,
    margin: 10,
    height: 140,
    borderRadius: 10,
    padding:10,
    //paddingHorizontal : 30
  },
  viewMonths:{
    backgroundColor: '#ff4800',
    width: screenWidth - 200,
    margin: 2,
    height: 40,
    borderRadius: 10,
    padding:10,
  }
});

export default Expense