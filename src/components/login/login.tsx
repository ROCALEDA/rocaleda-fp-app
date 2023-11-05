import { useState } from "react";
import {
  Alert,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import globalStyles from "../../../styles/global-styles"; // Adjust the path accordingly

import { ImageBackground } from "react-native";
import { login } from "../../../api/apiService";
import { storeUser } from "../../../utils/storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/routers";

type NavigationType = StackNavigationProp<ParamListBase>;

type LoginProps = {
  navigation: NavigationType;
};

const Login = ({ navigation }: LoginProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmitHandler = async () => {
    setLoading(true);
    try {
      const { data, status } = await login(email, password);
      if (data.token) {
        storeUser(data.token, data.role_id, data.user_id);
        navigation.navigate("Home");
        return;
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      Alert.alert(`${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const renderLoader = () => <ActivityIndicator />;

  const renderTextBtn = () => (
    <Text style={globalStyles.button_primary_text}>INGRESAR</Text>
  );

  return (
    <ImageBackground
      source={require("../../../assets/red-background.jpeg")} // Adjust the path accordingly
      style={styles.backgroundImage}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <Image source={require("../../../assets/logo.png")} />
          <View style={styles.welcome}>
            <Text style={globalStyles.text_title}>
              Estamos felices de verte de nuevo
            </Text>
          </View>
        </View>
        <View style={styles.login}>
          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={globalStyles.text_label}>Correo</Text>
              <TextInput
                style={styles.input_field}
                placeholder="correo@quire.com"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
              />
            </View>
            <View style={styles.input}>
              <Text style={globalStyles.text_label}>Contraseña</Text>
              <TextInput
                style={styles.input_field}
                placeholder="******"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
              />
            </View>
            <Pressable
              style={globalStyles.button_primary}
              onPress={onSubmitHandler}
              disabled={loading}
            >
              {loading ? renderLoader() : renderTextBtn()}
            </Pressable>
          </View>
        </View>
        <View style={styles.signin}>
          <Text style={globalStyles.text_title_small}>
            Aún no tienes una cuenta?
          </Text>
          <TouchableOpacity
            style={globalStyles.button_primary}
            onPress={() => navigation.navigate("SignUp")}
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
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "space-around",
  },
  header: {
    flex: 1,
    paddingVertical: 20,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  login: {
    flex: 2,
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

export default Login;
