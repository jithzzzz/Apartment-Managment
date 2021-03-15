import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import Constants from 'expo-constants';


// or any pure javascript modules available in npm
import { Card, Avatar, Colors, Button, Chip, List, useTheme, Surface, Title ,
 Divider, Switch, Appbar, Portal, Modal } from 'react-native-paper';

 import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen(props) {
    console.log("&&&&&&&&&&&&&&&&&&&&&&")
    console.log(props.route.props.navigation)
    const [financeSwitchOn, setFinanceSwitchOn] = React.useState(true);
    const [member, setMember] = React.useState(true);
    const [safegard, setSafegard] = React.useState(true);
    const [sqrt, setSqrt] = React.useState(true);
    const [floor, setFloor] = React.useState(true);
    const [visible, setVisible] = React.useState(false);


    const onToggleSwitch = () => setFinanceSwitchOn(!financeSwitchOn);

    const onTogglemember = () => setMember(!member);

    const onTogglesafe = () => setSafegard(!safegard);

    const onTogglesqrt = () => setSqrt(!sqrt);

    const onTogglefloor = () => setFloor(!floor);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const fnlogout = () =>{
        console.log("oooooooo")
        storeData(null, null, null)
        
        
    }

    const storeData = async (value, a_name, name) => {
        try {
          console.log(value)
          console.log(a_name)
         

          await AsyncStorage.removeItem('@storage_Key_who');
          await AsyncStorage.removeItem('@storage_Key_part');
          await AsyncStorage.removeItem('@storage_Key_name');


          const values = await AsyncStorage.getItem('@storage_Key_who')

          if(values == null) {
              console.log("Log Out ....")
              props.route.props.navigation.navigate('Login')
          }
          

        } catch (e) {
          console.log(e)
        }
      }

    const containerStyle = {backgroundColor: 'white', padding: 20};

  return(
    <View style={{backgroundColor:"#ff4800", flex:1}}>
        <Appbar.Header 
        style={{backgroundColor:"#ff4800", borderColor:"#ff4800", elevation:0, padding:10, }}>
            <Appbar.Content 
            title="Settings" 
            titleStyle={{justifyContent:"center", fontSize:20, fontWeight:"bold", alignItems:"center" }} 
            />
        </Appbar.Header>
       
        <ScrollView style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        >
            <View style={{backgroundColor:"red"}}>

            <Portal style={{margin:20}}>
                <Modal visible={visible} onDismiss={hideModal} 
                contentContainerStyle={{margin:20, padding:30, backgroundColor:"white"}}>
                <Text style={{fontWeight:'bold', fontSize:16}}>Are you sure, You want to exit !!!.</Text>
                <Button icon="logout" mode="contained" onPress={fnlogout} style={{width:"50%", marginTop:10, marginLeft:"25%"}}>
                    Yes
                </Button>
                </Modal>
            </Portal>

           

                <View style={{backgroundColor:"#e8e7e3"}}>
                <List.Section>
                    <List.Subheader>Apartment settings</List.Subheader>
                    <List.Item
                    style={{backgroundColor:"white", padding:0}}
                    title="Finance" 
                    left={() => <List.Icon icon="finance" />} 
                    right={() => <Switch value={financeSwitchOn} onValueChange={onToggleSwitch}
                    style={{marginTop:18, marginLeft:-10}} />} 
                    />
                    <Divider/>
                    <List.Item
                    style={{backgroundColor:"white", padding:0}}
                    title="Allow Members"
                    left={() => <List.Icon color="#000" icon="emoticon-confused-outline" />}
                    right={() => <Switch value={member} onValueChange={onTogglemember}
                    style={{marginTop:18, marginLeft:-10}} />}

                    />
                    <Divider/>
                    <List.Item
                    style={{backgroundColor:"white", padding:0}}
                    title="Allow Safe Guard"
                    left={() => <List.Icon color="#000" icon="security" />}
                    right={() => <Switch value={safegard} onValueChange={onTogglesafe}
                    style={{marginTop:18, marginLeft:-10}} />} 
                    />
                </List.Section>
                </View>

                <View style={{backgroundColor:"#e8e7e3"}}>
                <List.Section>
                    <List.Subheader>Account settings</List.Subheader>
                    <List.Item
                    style={{backgroundColor:"white", padding:0}}
                    title="Phone Number" 
                    left={() => <List.Icon icon="cellphone-iphone" />} />
                    <Divider/>
                    <List.Item
                    style={{backgroundColor:"white", padding:0}}
                    title="Email"
                    left={() => <List.Icon color="#000" icon="email-newsletter" />}
                    />
                    <Divider/>
                    <List.Item
                    style={{backgroundColor:"white", padding:0}}
                    title="Sign out"
                    left={() => <List.Icon color="#000" icon="logout-variant" />}
                    onPress={showModal}
                    />
                </List.Section>
                </View>

                <View style={{backgroundColor:"#e8e7e3"}}>
                <List.Section>
                    <List.Subheader>Maintenance charge calculation</List.Subheader>
                    <List.Item
                    style={{backgroundColor:"white", padding:0}}
                    title="Square feet"
                    description="Item description"
                    left={() => <List.Icon icon="cellphone-iphone" />}
                    right={() => <Switch value={sqrt} onValueChange={onTogglesqrt}
                    style={{marginTop:18, marginLeft:-10}} />} 
                    />
                    <Divider/>
                    <List.Item
                    style={{backgroundColor:"white", padding:0}}
                    title="Floor"
                    description="Item description"
                    left={() => <List.Icon color="#000" icon="email-newsletter" />}
                    right={() => <Switch value={floor} onValueChange={onTogglefloor}
                    style={{marginTop:18, marginLeft:-10}} />} 
                    />
                </List.Section>
                </View>

                <View style={{backgroundColor:"#e8e7e3"}}>
                <List.Section>
                    <List.Subheader>Privacy settings</List.Subheader>
                    <List.Item
                    style={{backgroundColor:"white", padding:0}}
                    title="Help" 
                    left={() => <List.Icon icon="help-rhombus" />} />
                    <Divider/>
                
                    <List.Item
                    style={{backgroundColor:"white", padding:0}}
                    title="privacy-tip"
                    left={() => <List.Icon color="#000" icon="folder" />}
                    />
                    <Divider/>
                    <List.Item
                    style={{backgroundColor:"white", padding:0}}
                    title="Tearms of service"
                    left={() => <List.Icon color="#000" icon="headset" />}
                    />
                    <Divider/>
                    <List.Item
                    style={{backgroundColor:"white", padding:0}}
                    title="About us"
                    left={() => <List.Icon color="#000" icon="information-outline" />}
                    />

                </List.Section>
                </View>

            </View>
        </ScrollView>
    </View>
   
  );
}


const styles = StyleSheet.create({
  
})