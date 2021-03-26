import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import Loading from "../../components/Loading";

export default function Restaurants({ navigation }) {
  const [user, setUser] = useState(null);
  const [startRestaurant, setStartRestaurant] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      userInfo ? setUser(true) : setUser(false);
    });
  }, []);

  if (user === null) {
    return <Loading isVisible={true} text="Cargando..." />;
  }

  return (
    <View style={styles.viewBody}>
      {user && (
        <Icon
          type="material-community"
          name="plus"
          color="#442484"
          reverse
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate("add-restaurant")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
  btnContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "black", //sombrita
    shadowOffset: { width: 2, height: 2 }, //como poner la sombra
    shadowOpacity: 0.5,
  },
  notFoundView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
