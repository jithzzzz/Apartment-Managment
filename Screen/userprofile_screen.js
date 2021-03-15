import * as React from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import Constants from 'expo-constants';


// or any pure javascript modules available in npm
import { Card, Avatar, Colors, Button, Chip, List, useTheme, Surface, Headline, Appbar } from 'react-native-paper';

export default function UserprofileScreen() {
  const {
    colors: { background },
  } = useTheme();



  const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    price:3000
  },
  {
   
    title: 'Second Item',
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    price:3056
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    price:8000
  },
];


const Item = ({ title, price }) => (
  <Surface style={{elevation: 12, backgroundColor:"white", margin:10}}>
   <List.Section>
        <List.Item
          left={() => (
            <Image
              source={require('../assets/snack-icon.png')}
              style={styles.image}
            />
          )}
          right={props => <List.Icon {...props} icon="star-outline" />}
          title={title}
          description={({
            ellipsizeMode,
            color: descriptionColor,
            fontSize,
          }) => (
            <View style={[styles.container, styles.column]}>
              <Text
                numberOfLines={2}
                ellipsizeMode={ellipsizeMode}
                style={{ color: descriptionColor, fontSize }}
              >
                React Native Paper is a high-quality, standard-compliant
                Material Design library that has you covered in all major
                use-cases.
              </Text>
              <View style={[styles.container, styles.row, { paddingTop: 8 }]}>
                <Chip icon="file-pdf" onPress={() => {}}>
                  {price}
                </Chip>
              </View>
            </View>
          )}
        />
      </List.Section>
      </Surface>
);

const renderItem = ({ item }) => (
    <Item title={item.title} price={item.price} />
);
  return (
    <>
        <Appbar.Header 
        style={{backgroundColor:"#ff4800", borderColor:"#ff4800", elevation:0, padding:10, }}>
            <Appbar.Content 
            title="Profile" 
            titleStyle={{justifyContent:"center", fontSize:20, fontWeight:"bold", alignItems:"center" }} 
            />
            <Appbar.Action 
            icon="plus-circle" 
            onPress={()=>{props.navigation.navigate("rulesadd", {ap:props.route.params.ap, id:props.route.params.id})}} 
            />
        </Appbar.Header>
       

        <View style={{justifyContent:'center', backgroundColor:"#ff4800", padding:10, height:200}}>
            <View style={styles.boxWithShadow}>
                <Avatar.Text
                    style=
                    {[styles.avatar, { backgroundColor: Colors.yellow500, 
                    justifyContent:"center" }]}
                    label="XD"
                    color={Colors.black}
                />
                <Text style={{fontWeight:"bold", fontSize:16, margin:5}}>Jitheesh Emmanuel</Text>
                <Text>
                    <Chip mode="contained" selected onPress={() => {}} style={{padding:0, backgroundColor:"#ff4800"}}
                    textStyle={{color:"white"}}
                    selectedColor="white">
                    Flat No. 405
                    </Chip>
                </Text>
                <Text></Text>
        <View style={{flexDirection:"row", justifyContent:"space-evenly", width:"100%", margin:10}}>
          <Button
            mode="contained"
            icon="camera"
            onPress={() => {}}
            style={{padding:0,}}
          >
          Call
          </Button>
          <Button
            mode="contained"
            icon="camera"
            onPress={() => {}}
             style={{padding:0, }}
          >
          Message
          </Button>
        </View>
      </View>
    </View>
    <Headline style={{marginTop:100, marginLeft:10, fontSize:16, fontWeight:"bold"}}>Recent Activities</Headline>
    <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={{marginTop:0}}
      />
    </>
  );
}

const styles = StyleSheet.create({
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 1,  
    elevation: 10,

    backgroundColor:"white", 
    padding:10, 
    alignItems:"center", 
    elevation:10, 
    borderRadius:15, 
    marginTop:100
},
 image: {
    height: 40,
    width: 40,
    margin: 8,
  },
   row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
});
