import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  Image,
  StyleSheet
} from "react-native";
import { List, ListItem, Header } from "react-native-elements";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { ScrollView, RectButton } from "react-native-gesture-handler";
import { AuthContext } from "../App";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

let url = "http://10.74.15.133:80/Backend";
const People = ({ navigation }) => {
  const [users, setUsers] = React.useState([]);
  const [loading, controlLoading] = React.useState(true);
  const { state, dispatch } = React.useContext(AuthContext);

  const fetch_users = () => {
    fetch(`${url}/fetch_users.php`, {
      methods: "GET",
      "Content-Type": "application/json",
      headers: {
        Authorization: `Bearer ${state.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        controlLoading(false);
      })
      .catch(err => console.log(err));
  };

  React.useEffect(() => {
    fetch_users();
  }, []);
  const renderItemComponent = data => {
    <TouchableOpacity style={styles.container}>
      <Image
        styles={styles.userImage}
        source={{ uri: `${url}/${data.user_img}` }}
      />
    </TouchableOpacity>;
  };

  const ItemSeparator = () => (
    <View
      style={{
        height: 2,
        backgroundColor: "rgba(0,0,0,0,0.5)",
        marginLeft: 10,
        marginRight: 10
      }}
    ></View>
  );

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "5%"
        }}
      ></View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        placement="left"
        leftComponent={
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
            Find Users
          </Text>
        }
        containerStyle={{
          backgroundColor: "#fff",
          //justifyContent: 'space-around',
          height: 100
        }}
      />

      <ScrollView>
        {loading ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: HEIGHT / 3,
              flex: 1
            }}
          >
            <Image
              source={require("../Images/loader5.gif")}
              style={{ height: 100, width: 100 }}
            />
          </View>
        ) : (
          users.map(item => (
            <RectButton
              onPress={() =>
                navigation.navigate("SingleProfile", { user_id: item.user_id })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  padding: 16,
                  alignItems: "center"
                }}
              >
                <Image
                  source={{ uri: `${url}/${item.user_img}` }}
                  size="giant"
                  style={styles.userImg}
                />
                <Text
                  style={{
                    color: "#000",
                    marginLeft: 10
                  }}
                >
                  {`${item.full_name}`}
                </Text>
              </View>
            </RectButton>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default People;

const styles = StyleSheet.create({
  userImg: {
    height: 50,
    width: 50,
    borderRadius: 50
  },

  container: {
    height: 300,
    margin: 10,
    borderRadius: 6
  }
});
