import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, StyleSheet, View, TextInput, Pressable } from "react-native";
import Slider from "@react-native-community/slider";

import NavBar from "../navbar/navbar";
import globalStyles from "../../../styles/global-styles";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  renderPrimaryButtonText,
  renderSecondaryButtonText,
} from "../../../utils/buttons";

type PositionsProps = {
  navigation: StackNavigationProp<ParamListBase>;
};

const Performance = ({ navigation }: PositionsProps) => {
  const [project, setProject] = useState("");
  const [profile, setProfile] = useState("");
  const [description, setDescription] = useState("");
  const [sliderValue, setSliderValue] = useState(0);

  const validateForm = () => {
    if (!project) {
      alert("Please select a project");
      return false;
    }
    if (!profile) {
      alert("Please select a profile");
      return false;
    }
    if (!description) {
      alert("Description cannot be empty");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Submit form logic
      console.log({ project, profile, description, sliderValue });
    }
  };

  return (
    <View style={styles.container}>
      <NavBar navigation={navigation} />
      <Text style={globalStyles.text_title}>Evaluación de desempeño</Text>
      <View style={styles.form}>
        <View>
          <Text style={globalStyles.text_label}>Proyecto</Text>
          <View style={styles.bordered}>
            <Picker
              selectedValue={project}
              onValueChange={(itemValue) => setProject(itemValue)}
            >
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </View>
        </View>
        <View>
          <Text style={globalStyles.text_label}>Perfil</Text>
          <View style={styles.bordered}>
            <Picker
              selectedValue={profile}
              onValueChange={(itemValue) => setProfile(itemValue)}
            >
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </View>
        </View>
        <View>
          <Text style={globalStyles.text_label}>Description</Text>
          <TextInput
            multiline
            numberOfLines={4}
            onChangeText={(text) => setDescription(text)}
            value={description}
            style={styles.bordered}
          />
        </View>
        <View>
          <Text style={globalStyles.text_label}>Score (0-100)</Text>

          <Slider
            step={1}
            minimumValue={0}
            maximumValue={100}
            onValueChange={setSliderValue}
            value={sliderValue}
            minimumTrackTintColor="#A15CAC"
            maximumTrackTintColor="#EAB5FD"
            thumbTintColor="#A15CAC"
            style={{ width: "100%", height: 40 }}
          />
          <View style={styles.score}>
            <Text>{sliderValue}</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <Pressable
            style={globalStyles.button_outlined}
            onPress={() => navigation.navigate("Home")}
          >
            {renderSecondaryButtonText("CANCEL")}
          </Pressable>
          <Pressable
            style={globalStyles.button_primary}
            onPress={() => navigation.navigate("Performance")}
          >
            {renderPrimaryButtonText("SUBMIT")}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    backgroundColor: "#ffffff",
    gap: 10,
    flex: 1,
  },
  form: {
    padding: 30,
    gap: 40,
  },
  bordered: {
    borderBottomColor: "#B4B4B4",
    borderBottomWidth: 2,
  },
  score: {
    alignItems: "center",
    fontSize: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Performance;
