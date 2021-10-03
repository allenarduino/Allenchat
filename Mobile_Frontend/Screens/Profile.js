import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import URL from "./url";
import { Header } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../contexts/AuthContextProvider";
import { ProfileContext } from "../contexts/ProfileContextProvider";
import jwt_decode from "jwt-decode";
import Autolink from "react-native-autolink";
import { useIsFocused } from "@react-navigation/native";
import SettingsPopOver from "../Components/SettingsPopOver/SettingsPopOver";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Profile = ({ navigation, route }) => {
  const { auth_state, dispatch } = React.useContext(AuthContext);
  const { profile_state, profile_dispatch } = React.useContext(ProfileContext);
  let url = URL();
  const isFocused = useIsFocused();
  const token = auth_state.token;
  const decoded = jwt_decode(token);
  const user_id = decoded;

  const scrollRef = React.useRef();
  const scroll_to_Top = () => {
    scrollRef.current.scrollTo({
      y: 0,
      animated: true
    });
  };

  const [iconsConfigure] = React.useState({
    color: "#333",
    size: 20,
    style: {
      paddingRight: 15
    }
  });

  const [loading, controlLoading] = React.useState(true);
  const [max, setMax] = React.useState(0);

  const [myposts, fetchPosts] = React.useState([]);
  const [settingsVisisible, openSettings] = React.useState(false);
  const [myprofile, fetchProfile] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [bottomModalVisible, setBottomModalVisible] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const fetch_user = () => {
    let myHeaders = new Headers();
    myHeaders.append("x-access-token", auth_state.token);
    fetch(`${url}/user_profile/${user_id}`, {
      method: "GET",
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        profile_dispatch({ type: "FETCH_PROFILE", payload: data.user_profile });
        controlLoading(false);
      })
      .catch(err => console.log(err));
  };

  React.useEffect(() => {
    if (isFocused) {
      fetch_user();
    }
  }, [navigation, isFocused]);

  //Getting user name from profile context
  const full_name = profile_state.profile.map(profile => {
    return profile.full_name;
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingBottom: 30 }}>
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
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
              marginLeft: -5
            }}
          >
            {full_name}
          </Text>
        }
        rightComponent={
          <TouchableOpacity onPress={() => openSettings(!settingsVisisible)}>
            <Icon name="settings" size={25} color="black" />
          </TouchableOpacity>
        }
        containerStyle={{
          backgroundColor: "#fff",
          //justifyContent: 'space-around',
          height: "13%"
        }}
      />
      {settingsVisisible ? <SettingsPopOver /> : null}

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
        <ScrollView ref={scrollRef}>
          {profile_state.profile.map(p => (
            <View>
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate("DetailedImage", {
                    detailed_image: p.coverphoto
                  })
                }
              >
                <Image
                  source={{ uri: `${url}/${p.coverphoto}` }}
                  style={styles.coverPhoto}
                />
              </TouchableWithoutFeedback>
              <View style={{ alignItems: "center" }}>
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate("DetailedImage", {
                      detailed_image: p.user_img
                    })
                  }
                >
                  <Image
                    source={{ uri: `${url}/${p.user_img}` }}
                    style={styles.avartar}
                  />
                </TouchableWithoutFeedback>
                <Text style={styles.name}>{p.full_name}</Text>
                <Text style={styles.bio}>{p.bio}</Text>
                <TouchableOpacity
                  style={styles.editProfile}
                  onPress={() =>
                    navigation.navigate("EditProfile", {
                      user_id: p.user_id,
                      full_name: p.full_name,
                      bio: p.bio,
                      coverphoto: p.coverphoto,
                      user_img: p.user_img
                    })
                  }
                >
                  <Text style={styles.editProfileText}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
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
  bio: {
    alignSelf: "center",
    textAlign: "center"
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
  },
  myVideo: {
    flex: 1,
    margin: 5,
    borderRadius: 10
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    height: HEIGHT,
    width: WIDTH
  },
  modalContent: {
    backgroundColor: "#fff",
    height: 150,
    width: "80%",
    alignSelf: "center",
    marginTop: HEIGHT / 3,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Profile;
