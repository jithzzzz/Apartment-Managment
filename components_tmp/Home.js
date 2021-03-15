import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const HomeSreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <Button
        title="Go to profile"
        onPress={() => navigation.navigate("Profile", {
          itemId: 86,
          otherParam: 'anything you want here',
        })
      }
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default HomeSreen;