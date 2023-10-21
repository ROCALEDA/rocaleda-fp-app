// Login.js
import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import globalStyles from "../../../styles/global-styles"; // Adjust the path accordingly

import { ImageBackground } from "react-native";
import { login } from "../../../api/apiService";
import { storeToken } from "../../../utils/token";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async () => {
    try {
      const { data, status } = await login(email, password);
      console.log(data);
      Alert.alert("Sesión iniciada");
      if (data.token) {
        storeToken(data.token);
      } else {
        // Handle errors
        console.error("Authentication failed");
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      Alert.alert(`${errorMessage}`);
    }
  };
  return (
    <ImageBackground
      source={require("../../assets/red-background.jpeg")} // Adjust the path accordingly
      style={styles.backgroundImage}
    >
      <ScrollView style={styles.container}>
        <View style={styles.login}>
          <View style={styles.header}>
            <Image source={require("../../assets/logo.png")} />
          </View>
          <View style={styles.welcome}>
            <Text style={globalStyles.text_title}>
              Estamos felices de verte de nuevo
            </Text>
          </View>
          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={globalStyles.text_label}>Correo</Text>
              <TextInput
                style={styles.input_field}
                placeholder="correo@quire.com"
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
            </View>
            <View style={styles.input}>
              <Text style={globalStyles.text_label}>Contraseña</Text>
              <TextInput
                style={styles.input_field}
                placeholder="******"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
              />
            </View>
            <TouchableOpacity
              style={globalStyles.button_primary}
              onPress={onSubmitHandler}
            >
              <Text style={globalStyles.button_primary_text}>INGRESAR</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.signin}>
          <Text style={globalStyles.text_title_small}>
            Aún no tienes una cuenta?
          </Text>
          <TouchableOpacity
            style={globalStyles.button_primary}
            onPress={() => console.log("Button pressed")}
          >
            <Text style={globalStyles.button_primary_text}>
              Quiero ser candidato
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch' or 'contain'
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
    fontFamily: "Outfit-Regular",
  },
  header: {
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    flex: 4,
    justifyContent: "center",
  },
  signin: {
    flex: 1,
    paddingVertical: 20,
    borderTopWidth: 2,
    borderTopColor: "#c4b5fd",
    rowGap: 20,
  },

  welcome: {
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Outfit-Regular",
  },
  form: {
    rowGap: 20,
  },
  input: {
    rowGap: 5,
  },
  input_text: {
    color: "red",
    fontFamily: "Outfit-Regular",
  },
  input_field: {
    height: 50,
    backgroundColor: "white",
    borderBottomColor: "#A15CAC",
    marginBottom: 16,
    padding: 8,
    fontFamily: "Outfit-Regular",
  },
});

export default SignUp;
