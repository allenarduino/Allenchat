import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../App";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

let url = "http://YOUR_IP:80/Backend";

const EditProfile = ({ navigation, route }) => {
  const [full_name, setfullName] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [loadingName, controlNameLoading] = React.useState(false);
  const [loadingBio, controlBioLoading] = React.useState(false);
  const { state } = React.useContext(AuthContext);

  const update_name = () => {
    if (full_name == "") {
      alert("Name must not be empty");
    } else {
      controlNameLoading(true);
      const formdata = new FormData();
      formdata.append("full_name", full_name);
      fetch(`${url}/update_name.php`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${state.token}`
        },
        body: formdata
      })
        .then(res => res.json())
        .then(data => {
          controlNameLoading(false);
          alert(data);
        })
        .catch(err => {
          console.log(err);
          controlNameLoading(false);
        });
    }
  };

  const update_bio = () => {
    if (bio == "") {
      alert("Your bio must not be empty");
    } else {
      controlBioLoading(true);
      const formdata = new FormData();
      formdata.append("bio", bio);
      fetch(`${url}/update_bio.php`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${state.token}`
        },
        body: formdata
      })
        .then(res => res.json())
        .then(data => {
          controlBioLoading(false);
          alert(data);
        })
        .catch(err => {
          console.log(err);
          controlBioLoading(false);
        });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {state.myprofile.map(p => (
        <ScrollView>
          <View>
            <Image
              source={{ uri: `${url}/${p.coverphoto}` }}
              style={styles.coverPhoto}
            />
            <Icon
              name="camera"
              size={30}
              color="#fff"
              style={{
                marginLeft: "80%",
                alignSelf: "flex-end",
                marginRight: 10,
                marginTop: -30
              }}
            />

            <View style={{ alignItems: "center" }}>
              <Image
                source={{ uri: `${url}/${p.user_img}` }}
                style={styles.avartar}
              />
              <Icon
                name="camera"
                size={30}
                color="#fff"
                style={{
                  alignSelf: "center",
                  marginRight: 10,
                  marginTop: -30
                }}
              />
            </View>
            <View style={{ marginTop: "20%" }}>
              <View style={styles.editName}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Edit Name
                </Text>
                <View style={styles.TextInputContainer}>
                  <TextInput
                    style={styles.inputField}
                    placeholder={p.full_name}
                    onChangeText={full_name => setfullName(full_name)}
                  />
                  {loadingName ? (
                    <Text style={{ fontSize: 12 }}>Updating...</Text>
                  ) : (
                    <TouchableOpacity onPress={() => update_name()}>
                      <Icon
                        name="checkmark-circle-outline"
                        size={35}
                        style={{ marginLeft: 20 }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <View style={styles.editName}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Edit Bio
                </Text>
                <View style={styles.TextInputContainer}>
                  <TextInput
                    style={styles.inputField2}
                    placeholder={p.bio}
                    multiline
                    maxLength={70}
                    onChangeText={bio => setBio(bio)}
                  />
                  {loadingBio ? (
                    <Text style={{ fontSize: 12 }}>Updating...</Text>
                  ) : (
                    <TouchableOpacity onPress={() => update_bio()}>
                      <Icon
                        name="checkmark-circle-outline"
                        size={35}
                        style={{ marginLeft: 20 }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      ))}
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  coverPhoto: {
    height: HEIGHT / 4,
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
  editName: {
    marginTop: 20,
    alignItems: "center"
  },

  TextInputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  inputField: {
    width: "80%",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "#3333",
    borderRadius: 20,
    fontSize: 20
  },

  inputField2: {
    width: "80%",
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "#3333",
    borderRadius: 20,
    fontSize: 20,
    height: 100
  }
});
