import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  ScrollView
} from "react-native";
import { AppStyles } from "../AppStyles";
import URL from "./url";

//I'm using this for email validation
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

let url = URL();

const SignupScreen = ({ navigation }) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [validName, setValidName] = React.useState(true);
  const [validEmail, setValidEmail] = React.useState(true);
  const [validPassword, setValidPassword] = React.useState(true);
  const [validForm, setValidForm] = React.useState(true);
  //Error message from server
  const [error, setError] = React.useState(false);
  const [loading, controlLoading] = React.useState(false);

  const nameInputChange = val => {
    if (val.trim().length >= 6) {
      setValidName(true);
      setValidForm(true);
    } else {
      setValidName(false);
      setValidForm(false);
    }
  };

  const emailInputchange = val => {
    if (validEmailRegex.test(val)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };

  const passwordInputchange = val => {
    if (val.trim().length >= 6) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  };

  const data = {
    name: name,
    email: email,
    password: password
  };

  const signup = () => {
    if (
      validName == true &&
      validEmail == true &&
      validPassword == true &&
      !name.trim().length == 0 &&
      !email.trim().length == 0 &&
      !password.trim().length == 0
    ) {
      controlLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      fetch(`${url}/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: myHeaders
      })
        .then(res => res.json())
        .then(data => {
          controlLoading(false);

          if (data.error == null) {
            alert(data.message);
            navigation.navigate("LoginScreen");
          } else {
            setError(!error);
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
    <View
      style={{
        backgroundColor: "rgb(39, 12, 75)",
        flex: 1
      }}
    >
      <View
        style={{
          marginTop: 40,
          justifyContent: "center",
          alignItems: "center",
          height: 70
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          Signup
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Full Name"
            onChangeText={name => {
              nameInputChange(name);
              setName(name);
            }}
            value={name}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        {validName == false ? (
          <Text style={{ color: "red", fontSize: 14 }}>
            Name must not be less than 6 characters
          </Text>
        ) : null}
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Email "
            onChangeText={email => {
              emailInputchange(email);
              setEmail(email);
            }}
            value={email}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        {error == true ? (
          <Text style={{ color: "red", fontSize: 14 }}>
            User with email already exists
          </Text>
        ) : null}

        {validEmail == false ? (
          <Text style={{ color: "red", fontSize: 14 }}>
            Please your email is not valid
          </Text>
        ) : null}

        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={password => {
              passwordInputchange(password);
              setPassword(password);
            }}
            value={password}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        {validPassword == false ? (
          <Text style={{ color: "red", fontSize: 14 }}>
            Password must not be less than 6 characters
          </Text>
        ) : null}
        {loading == false ? (
          <TouchableOpacity style={styles.loginContainer} onPress={signup}>
            <Text style={styles.loginText}>Sign up</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.loginContainer}>
            <Text style={styles.loginText}>Loading...</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={{ color: "rgb(39, 12, 75)", fontWeight: "bold" }}>
            Already a member?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
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
    backgroundColor: "rgb(39, 12, 75)",
    borderRadius: 100,
    padding: 10,
    marginTop: 30,
    alignItems: "center"
  },
  loginText: {
    color: AppStyles.color.white,
    fontSize: 15,
    fontWeight: "bold"
  },

  loginLoader: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: "#fff",
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
    alignItems: "center"
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
