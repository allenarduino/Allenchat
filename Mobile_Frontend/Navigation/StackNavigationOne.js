import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, NavigationContainer } from "react-navigation";
import LoginScreen from "../Screens/LoginScreen";
import SignupScreen from "../Screens/SignupScreen";

const RootStack = createStackNavigator(
  {
    SignupScreen: {
      screen: SignupScreen,
      navigationOptions: {
        header: null
      }
    },

    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    }
  },

  {
    initialRouteName: "SignupScreen"
  }
);

const MainStackNavigatorOne = createAppContainer(RootStack);

export default MainStackNavigatorOne;
