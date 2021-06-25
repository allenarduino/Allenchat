import React from "react";

import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../App";
import jwt_decode from "jwt-decode";
import { Header } from "react-native-elements";
import uuid from "uuid";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

let url = "http://10.74.15.133:80/Backend";

export const MessageContext = React.createContext();

const DirectMessage = ({ route, navigation }) => {
  const { state, dispatch } = React.useContext(AuthContext);

  const scroll = React.useRef();
  const myinput = React.useRef();

  const initialState = {
    messages: []
  };

  const ReducerFunction = (prevState, action) => {
    switch (action.type) {
      case "ADD_MESSAGE":
        return {
          ...prevState,
          messages: [...prevState.messages, action.payload]
        };
      case "FETCH_MESSAGES":
        return {
          ...prevState,
          messages: action.payload
        };
      default:
        return prevState;
    }
  };

  const [messagesState, setMessages] = React.useReducer(
    ReducerFunction,
    initialState
  );

  const token = state.token;
  const decoded = jwt_decode(token);
  const user_id = decoded;

  const [message, setMessage] = React.useState("");
  const [sent, updateSent] = React.useState(false);

  const sendMessage = async () => {
    const sender_id = user_id;
    const receipient_id = route.params.user_id;

    const offline_data = {
      sender_id: sender_id,
      receipient_id: route.params.user_id,
      message: message
    };

    if (message == "") {
      return;
    } else {
      myinput.current.clear();
      setMessages({ type: "ADD_MESSAGE", payload: offline_data });
      const formdata = new FormData();
      formdata.append("message", message);
      formdata.append("receipient_id", receipient_id);
      fetch(`${url}/send_message.php`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${state.token}`
        },
        body: formdata
      })
        .then(res => res.json())
        .then(data => {
          updateSent(true);
        })
        .catch(err => console.log(err));
    }
  };

  const fetch_messages = () => {
    fetch(`${url}/fetch_messages.php/?user_id=${route.params.user_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${state.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        updateSent(true);
        setMessages({ type: "FETCH_MESSAGES", payload: data });
      })
      .catch(err => console.log(err));
  };

  React.useEffect(() => {
    fetch_messages();
  }, []);

  return (
    <MessageContext.Provider value={{ messagesState, setMessages }}>
      <View style={{ flex: 1 }}>
        <Header
          placement="left"
          leftComponent={
            <Text onPress={() => navigation.goBack()} style={{ marginTop: 10 }}>
              <Icon name="arrow-back" size={27} />
            </Text>
          }
          centerComponent={
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{
                  uri: `${url}/code_reservoir/${route.params.user_img}`
                }}
                style={styles.userAvatar}
              />
              <Text
                style={{
                  marginLeft: 5,
                  marginTop: 10,
                  fontWeight: "bold",
                  fontSize: 18
                }}
              >
                {route.params.full_name}
              </Text>
            </View>
          }
          containerStyle={{
            backgroundColor: "#fff",
            height: 100,
            flexDirection: "row",
            justifyContent: "center",
            display: "flex"
          }}
        />

        <KeyboardAvoidingView style={{ flex: 1 }}>
          <ScrollView
            ref={scroll}
            onContentSizeChange={() =>
              scroll.current.scrollToEnd({ animated: true })
            }
          >
            <View style={{ marginTop: 100, marginBottom: 70 }}>
              {messagesState.messages.map(m => (
                <View>
                  {m.sender_id == user_id ? (
                    <View style={styles.chatBubble1}>
                      <Text style={{ color: "#fff" }}>{m.message}</Text>
                      {sent ? (
                        <Icon
                          name="checkmark"
                          size={17}
                          color="#fff"
                          style={{ alignSelf: "flex-end", marginRight: -10 }}
                        />
                      ) : null}
                    </View>
                  ) : (
                    <View style={styles.chatBubble2}>
                      <Text style={{ color: "#333" }}>{m.message}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Type Message"
                multiline
                style={styles.inputField}
                keyboardAppearance="dark"
                keyboardType="default"
                onChangeText={message => setMessage(message)}
                value={state.password}
                ref={myinput}
              />
              <Icon name="image" size={25} color="rgb(95, 32, 155)" />
              <Icon
                name="camera"
                size={25}
                style={{ marginLeft: 10 }}
                color="rgb(95, 32, 155)"
              />
            </View>
            <Icon
              name="send"
              size={30}
              style={{ marginLeft: 10 }}
              color="rgb(95, 32, 155)"
              onPress={() => sendMessage()}
            />
          </View>

          <View style={{ marginTop: 10 }}></View>
        </KeyboardAvoidingView>
      </View>
    </MessageContext.Provider>
  );
};

export default DirectMessage;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    borderColor: "#fff",
    backgroundColor: "#fff",
    borderWidth: 2,
    marginTop: -10,
    borderRadius: 30,
    width: "83%"
  },

  inputField: {
    width: "78%",
    borderColor: "#fff",
    backgroundColor: "#fff",
    borderWidth: 2,
    paddingLeft: 10
  },
  chatBubble1: {
    padding: 10,
    // marginLeft:'60%',
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    marginRight: "4%",
    maxWidth: "80%",
    alignSelf: "flex-end",
    borderRadius: 20,
    backgroundColor: "rgb(95, 32, 155)",
    color: "#fff"
  },

  chatBubble2: {
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    maxWidth: "80%",
    marginLeft: "4%",
    alignSelf: "flex-start",
    borderRadius: 20,
    backgroundColor: "#fff",
    color: "#fff"
  },

  userAvatar: {
    height: 50,
    width: 50,
    borderRadius: 50
  }
});
