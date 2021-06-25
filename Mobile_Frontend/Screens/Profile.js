import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions
} from "react-native";
import { ContainerScroll } from "./styles";
import { Header } from "react-native-elements";
import { AuthContext } from "../App";
import jwt_decode from "jwt-decode";
import Icon from "react-native-vector-icons/Ionicons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

let url = "http://YOUR_IP:80/Backend";

export const ProfileContext = React.createContext();

const Profile = ({ navigation, route }) => {
  const { state, dispatch } = React.useContext(AuthContext);

  const token = state.token;
  const decoded = jwt_decode(token);
  const user_id = decoded;

  const [iconsConfigure] = React.useState({
    color: "#333",
    size: 20,
    style: {
      paddingRight: 15
    }
  });

  const [loading, controlLoading] = React.useState(true);

  const fetch_user = () => {
    fetch(`${url}/my_profile.php`, {
      method: "GET",
      "Content-Type": "application/json",
      headers: {
        Authorization: `Bearer ${state.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "FETCH_PROFILE", payload: data.my_profile });
        controlLoading(false);
      })
      .catch(err => console.log(state.token));
  };

  React.useEffect(() => {
    fetch_user();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {state.myprofile.map(user => (
        <Header
          placement="left"
          leftComponent={
            <Text onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={27} />
            </Text>
          }
          centerComponent={
            <Text
              onPress={() => navigation.goBack()}
              s
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "black",
                marginLeft: -5
              }}
            >
              {user.full_name}
            </Text>
          }
          rightComponent={
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditProfile", { user_id: user_id })
              }
            >
              <Icon name="pencil" size={25} color="rgb(95, 32, 155)" />
            </TouchableOpacity>
          }
          containerStyle={{
            backgroundColor: "#fff",
            height: 100
          }}
        />
      ))}
      {loading ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: HEIGHT / 3
          }}
        >
          <Image
            source={require("../Images/loader5.gif")}
            style={{ height: 100, width: 100 }}
          />
        </View>
      ) : (
        <ContainerScroll>
          {state.myprofile.map(p => (
            <View>
              <Image
                source={{ uri: `${url}/code_reservoir/${p.coverphoto}` }}
                style={styles.coverPhoto}
              />
              <View style={{ alignItems: "center" }}>
                <Image
                  source={{ uri: `${url}/code_reservoir/${p.user_img}` }}
                  style={styles.avartar}
                />
                <Text style={styles.name}>{p.full_name}</Text>
                <Text style={styles.bio}>{p.bio}</Text>
                <TouchableOpacity
                  style={styles.editProfile}
                  onPress={() =>
                    navigation.navigate("EditProfile", {
                      user_id: p.user_id,
                      full_name: p.full_name,
                      bio: p.bio
                    })
                  }
                >
                  <Text style={styles.editProfileText}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ContainerScroll>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  coverPhoto: {
    height: HEIGHT / 2,
    width: "100%",
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15
  },
  avartar: {
    width: 110,
    height: 110,
    borderRadius: 110,
    marginTop: -50,
    borderWidth: 3,
    borderColor: "#fff"
  },
  name: {
    fontSize: 25,
    fontWeight: "bold"
  },
  editProfile: {
    backgroundColor: "rgb(95, 32, 155)",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    borderRadius: 20,
    marginTop: 30
  },
  editProfileText: {
    color: "#fff",
    fontWeight: "bold"
  }
});

export default Profile;
