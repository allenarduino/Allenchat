import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  TextInput
} from "react-native";
import BottomTab from "../Navigation/BottomNav";
import AsyncStorage from "@react-native-community/async-storage";
import SwitchNav from "../Navigation/SwitchNavOne";
import { AuthContext } from "../App";
import { AppStyles } from "../AppStyles";

//I'm using this for email validation
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

let url = "http://YOUR_IP:80/Backend";

const LoginScreen = ({ navigation }) => {
  const initialState = {
    email: "",
    password: "",
    email_is_valid: true,
    error: "", //Error from server
    emailerr: "",
    passworderr: ""
  };

  const [state, setState] = React.useState(initialState);
  const { dispatch } = React.useContext(AuthContext);
  const [loading, controlLoading] = React.useState(false);

  const emailInputchange = val => {
    if (validEmailRegex.test(val)) {
      setState(prevState => ({
        ...prevState,
        email_is_valid: true
      }));
    } else {
      setState(prevState => ({
        ...prevState,
        email_is_valid: false
      }));
    }
  };

  const passwordInputchange = val => {
    if (val.trim().length >= 6) {
      setState(prevState => ({
        ...prevState,
        password_is_valid: true
      }));
    } else {
      setState(prevState => ({
        ...prevState,
        password_is_valid: false
      }));
    }
  };

  const login = () => {
    const data = new FormData();
    data.append("email", state.email);
    data.append("password", state.password);

    if (
      state.email_is_valid == true &&
      !state.email.trim().length == 0 &&
      !state.password.trim().length == 0
    ) {
      controlLoading(true);

      fetch(`${url}/user_login.php`, {
        method: "POST",
        body: data
      })
        .then(res => res.json())
        .then(data => {
          if (data.error == null) {
            dispatch({
              type: "LOGIN",
              payload: data
            });

            controlLoading(false);
            navigation.navigate("BottomTab");
          } else {
            setState(prevState => ({
              ...prevState,
              error: data.error
            }));
            controlLoading(false);
          }
        })
        .catch(err => {
          alert(err);
          controlLoading(false);
        });
    } else {
      alert("Form is invalid");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Sign In</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="E-mail or phone number"
          onChangeText={email => {
            setState(prevState => ({ ...prevState, email }));
          }}
          value={state.email}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      {state.email_is_valid == false ? (
        <Text style={{ color: "red", fontSize: 14 }}>
          Please your email is not valid
        </Text>
      ) : null}
      <Text style={{ color: "red", fontSize: 15 }}>{state.emailerr}</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={password =>
            setState(prevState => ({ ...prevState, password }))
          }
          value={state.password}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <Text style={{ color: "red", fontSize: 15 }}>{state.error}</Text>

      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={{ color: "rgb(95, 32, 155)" }}>Forgot password?</Text>
      </TouchableOpacity>

      {!loading ? (
        <TouchableOpacity style={styles.loginContainer} onPress={login}>
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.loginContainer}>
          <Text style={styles.loginText}>Loading...</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => navigation.navigate("SignupScreen")}
      >
        <Text style={{ color: "rgb(95, 32, 155)" }}>Not a member?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  or: {
    fontFamily: AppStyles.fontName.main,
    color: "black",
    marginTop: 40,
    marginBottom: 10
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: "bold",
    color: AppStyles.color.tint,
    marginTop: 50,
    marginBottom: 20
  },
  leftTitle: {
    alignSelf: "stretch",
    textAlign: "left",
    marginLeft: 20
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: "center",
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text
  },
  myButton: {
    backgroundColor: "red"
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
    alignItems: "center"
  },
  loginText: {
    color: AppStyles.color.white,
    fontSize: 15,
    fontWeight: "bold"
  },
  placeholder: {
    fontFamily: AppStyles.fontName.text,
    color: "red"
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  }
});

/*
const mapStateToProps = (state) => {
    return { token: state.token,}
 };

  

const mapDispatchToProps = dispatch => ({
    login:dispatch(login)
});

 export default connect(mapStateToProps,mapDispatchToProps)(Login);
*/
