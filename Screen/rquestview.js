import React, { useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, Dimensions, View, FlatList } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Appbar, Card, Button, Paragraph, Title, Avatar, Text, TextInput } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import ProgressLoader from 'rn-progress-loader'
import { useState } from 'react/cjs/react.development';
const THEME_COLOR = '#ff4800';




export default function RequestView(props) {
  console.log(props)

  const refRBSheet = useRef();

  const _goBack = () =>{ props.navigation.navigate("Main") };

  const _handleMore = () =>{props.navigation.navigate("RQS")};

  const LeftContent = props => <Avatar.Icon {...props} icon="account-tie`" />

  const [status, setStatus] = useState(undefined)
  const [isstatus, setIsStatus] = useState(false)
  const [data, setData] = useState([
    {
    id:'1',
    date:'23/9/2021',
    title:"Cleaning",
    dis:"General pattern is to pass a uniquely identifiable id (key, index, etc...) to your delete handler and filter your data on values that don't equal that key. This returns a new array without that entry to store in state"
  },
  {
    id:'2',
    date:'23/9/1878',
    title:"Plumbing",
    dis:"General pattern is to pass a uniquely identifiable id (key, index, etc...) to your delete handler and filter your data on values that don't equal that key. This returns a new array without that entry to store in state"
  },
  ])

  const placeholder = {
    label: 'Income Type',
    value: null,
    color: '#9EA0A4',
  };

  const statustypes = [
    {
      label:'Assigned',
      value:'Assigned'
    },
    {
      label:'Work In Progress',
      value:'Work In Progress'
    },
    {
      label:'Completed',
      value:'Completed'
    },
  ]


  const deleteItemById = (id) => {
    console.log("==== Delete Options ====")
    console.log(id)
    const filteredData = data.filter(item => item.id != id);
    console.log(filteredData)
    setData(filteredData);
  }



  const Item = ({ title, date, dis, id }) => (
    <Card>
      <Card.Title title={ title } subtitle={ date } left={LeftContent} />
      <Card.Content>
        <Paragraph>
          {dis}
        </Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button 
        mode="contained" 
        style={{margin:10, borderRadius:20}}
        onPress={() =>{deleteItemById(id)}}>
          View
        </Button>
        <Button
        mode="contained" 
        style={{margin:10, borderRadius:20}}
        onPress={() => refRBSheet.current.open()}>
          Update Status
        </Button>
      </Card.Actions>
    </Card>
  )

  const renderItem = ({ item }) => (
    <Item title={item.title} date={item.date} dis={item.dis} id={item.id} />

  );
  
  return(
    <>
      <Appbar.Header 
      style={{backgroundColor:"#ff4800", borderColor:"#ff4800", elevation:0}}>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content 
          title="Requsts" subtitle="" />
        <Appbar.Action icon="plus-circle" onPress={_handleMore} />
      </Appbar.Header>
      <ScrollView style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={{marginTop:0}}
        />


     

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        
        customStyles={{
          container:{
            backgroundColor:'white',
            shadowColor: "#000", 
            shadowOpacity: 0.25, 
            shadowRadius: 3.84, 
            elevation: 5,
            height:300,
          },
          wrapper: {
            backgroundColor: "transparent",
            
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
        
      >
        <View style={{padding:10}}>
          <RNPickerSelect
            placeholder={placeholder}
            items={statustypes}
            onValueChange={value => {setStatus(value); setIsStatus(false)}}
            style={pickerSelectStyles}
            value={status}
            useNativeAndroidPickerStyle={false}
          />
          
          <TextInput
            
            label='Discribe your actions'
            mode='outlined'
            multiline={true}
            style={{height:100, backgroundColor:"white"}}

          />
          <Button
          style={{padding:5, borderRadius:20, marginTop:10 }}
          icon="update" 
          mode="contained"
          
          >
          Update
          </Button>
        </View>
      </RBSheet>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({

  scrollView: {
    backgroundColor: 'white',
  },
});


const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    marginVertical:10,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'grey',
    color: 'black',
    backgroundColor:"white",
  },
});
