import React from 'react';
import {Platform, ScrollView, StyleSheet, TouchableWithoutFeedback,View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
// import RNPickerSelect, { defaultStyles } from './debug';
import { Text, TextInput, IconButton, Colors, Button } from 'react-native-paper';

const sports = [
  {
    label: '1, 2, ...',
    value: '101',
  },
  {
    label: 'Baseball',
    value: 'baseball',
  },
  {
    label: 'Hockey',
    value: 'hockey',
  },
];

export default class ApartmentDetails extends React.Component {
  constructor(props) {
    super(props);
    this.inputRefs = {
      firstTextInput: null,
      favSport0: null,
      favSport1: null,
      lastTextInput: null,
      favSport5: null,
    };

    this.state = {
      nofloor:"",
      flatperfloor:"",
      tsqrt:"",
      numbers: [
        {
          label: '1',
          value: 1,
          color: 'orange',
        },
        {
          label: '2',
          value: 2,
          color: 'green',
        },
      ],
      favSport0: undefined,
      favSport1: undefined,
      favSport2: undefined,
      favSport3: undefined,
      favSport4: 'baseball',
      previousFavSport5: undefined,
      favSport5: null,
      favNumber: undefined,
    };

    this.InputAccessoryView = this.InputAccessoryView.bind(this);
  }

  BtnSave = () =>{
    this.props.navigation.navigate("CTRAPRT3")
    //console.log(this.state.nofloor)
  }
  InputAccessoryView() {
    return (
      <View style={defaultStyles.modalViewMiddle}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState(
              {
                favSport5: this.state.previousFavSport5,
              },
              () => {
                this.inputRefs.favSport5.togglePicker(true);
              }
            );
          }}
          hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}>
          <View testID="needed_for_touchable">
            <Text
              style={[
                defaultStyles.done,
                { fontWeight: 'normal', color: 'red' },
              ]}>
              Cancel
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <Text>Name | Prefer</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            this.inputRefs.favSport5.togglePicker(true);
          }}
          hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}>
          <View testID="needed_for_touchable">
            <Text style={defaultStyles.done}>Done</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  render() {
    const placeholder = {
      label: 'Select a sport...',
      value: null,
      color: '#9EA0A4',
    };

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}>

          <TextInput
            style={{width:"100%", margin:10, backgroundColor:"white", height:60}}
            label="Total No.Floor"
            value={this.state.nofloor}
            onChangeText={(text) => {this.setState({
                nofloor: text,
              });}}
          />

          <TextInput
            style={{width:"100%", margin:10, backgroundColor:"white", height:60}}
            label="Flat Per Floor"
            value={this.state.flatperfloor}
            onChangeText={(text) => {this.setState({
                flatperfloor: text,
              });}}
          />

          <TextInput
            style={{width:"100%", margin:10, backgroundColor:"white", height:60}}
            label="Total Squar Feet"
            value={this.state.flatperfloor}
            onChangeText={(text) => {this.setState({
                tsqrt: text,
              });}}
          />

         

     

      

          
          <RNPickerSelect
            placeholder={placeholder}
            items={sports}
            onValueChange={value => {
              this.setState({
                favSport1: value,
              });
            }}
            style={pickerSelectStyles}
            value={this.state.favSport1}
            useNativeAndroidPickerStyle={false}
            ref={el => {
              this.inputRefs.favSport1 = el;
            }}
          />

         
        
          <View paddingVertical={5} />

          
         <Button
     style={{width:"100%", margin:10}}
     icon="camera" 
     mode="contained"
     loading={this.loading}
     onPress={this.BtnSave}
     >
     Good To Go
     </Button>
      

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  scrollContentContainer: {
    paddingTop: 40,
    paddingBottom: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 8,
    color: 'black',
    backgroundColor:"white",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
