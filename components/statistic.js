import React, { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, View, TextInput, TouchableOpacity, Dimensions, SafeAreaView, ScrollView } from 'react-native';

import { BottomNavigation, Text, icon, Appbar, Avatar, Title, Subheading, Button, Headline, Caption } from 'react-native-paper';

const screenWidth = Dimensions.get("window").width;


export default function SatisticCards(props) {
  return (
    <View style={{width:"100%", marginTop:10}}>
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
              <Headline 
              color="black" 
              style={{fontSize:18, fontWeight:"bold"}}>
              Income
              </Headline>
              <Caption>{props.param.mydate}</Caption>
              <View style={{flexDirection:"row", justifyContent:"space-between", }}>
                <Subheading style={{color:"#ff4800", fontWeight:"bold", fontSize:20}}>{props.param.inc}</Subheading>
                <Avatar.Icon size={34} icon="chart-timeline-variant"  />
              </View>
            </View>
            <View style={styles.view2}>
              <Headline 
              color="black" 
              style={{fontSize:18, fontWeight:"bold"}}>
              Expense
              </Headline>
              <Caption>{props.param.mydate}</Caption>
              <View style={{flexDirection:"row", justifyContent:"space-between", }}>
                <Subheading style={{color:"#ff4800", fontWeight:"bold", fontSize:20}}>{props.param.exp}</Subheading>
                <Avatar.Icon size={34} icon="chart-sankey"  />
              </View>
            </View>
            <View style={styles.view}>
              <Headline color="black" style={{fontSize:18, fontWeight:"bold"}}>Maintenance Charges</Headline>
              <Caption>{props.param.mydate}</Caption>
              <View style={{flexDirection:"row", justifyContent:"space-between", }}>
                <Subheading style={{color:"#ff4800", fontWeight:"bold", fontSize:20}}>150000.00</Subheading>
                <Avatar.Icon size={34} icon="chart-donut-variant"  />
              </View>
            </View>
           <View style={styles.view2}>
              <Headline color="black" style={{fontSize:18, fontWeight:"bold"}}>Total Income</Headline>
              <Caption>April 2020</Caption>
              <View style={{flexDirection:"row", justifyContent:"space-between", }}>
                <Subheading style={{color:"#ff4800", fontWeight:"bold", fontSize:20}}>150000.00</Subheading>
                <Avatar.Icon size={34} icon="chart-gantt"  />
              </View>
            </View>
            <View style={styles.view}>
              <Headline color="black" style={{fontSize:18, fontWeight:"bold"}}>Total Income</Headline>
              <Caption>April 2020</Caption>
              <View style={{flexDirection:"row", justifyContent:"space-between", }}>
                <Subheading style={{color:"#ff4800", fontWeight:"bold", fontSize:20}}>150000.00</Subheading>
                <Avatar.Icon size={34} icon="chart-areaspline"  />
              </View>
            </View>
          </ScrollView>
    </View>

    
    
  );
}

const styles = StyleSheet.create({
 view: {
    backgroundColor: 'white',
    width: screenWidth - 130,
    margin: 10,
    height: 140,
    borderRadius: 10,
    padding:20,
    //paddingHorizontal : 30
  },
  view2: {
    backgroundColor: 'white',
    width: screenWidth - 130,
    margin: 10,
    height: 140,
    borderRadius: 10,
    padding:20,
    //paddingHorizontal : 30
  },
});