import * as React from 'react';
import Constants from 'expo-constants';
// or any pure javascript modules available in npm
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {StyleSheet, View} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./Screen/Login";

import BasicRegister from "./Screen/Register_screen_1";
import CreateApartment from "./Screen/aprtmentcreation";
import ApartmentDetails from "./Screen/AprtCreate2";
import Whocreated from "./Screen/AprtCreate3";

import BottamNavigator from "./navigator/bottomnavigator";

import RulesView from "./Screen/RulesView";
import RuleAdd from "./Screen/RulesAdd";

import Member_list_Screen from "./Screen/Member_List_Screen";
import Memberadd from "./Screen/memberadd";

import Income from "./Screen/income";
import Dpiker from "./Screen/IncomeAdd";
import IncomeType from "./Screen/Incometype"

import Emergency from "./Screen/emergency";
import EmergencyAdd from "./Screen/addemerjency";
import Empcty from "./Screen/empcatagery";

import Expense from "./Screen/expense";
import ExpAdd from "./Screen/ExpenseAdd";
import ExpenseType from "./Screen/expensetype";

import Acconting from "./Screen/Accounting";

import Flatdetails from "./Screen/Flatdetails";
import FlatAdd from "./Screen/addnewflat";

import RequestView from "./Screen/rquestview";
import requeststatus from "./Screen/requeststatus";

const Stack = createStackNavigator();

export default function App() {
  const MyTheme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#ff4800',
    },
  };

  return (
    <PaperProvider theme={MyTheme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" theme={MyTheme} component={LoginScreen} />
          
          
          <Stack.Screen name="Main" theme={MyTheme} component={BottamNavigator} />

          
          <Stack.Screen name="BasicRregitser" theme={MyTheme} component={BasicRegister} />
          <Stack.Screen name="Register" theme={MyTheme} component={CreateApartment} />
          <Stack.Screen name="CTRAPRT2" theme={MyTheme} component={ApartmentDetails} />
          <Stack.Screen name="CTRAPRT3" theme={MyTheme} component={Whocreated} />

          
          <Stack.Screen name="MemberList" theme={MyTheme} component={Member_list_Screen} />
          <Stack.Screen name="addmember" theme={MyTheme} component={Memberadd} />
          

          <Stack.Screen name="rules" theme={MyTheme} component={RulesView} />
          <Stack.Screen name="rulesadd" theme={MyTheme} component={RuleAdd} />

          

          <Stack.Screen name="Inc" theme={MyTheme} component={Income} />
          <Stack.Screen name="Dpick" theme={MyTheme} component={Dpiker} />
          <Stack.Screen name="Intype" theme={MyTheme} component={IncomeType} />
          

          <Stack.Screen name="Emergency" theme={MyTheme} component={Emergency} />
          <Stack.Screen name="AddeEMC" theme={MyTheme} component={EmergencyAdd} />
          <Stack.Screen name="Empcty" theme={MyTheme} component={Empcty} />

           <Stack.Screen name="Exp" theme={MyTheme} component={Expense} />
           <Stack.Screen name="Expadd" theme={MyTheme} component={ExpAdd} />
           <Stack.Screen name="Exptype" theme={MyTheme} component={ExpenseType} />

           <Stack.Screen name="Acc" theme={MyTheme} component={Acconting} />

           <Stack.Screen name="Fdetails" theme={MyTheme} component={Flatdetails}/>
           <Stack.Screen name="FADD" theme={MyTheme} component={FlatAdd} />

           <Stack.Screen name="RQV" theme={MyTheme} component={RequestView} />
           <Stack.Screen name="RQS" theme={MyTheme} component={requeststatus} />


        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>

  );
}


{/*
export default function App() {
  return (
    <LoginScreen/>
  );
}
*/}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
