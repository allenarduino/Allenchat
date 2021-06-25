import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import {
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Icon from "react-native-vector-icons/Ionicons";
import ProfileStack from "./ProfileStack";
import PeopleStack from "./PeopleStack";
import People from "../Screens/People";
import Profile from "../Screens/Profile";

const BottomTab = createMaterialBottomTabNavigator({
  PeopleStack: {
    screen: PeopleStack,
    navigationOptions: {
      tabBarLabel: "People",
      activeColor: "rgb(95, 32, 155)",
      inactiveColor: "black",
      barStyle: { backgroundColor: "#fff" },
      tabBarIcon: ({ tintColor }) => (
        <Icon name="people-outline" size={25} color={tintColor} />
      )
    }
  },

  ProfileStack: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: "Profile",
      activeColor: "rgb(95, 32, 155)",
      inactiveColor: "black",
      barStyle: { backgroundColor: "#fff" },
      tabBarIcon: ({ tintColor }) => (
        <Icon name="person-outline" size={25} color={tintColor} />
      )
    }
  }
});

export default createAppContainer(BottomTab);

/*import React from 'react';
import { StyleSheet, Text, View,Dimensions,AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Profile from '../Screens/Profile';
import Home from '../Screens/Home';
import Login from '../Screens/Login';
import { FontAwesome } from "react-native-vector-icons";


import { NavigationContainer} from '@react-navigation/native';


import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab=createBottomTabNavigator();

function BottomTab(){
    return(
        
   <Tab.Navigator
  tabBarOptions={{
      activeTintColor:"rgb(179, 7, 127)",
      
  }}
  
   >
<Tab.Screen
name="Home"
component={Home}
options={{
    tabBarLabel:"Home",
    activeColor:"rgb(179, 7, 127)",
    inactiveColor:"black", 
    tabBarIcon:({color})=>(
        <Icon name="ios-home"  color={color} size={26} />
    )
    
}}
/>


<Tab.Screen
name="Profile"
component={Profile}
options={{
    tabBarLabel:"Profile",
    activeColor:"rgb(179, 7, 127)",
    inactiveColor:"black",

    tabBarIcon:({color})=>(
        <Icon name="ios-person"  color={color} size={26} />
    )
}}
/>

</Tab.Navigator>

    )
}



  


export default BottomTab;

*/
