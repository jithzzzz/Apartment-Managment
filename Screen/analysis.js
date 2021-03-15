import React, { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, View, TextInput, TouchableOpacity, Dimensions, SafeAreaView, ScrollView } from 'react-native';

import { BottomNavigation, Text, icon, Appbar, Avatar, Title, Subheading, Button, Headline, Caption } from 'react-native-paper';

const screenWidth = Dimensions.get("window").width;
import AppStatusBar from "../components/AppStatusBar";

const THEME_COLOR = '#ff4800';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";



const Analysis = () =>{

   useEffect(() => {
  });

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
    return(
      <>
       <ScrollView style={{backgroundColor:"#ff4800", height:"100%"}}
        showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <Appbar.Header 
          style={{backgroundColor:"#ff4800", borderColor:"#ff4800", elevation:0, padding:10, }}>
            <Appbar.Content 
            title="Dashboard" 
            titleStyle={{justifyContent:"center", fontSize:20, fontWeight:"bold", alignItems:"center" }} />
          </Appbar.Header>
          <View style={{flexDirection:"row", justifyContent:"space-evenly", width:"100%", backgroundColor:"#ff4800", padding:15, }}>
            <Button
            mode="contained" 
            onPress={() => console.log('Pressed')} 
            labelStyle={{fontSize:8, color:"#ff4800"}} 
            color="white" 
            style={{borderRadius:15}} >
              Income
            </Button>
            <Button
            mode="contained" 
            onPress={() => console.log('Pressed')} 
            labelStyle={{fontSize:8, color:"#ff4800"}}
            color="white"
            style={{borderRadius:15}}>
            Expence
            </Button>
            <Button  
            mode="contained" 
            onPress={() => console.log('Pressed')} 
            labelStyle={{fontSize:8, color:"#ff4800"}} 
            color="white"
            style={{borderRadius:15}}>
            Monthly Report
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
              <Headline color="black" style={{fontSize:18, fontWeight:"bold"}}>Total Income</Headline>
              <Caption>April 2020</Caption>
              <View style={{flexDirection:"row", justifyContent:"space-between", }}>
                <Subheading style={{color:"#ff4800", fontWeight:"bold", fontSize:20}}>150000.00</Subheading>
                <Avatar.Icon size={34} icon="folder"  />
              </View>
            </View>
            <View style={styles.view2}>
              <Headline color="black" style={{fontSize:18, fontWeight:"bold"}}>Total Income</Headline>
              <Caption>April 2020</Caption>
              <View style={{flexDirection:"row", justifyContent:"space-between", }}>
                <Subheading style={{color:"#ff4800", fontWeight:"bold", fontSize:20}}>150000.00</Subheading>
                <Avatar.Icon size={34} icon="folder"  />
              </View>
            </View>
           <View style={styles.view}>
              <Headline color="black" style={{fontSize:18, fontWeight:"bold"}}>Total Income</Headline>
              <Caption>April 2020</Caption>
              <View style={{flexDirection:"row", justifyContent:"space-between", }}>
                <Subheading style={{color:"#ff4800", fontWeight:"bold", fontSize:20}}>150000.00</Subheading>
                <Avatar.Icon size={34} icon="folder"  />
              </View>
            </View>
           <View style={styles.view2}>
              <Headline color="black" style={{fontSize:18, fontWeight:"bold"}}>Total Income</Headline>
              <Caption>April 2020</Caption>
              <View style={{flexDirection:"row", justifyContent:"space-between", }}>
                <Subheading style={{color:"#ff4800", fontWeight:"bold", fontSize:20}}>150000.00</Subheading>
                <Avatar.Icon size={34} icon="folder"  />
              </View>
            </View>
            <View style={styles.view}>
              <Headline color="black" style={{fontSize:18, fontWeight:"bold"}}>Total Income</Headline>
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

export default Analysis