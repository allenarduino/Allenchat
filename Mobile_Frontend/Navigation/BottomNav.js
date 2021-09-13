import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { FontAwesomeIcon } from "react-native-vector-icons/FontAwesome5";
import {
  NavigationContainer,
  useNavigationState
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PeopleStack from "./PeopleStack";
import ChatStack from "./ChatStack";
import ProfileStack from "./ProfileStack";

const Tab = createBottomTabNavigator();

function BottomTab() {
  const getTabBarVisibility = route => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : "";

    if (routeName === "DirectMessage") {
      return false;
    }

    return true;
  };
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          style: {
            zIndex: 1,
            backgroundColor: "rgb(39, 12, 75)",
            alignItems: "center",
            textAlign: "center",
            //  borderTopLeftRadius: 50,
            // borderTopRightRadius: 50,
            height: 55
          }
        }}
        mode="modal"
      >
        <Tab.Screen
          name="ChatSection"
          component={ChatStack}
          options={({ route }) => ({
            tabBarVisible: getTabBarVisibility(route),
            tabBarLabel: "",
            inactiveColor: "black",
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon name="chatbox-outline" size={26} color="#fff" />
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 12
                  }}
                >
                  Chats
                </Text>
              </View>
            )
          })}
        />

        <Tab.Screen
          name="PeopleStack"
          component={PeopleStack}
          options={({ route }) => ({
            tabBarLabel: "Users",
            activeColor: "rgb(179, 7, 127)",
            tabBarVisible: getTabBarVisibility(route),
            inactiveColor: "black",
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon name="people-outline" size={26} color="#fff" />
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 12
                  }}
                >
                  Users
                </Text>
              </View>
            )
          })}
        />

        <Tab.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{
            tabBarLabel: "Profile",
            activeColor: "rgb(179, 7, 127)",
            inactiveColor: "black",

            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon name="person-outline" size={26} color="#fff" />
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 12
                  }}
                >
                  Profile
                </Text>
              </View>
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default BottomTab;
