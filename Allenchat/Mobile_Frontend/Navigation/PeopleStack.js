import React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatSection from "../Screens/ChatSection";
import SingleProfile from "../Screens/SingleProfile";
import People from "../Screens/People";
import DirectMessage from "../Screens/DirectMessage";
import Icon from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();

function PeopleStack({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="People" headerMode="screen">
        <Stack.Screen
          name="People"
          component={People}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ChatSection"
          component={ChatSection}
          options={{
            title: "Chats"
          }}
        />

        <Stack.Screen
          name="SingleProfile"
          component={SingleProfile}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="DirectMessage"
          component={DirectMessage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default PeopleStack;
