import React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../Screens/Profile";
import EditProfile from "../Screens/EditProfile";
import Icon from "react-native-vector-icons/Ionicons";
import MyContext from "../Screens/NewPostScreen";

const Stack = createStackNavigator();

function ProfileStack({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile" headerMode="screen">
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            title: "Edit Profile"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ProfileStack;
