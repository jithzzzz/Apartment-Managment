import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Button, TextInput, Snackbar, Text  } from 'react-native-paper';

import ProgressLoader from 'rn-progress-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';



const THEME_COLOR = '#ff4800';

export default class ExpenseType extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      expencetype:"",
      dis:"",
      isexpencetype:false,
      isdis:false,
      visible:false,
      isLoading: false,
      email:"",
      ap_id:0
    };

  }

  getData = async () => {
    try {
        const value = await AsyncStorage.getItem('@storage_Key_who')
        const v2 = await AsyncStorage.getItem('@storage_Key_part')
        if(value !== null) {
          this.setState({ap_id:v2})
          this.setState({email:value})
        }else{
            navigation.navigate("Login")
        }
    } catch(e) {
        return(404)
    }
  }
  componentDidMount(){
    this.getData();
  }

  validation= ()=>{
    let status = true
    console.log(status)
    if(this.state.expencetype == null || this.state.expencetype == ""){
      this.setState({isexpencetype:true})
      status = false
    }

    if(this.state.dis == null || this.state.dis == ""){
      this.setState({isdis:true})
      status = false
    }
    if(status == true){
      this.BtnSave()
    }
  }

  BtnSave = () =>{
    console.log("Saving Expence type")
    console.log(this.state.dis)
    console.log(this.state.expencetype)
    console.log(this.state.ap_id)
    console.log(this.state.email)

    this.setState({ isLoading: true });
    fetch('http://192.168.43.179:8000/expensetype', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:JSON.stringify({
        expencetype:this.state.expencetype,
        dis:this.state.dis,
        aprt:this.state.ap_id,
        user:this.state.email
      })
    }).then((response) => response.json())
        .then((responseJson) => {
          console.log('responseobject:',responseJson)
          console.log(responseJson.Status)
          if(responseJson.Status == "OK"){
            console.log("OK")
            this.setState({visible:!this.state.visible})
            this.setState({ isLoading: false });
          }
        })
        .catch((error) => {
          console.log("++++ Error ++++")
          console.error(error);
          this.setState({ isLoading: false });
        });
  }
  render() {
    
    return(
      <>
       <Appbar.Header style={{backgroundColor:"#ff4800", borderColor:"#ff4800",elevation:0}}>
        <Appbar.BackAction onPress={()=>{this.props.navigation.navigate("Expadd")}} />
        <Appbar.Content title="Expense Type"  />
      </Appbar.Header>
      <ScrollView style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>

          <ProgressLoader
          visible={this.state.isLoading}
          isModal={true} isHUD={true}
          hudColor={"#ff4800"}
          color={"#FFFFFF"} />
              
           
             
          <View style={{width:"100%"}}>
            <TextInput
              style={{ marginHorizontal:15, marginVertical:10, backgroundColor:"white" }}
              mode='outlined'
              label="Expense Type"
              value={this.state.expencetype}
              onChangeText={(text) => {this.setState({
                  expencetype: text,
                  isexpencetype:false,
                });}}
            />
            {this.state.isexpencetype == true ? <Text style={{color:'red', marginLeft:17}}>Expense Type should not be empty</Text> : null}


           
           
            <TextInput
              style={{ marginHorizontal:15, marginVertical:10, backgroundColor:"white", }}
              label='Discription'
              mode='outlined'
              value={this.state.dis}
              multiline={true}
              onChangeText={(text) => {this.setState({
                  dis: text,
                  isdis:false,
                });}}
            />
             {this.state.isdis == true ? <Text style={{color:'red', marginLeft:17}}>Discription should not be empty</Text> : null}


               
            <Button 
            style={{margin:15, borderRadius:20, padding:5}}
            icon="content-save" 
            mode="contained"
            onPress={this.validation}
            >
            Save
            </Button>

              
          </View>
           
        </ScrollView>
        <Snackbar
          visible={this.state.visible}
          onDismiss={() =>{this.setState({visible:!this.state.visible})}}
          action={{
            label: 'Dismiss',
            onPress: () => {
              this.setState({visible:!this.state.visible})
            },
          }}>
          New Expense Categorry Creacted !!!
        </Snackbar>
      </>
    );
  }
}


const styles = StyleSheet.create({
    
  scrollView: {
  backgroundColor: 'white',
  marginHorizontal: 0,
  height:"100%",
  flex:1,
  paddingVertical:15
  },
  container: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
  },
  container890: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

