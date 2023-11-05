import {
  Text,
  View,
  Alert,
  StyleSheet,
  Pressable,
  ImageBackground,
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
      try {
        const user = await getUser();
        if (user?.token && user.role) {
          setRoleId(user.role);
        } else {
          Alert.alert(`Usuario no autenticado`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    setUserData();
  }, []);

  const renderTextBtn = (text: string) => (
    <Text style={globalStyles.button_primary_text}>{text}</Text>
  );

  return (
    <ImageBackground
      source={require("../../../assets/blue-background.png")} // Adjust the path accordingly
      style={styles.backgroundImage}
      testID="background-image"
    >
      <View style={styles.container}>
        <NavBar navigation={navigation} />
        <View style={styles.content}>
          {["3"].includes(roleId) && (
            <Pressable
              style={globalStyles.button_primary}
              onPress={() => navigation.navigate("Entrevistas")}
            >
              {renderTextBtn("ENTREVISTAS")}
            </Pressable>
          )}
          {["1"].includes(roleId) && (
            <Pressable
              style={globalStyles.button_primary}
              onPress={() => navigation.navigate("Candidatos")}
            >
              {renderTextBtn("CANDIDATOS")}
            </Pressable>
          )}
          {["1"].includes(roleId) && (
            <Pressable
              style={globalStyles.button_primary}
              onPress={() => navigation.navigate("Proyectos")}
            >
              {renderTextBtn("PROYECTOS")}
            </Pressable>
          )}
          {["2"].includes(roleId) && (
            <Pressable
              style={globalStyles.button_primary}
              onPress={() => navigation.navigate("Performance")}
            >
              {renderTextBtn("EVALUAR DESEMPEÑO")}
            </Pressable>
          )}
        </View>
      </View>
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
  },
  content: {
    paddingHorizontal: 20,
    justifyContent: "center",
    flexGrow: 1,
    gap: 20,
    height: "100%",
  },
});

export default Home;
