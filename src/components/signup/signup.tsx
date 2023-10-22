import { useState } from "react";
import {
  Text,
  View,
  Image,
  Alert,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";

import globalStyles from "../../../styles/global-styles"; // Adjust the path accordingly

import { ImageBackground } from "react-native";
import { login, signup } from "../../../api/apiService";
import { storeToken } from "../../../utils/token";
import { softSkills, technicalSkills } from "../../../utils/skils";

type LoginProps = {
  navigation: any;
};

const SignUp = ({ navigation }: LoginProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [softSkillsSelected, setSoftSkills] = useState<string[]>([]);
  const [technicalSkillsSelected, setTechnicalSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmitHandler = async () => {
    setLoading(true);
    try {
      const { data, status } = await signup({
        email,
        phone,
        password,
        fullname: name,
        soft_skills: softSkillsSelected,
        tech_skills: technicalSkillsSelected,
      });
      console.log(data);
      Alert.alert("Registro exitoso");
      if (data.token) {
        storeToken(data.token);
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
    <Text style={globalStyles.button_primary_text}>REGISTRARME</Text>
  );

  return (
    <ImageBackground
      source={require("../../../assets/red-background.jpeg")} // Adjust the path accordingly
      style={styles.backgroundImage}
    >
      <ScrollView style={styles.container}>
        <View style={styles.login}>
          <View style={styles.header}>
            <Image source={require("../../../assets/logo.png")} />
          </View>
          <View style={styles.welcome}>
            <Text style={globalStyles.text_title}>Registrarme como</Text>
            <Text style={globalStyles.text_highlight_candidate}>candidato</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={globalStyles.text_label}>Nombre</Text>
              <TextInput
                style={styles.input_field}
                placeholder="Nombre"
                onChangeText={(text) => setName(text)}
                value={name}
              />
            </View>
            <View style={styles.input}>
              <Text style={globalStyles.text_label}>Telefono</Text>
              <TextInput
                style={styles.input_field}
                placeholder="Teléfono"
                onChangeText={(text) => setPhone(text)}
                value={phone}
              />
            </View>
            <View style={styles.input}>
              <Text style={globalStyles.text_label}>Email</Text>
              <TextInput
                style={styles.input_field}
                placeholder="correo@quire.com"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
              />
            </View>
            <View style={styles.password_stack}>
              <View style={styles.password_input}>
                <Text style={globalStyles.text_label}>Contraseña</Text>
                <TextInput
                  style={styles.input_field}
                  placeholder="******"
                  secureTextEntry
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  testID="password"
                />
              </View>
              <View style={styles.password_input}>
                <Text style={globalStyles.text_label}>Repite contraseña</Text>
                <TextInput
                  style={styles.input_field}
                  placeholder="******"
                  secureTextEntry
                  onChangeText={(text) => setRepeatPassword(text)}
                  value={repeatPassword}
                />
              </View>
            </View>
            <View style={styles.input}>
              <Text style={globalStyles.text_label}>Habilidades blandas</Text>
              <MultipleSelectList
                setSelected={(val: string[]) => {
                  setSoftSkills(val);
                }}
                data={softSkills}
                save="value"
                boxStyles={{
                  backgroundColor: "white",
                  borderWidth: 0,
                  borderRadius: 0,
                }}
                dropdownStyles={{
                  backgroundColor: "white",
                  borderWidth: 0,
                  borderRadius: 0,
                }}
                labelStyles={{
                  display: "none",
                }}
              />
            </View>
            <View style={styles.input}>
              <Text style={globalStyles.text_label}>Habilidades técnicas</Text>
              <MultipleSelectList
                setSelected={(val: string[]) => setTechnicalSkills(val)}
                data={technicalSkills}
                save="value"
                boxStyles={{
                  backgroundColor: "white",
                  borderWidth: 0,
                  borderRadius: 0,
                }}
                dropdownStyles={{
                  backgroundColor: "white",
                  borderWidth: 0,
                  borderRadius: 0,
                }}
                labelStyles={{
                  display: "none",
                }}
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
            Ya tienes una cuenta?
          </Text>
          <TouchableOpacity
            style={globalStyles.button_secondary}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={globalStyles.button_secondary_text}>Ingresar</Text>
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
  password_input: {
    flex: 1,
  },
  password_stack: {
    flexDirection: "row",
    columnGap: 10,
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
    rowGap: 10,
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
