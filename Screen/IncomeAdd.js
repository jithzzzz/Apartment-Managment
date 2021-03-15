import React, {useState, useEffect} from 'react';
import {View,  Platform, StyleSheet, SafeAreaView, ScrollView, ImageBackground} from 'react-native';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import { Appbar, Snackbar, Button, TextInput, Text  } from 'react-native-paper';

import DatePicker from 'react-native-datepicker'

import ProgressLoader from 'rn-progress-loader';

import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_COLOR = '#ff4800';

export default function Dpiker(props){
  const [date, setDate] = useState(new Date(1598051730000));
  const [dummy, setDmmy] = useState("Date")
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [job, setJob] = useState(undefined)

  const[isdate, setIsdate] = useState(false)
  const[istitle, setIstitle] = useState(false)
  const[isamount, setIsamount] = useState(false)
  const[isinctype, setIsinctype] = useState(false)
  const[isdis, setIsdis] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState("")

  const [ap_id, setAPID] = useState(0)
  const [email, setEmail] = useState(null)

  const [dis, setDis] = useState("")
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")

  const [jobtypes, setJobtypes] = useState(props.route.params.d)


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

  const placeholder = {
      label: 'Income Type',
      value: null,
      color: '#9EA0A4',
  };


  console.log("#####")
  console.log(date)

  

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(new Date(currentDate));
    setDmmy(currentDate.toString())
  };

  const validation = () =>{
    let status = true
    console.log(status)
    if(date == null || date == ""){
      setIsdate(true)
      status = false
    }
    if(title == null || title == ""){
      setIstitle(true)
      status = false
    }
    if(amount == null || amount == ""){
      setIsamount(true)
      status = false
    }
    if( job== null || job == "" || job == undefined){
      setIsinctype(true)
      status = false
    }
    if(dis == null || dis == ""){
      setIsdis(true)
      status = false
    }

    if(status == true){
      savedata()
    }
  }


  const savedata = () =>{
    setIsLoading(true);
    fetch('http://192.168.43.179:8000/incomesave', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:JSON.stringify({
        incometype:job,
        e_date:date,
        aprt:ap_id,
        user:email,
        amount:amount,
        title:title,
        dis:dis

      })
    }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          console.log(responseJson.Status)
          if(responseJson.Status == "OK"){
            setIsLoading(false);
            setVisible(true)
            setMessage("New Income Record Added !!!")
          }else{
            setMessage(responseJson.Status)
            console.log(responseJson.Status)
            setIsLoading(false);
            setVisible(true)
          }
        })
        .catch((error) => {
          console.log('5555555')
          console.error(error);
          setIsLoading(false);
          setVisible(true)
        });
  }

  return (
    <>
        <Appbar.Header 
        style={{backgroundColor:"#ff4800", borderColor:"#ff4800",elevation:0}}>
          <Appbar.BackAction 
          onPress={()=>{props.navigation.navigate("Inc")}} />
          <Appbar.Content title="Add Income"  />
          <Appbar.Action 
          icon="plus-circle" 
          onPress={()=>{props.navigation.navigate("Intype")}} />
        </Appbar.Header>
        <ScrollView style={styles.scrollView}
        showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>

           <ProgressLoader
          visible={isLoading}
          isModal={true} isHUD={true}
          hudColor={"#ff4800"}
          color={"#FFFFFF"} />

          <View style={{flex:1, justifyContent:"center", backgroundColor:"white", padding:10, marginVertical:30}}>
              
      

            <DatePicker
        date={date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2021-01-01"
        maxDate="2021-12-29"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        style={{width:"100%",}}
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 15,
            marginHorizontal:15,
          },
          dateInput: {
            margin: 15,
            borderWidth: 1, 
            borderColor: 'grey',
            height:60
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {setDate(date); setIsdate(false)}}
      />
      {isdate == true ? <Text style={{color:'red', marginLeft:17}}>Invalid date</Text> : null}


            <TextInput
              style={{ marginHorizontal:15, marginTop:30, marginBottom:10, backgroundColor:"white" }}
              label='Title'
              mode='outlined'
              value={title}
              onChangeText={text =>{setTitle(text); setIstitle(false)}}
            />
            {istitle == true ? <Text style={{color:'red', marginLeft:17}}>Title should not be empty</Text> : null}


            <TextInput
              style={{ marginHorizontal:15, marginVertical:10, backgroundColor:"white" }}
              label='Amount'
              mode='outlined'
              keyboardType={'phone-pad'}
              onChangeText={text =>{setAmount(text); setIsamount(false)}}
              value={amount}
            />
            {isamount == true ? <Text style={{color:'red', marginLeft:17}}>Invalid Amount</Text> : null}

            
            
            <RNPickerSelect
            placeholder={placeholder}
            items={jobtypes}
            onValueChange={value => {setJob({job: value,}); setIsinctype(false)}}
            style={pickerSelectStyles}
            value={job}
            useNativeAndroidPickerStyle={false}
            />
            {isinctype == true ? <Text style={{color:'red', marginLeft:17}}>Income Type should not be empty</Text> : null}

            

            <TextInput
              style={{ marginHorizontal:15, marginVertical:10, backgroundColor:"white" }}
              label='Disciption'
              mode='outlined'
              multiline={true}
              value={dis}
              onChangeText={text =>{setDis(text); setIsdis(false)}}
            />
             {isdis == true ? <Text style={{color:'red', marginLeft:17}}>Disciption should not be empty</Text> : null}


            

              <Button
              style={{margin:20, padding:5, borderRadius:20 }}
              icon="content-save-all-outline" 
              mode="contained"
              onPress={validation}
              >
              Save
              </Button>
          </View>

        </ScrollView>
        <Snackbar
            visible={visible}
            onDismiss={() =>{setVisible(false)}}
            action={{
              label: 'Dismiss',
              onPress: () => {
                setVisible(false)
              },
            }}>
            {message}
        </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: 'white',
      marginHorizontal: 0,
      flex:1,
      
    },
});


const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    marginHorizontal:15, 
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
