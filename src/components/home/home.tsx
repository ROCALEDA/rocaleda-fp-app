import {
  Image,
  Text,
  View,
  Alert,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import NavBar from "../navbar/navbar";
import { getUser } from "../../../utils/storage";
import globalStyles from "../../../styles/global-styles"; // Adjust the path accordingly

type HomeProps = {
  navigation: StackNavigationProp<ParamListBase>;
};

const Home = ({ navigation }: HomeProps) => {
  const [roleId, setRoleId] = useState<string>("");

  useEffect(() => {
    const setUserData = async () => {
      const user = await getUser();
      if (user?.token && user.role) {
        setRoleId(user.role);
      } else {
        Alert.alert(`Usuario no autenticado`);
      }
    };

    setUserData();
  }, []);

  return (
    <ImageBackground
      source={require("../../../assets/home-background.png")}
      style={styles.backgroundImage}
      testID="background-image"
    >
      <View style={styles.container}>
        <NavBar navigation={navigation} />
        <View style={styles.content}>
          <Text style={globalStyles.text_title}>Hola!</Text>
          <Text style={globalStyles.text_subtitle}>
            {roleId === "1" && "Administra candidatos y compañías"}
            {roleId === "2" &&
              "Haz crecer a tu compañía con los mejores talentos"}
            {roleId === "3" &&
              "Elige la mejor empresa para que puedas crecer profesionalmente"}
          </Text>
          {["2", "3"].includes(roleId) && (
            <TouchableOpacity
              onPress={() => navigation.navigate("Interviews")}
              aria-label="Interviews"
            >
              <View style={styles.card}>
                <View style={styles.card_description}>
                  <Text style={globalStyles.text_subtitle}>Entrevistas</Text>
                  <Text style={globalStyles.text_description}>
                    {roleId === "3"
                      ? "Consulta tus entrevistas con compañías"
                      : "Consulta tus entrevistas con candidatos"}
                  </Text>
                </View>
                <View style={styles.action}>
                  <Image
                    source={require("../../../assets/chevron_right.png")}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
          {["1", "2"].includes(roleId) && (
            <TouchableOpacity
              onPress={() => navigation.navigate("Positions")}
              aria-label="Posiciones"
            >
              <View style={styles.card}>
                <View style={styles.card_description}>
                  <Text style={globalStyles.text_subtitle}>Posiciones</Text>
                  <Text style={globalStyles.text_description}>
                    Consulta tus posiciones creadas
                  </Text>
                </View>
                <View style={styles.action}>
                  <Image
                    source={require("../../../assets/chevron_right.png")}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
          {["2"].includes(roleId) && (
            <TouchableOpacity
              onPress={() => navigation.navigate("PerformanceReviewList")}
              aria-label="Performance reviews"
            >
              <View style={styles.card}>
                <View style={styles.card_description}>
                  <Text style={globalStyles.text_subtitle}>
                    Pruebas de desempeño
                  </Text>
                  <Text style={globalStyles.text_description}>
                    Evalua el progreso de tus colaboradores
                  </Text>
                </View>
                <View style={styles.action}>
                  <Image
                    source={require("../../../assets/chevron_right.png")}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
          {["2"].includes(roleId) && (
            <TouchableOpacity
              onPress={() => navigation.navigate("TechnicalTests")}
              aria-label="Prueba técnica"
            >
              <View style={styles.card}>
                <View style={styles.card_description}>
                  <Text style={globalStyles.text_subtitle}>
                    Pruebas técnicas
                  </Text>
                  <Text style={globalStyles.text_description}>
                    Registra el resultado de las pruebas técnicas
                  </Text>
                </View>
                <View style={styles.action}>
                  <Image
                    source={require("../../../assets/chevron_right.png")}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    resizeMode: "cover",
  },
  content: {
    flexGrow: 1,
    gap: 10,
    textAlign: "left",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 4,
    padding: 16,
    marginVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    gap: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  card_description: {
    flex: 5,
    resizeMode: "cover",
  },
  action: {
    flex: 1,
    alignItems: "flex-end",
  },
});

export default Home;
