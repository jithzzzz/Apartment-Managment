import React, { useEffect } from 'react';
import { StyleSheet, ImageBackground, View, ScrollView } from 'react-native';
import { Appbar, Button, TextInput, Snackbar, Text } from 'react-native-paper';

import ProgressLoader from 'rn-progress-loader';



const THEME_COLOR = '#ff4800';

export default class RuleAdd extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      rules:"",
      dis:"",
      visible:false,
      isLoading: false,
      ruleValid:false,
      disValid:false,
      email:props.route.params.id,
      ap_id:props.route.params.ap,
      status:true
    };
  }

  
  BtnSave = () =>{
    this.setState({ isLoading: true });
    fetch('http://192.168.43.179:8000/Rulessave', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:JSON.stringify({
        rules:this.state.rules,
        dis:this.state.dis,
        aprt:this.state.ap_id,
        user:this.state.email
      })
    }).then((response) => response.json())
        .then((responseJson) => {
          console.log('responseobject:',responseJson)
          if(responseJson.Status == "OK"){
            console.log("OK")
            this.setState({visible:!this.state.visible})
            this.setState({ isLoading: false });
          }
        })
        .catch((error) => {
          console.error(error);
          this.setState({ isLoading: false });
        });
  }

  validation =() =>{
    let status = true
    if(this.state.rules == "" || this.state.rules == null){
      this.setState({ruleValid:true})
      status = false
    }else{
      this.setState({ruleValid:false})
    }
    if(this.state.dis  == "" || this.state.dis == null){
      this.setState({disValid:true})
      status = false
    }
    if(status == true){
      this.BtnSave()
    }
  }


  render(){
    return(
      <>
        <Appbar.Header style={{backgroundColor:"#ff4800", borderColor:"#ff4800",elevation:0}}>
          <Appbar.BackAction onPress={()=>{this.props.navigation.navigate("rules")}} />
          <Appbar.Content title="New Rule"  />
        </Appbar.Header>

        <ProgressLoader
          visible={this.state.isLoading}
          isModal={true} isHUD={true}
          hudColor={"#ff4800"}
          color={"#FFFFFF"} />
              


        <ScrollView style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>

          <View style={{width:"100%"}}>
            <TextInput
              style={{marginHorizontal:15, marginVertical:10,  backgroundColor:"white"}}
              label="Rule Title"
              mode='outlined'
              value={this.state.rules}
              onChangeText={(text) => {
                this.setState({rules: text,})
                this.setState({ruleValid:false})
              }}
            />
            {this.state.ruleValid == true ? <Text style={{color:"red", marginLeft:15}}>Field must not be empty</Text> : null}

            <TextInput
              style={{marginHorizontal:15, marginVertical:10,  backgroundColor:"white"}}
              label="Rule Discription"
              mode='outlined'
              value={this.state.dis}
              multiline={true}
              onChangeText={(text) => {
                this.setState({dis: text,})
                this.setState({disValid:false})
              }}
            />
            {this.state.disValid == true ? <Text style={{color:"red", marginLeft:15}}>Field must not be empty</Text> : null}

            <Button 
            style={{ margin:20, padding:5, borderRadius:20}}
            icon="content-save-all-outline" 
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
          New Apartment Rule Creacted !!!
        </Snackbar>

      </>
    );
  }
}


const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: 'white',
      marginHorizontal: 0,
      flex:1,
      paddingVertical:20
    },

});

