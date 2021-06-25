import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions
} from "react-native";
import { Header } from "react-native-elements";
import { AuthContext } from "../App";
import jwt_decode from "jwt-decode";

import Icon from "react-native-vector-icons/Ionicons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

let url = "http://10.74.15.133:80";

const SingleProfile = ({ route, navigation }) => {
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

  const initialState = {
    myprofile: [],
    myposts: []
  };

  const [myprofile, fetchProfile] = React.useState([]);
  const [loading, controlLoading] = React.useState(true);

  const [posts, setState] = React.useState([]);

  const fetch_user = () => {
    fetch(
      `${url}/code_reservoir/single_profile.php/?user_id=${route.params.user_id}`,
      {
        method: "GET",
        "Content-Type": "application/json",
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        fetchProfile(data.my_profile);
        controlLoading(false);
      })
      .catch(err => console.log(err));
  };

  React.useEffect(() => {
    fetch_user();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {myprofile.map(user => (
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
            user_id == route.params.user_id ? (
              <TouchableOpacity
                onPress={() => navigation.navigate("EditProfile")}
              >
                <Icon name="pencil" size={25} color="rgb(95, 32, 155)" />
              </TouchableOpacity>
            ) : null
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
        <View>
          {myprofile.map(p => (
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
                  onPress={() =>
                    navigation.navigate("DirectMessage", {
                      user_id: p.user_id,
                      full_name: p.full_name,
                      user_img: p.user_img
                    })
                  }
                >
                  <Icon
                    name="chatbox-outline"
                    style={{ marginTop: 30 }}
                    size={30}
                    color="rgb(95, 32, 155)"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
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
  }
});

export default SingleProfile;
