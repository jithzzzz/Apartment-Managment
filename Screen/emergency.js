import React, { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';

import { Text, icon, Appbar, Avatar, Title, Subheading, Card, Paragraph, Button  } from 'react-native-paper';
import ProgressLoader from 'rn-progress-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_COLOR = '#ff4800';

const Emergency = (props) =>{
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

  const _goBack = () =>{ props.navigation.navigate("Main") };
  const _handleMore = () =>{props.navigation.navigate("AddeEMC")};

  const ft = ()=>{
    setIsLoading(true);
    fetch('http://192.168.43.179:8000/loadjobtype', {
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
            props.navigation.navigate("AddeEMC", {d:responseJson.data})
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error)
        });
        
  }
    
    return(
      <>
         <Appbar.Header style={{backgroundColor:"#ff4800", borderColor:"#ff4800",elevation:0}}>
              <Appbar.BackAction onPress={_goBack} />
              <Appbar.Content title="Emergency Contact"  />
              <Appbar.Action icon="plus-circle" onPress={ft} />
            </Appbar.Header>

            <ProgressLoader
          visible={isLoading}
          isModal={true} isHUD={true}
          hudColor={"#ff4800"}
          color={"#FFFFFF"} />
          
          <ScrollView style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>

              <Card style={styles.sd}>
                  <Card.Content>
                      <View style={{flexDirection:"row", width:"100%", justifyContent:"flex-start"}}>
                      <View style={{padding:10, backgroundColor:"yellow", borderRadius:10}}>
                        <Text style={{fontWeight:"bold", fontSize:30}}>JE</Text>
                      </View>
                      <View style={{padding:10}}>
                        <Text style={{fontWeight:"bold"}}>Jitheesh Emmanuel</Text>
                        <Text>Plumber</Text>
                      </View>
                      </View>
                  </Card.Content>
                  <Card.Actions style={{marginLeft:10}}>
                    <Button icon="file-edit" mode="contained" style={{backgroundColor:"#ff4800", borderRadius:15}} 
                    onPress={() => console.log('Pressed')}>
                      Edit
                    </Button>
                    <Button icon="delete-alert" mode="contained" 
                    style={{marginLeft:10, backgroundColor:"#ff4800", borderRadius:15}} 
                    onPress={() => console.log('Pressed')}>
                      DELETE
                    </Button>
                  </Card.Actions>
              </Card>
           
          </ScrollView>
      </>
    );
    
}


const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: 'white',
      paddingHorizontal:15,
      flex:1,
    },
    sd:{
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      margin:10
    }
});
  

export default Emergency