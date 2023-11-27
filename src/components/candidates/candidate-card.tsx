import { Text, StyleSheet, Image, View, Pressable, Alert } from "react-native";

import globalStyles from "../../../styles/global-styles"; // Adjust the path accordingly
import Chip from "../chip/Chip";

type TCandidate = {
  fullname: string;
  soft_skills: { description: string; id: number; name: string }[];
  tech_skills: { description: string; id: number; name: string }[];
  user_id: string;
};

const CandidateCard = ({
  user,
  selectCandidate,
  isClosed,
  selectedCandidateId,
}: {
  user: TCandidate;
  selectCandidate: (candidate_id: string) => void;
  isClosed: boolean;
  selectedCandidateId: string;
}) => {
  const showConfirmationAlert = () => {
    Alert.alert(
      "Selección de candidato",
      `Esta seguro de que desea confirmar a ${user.fullname} en la posición?`,
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelar"),
          style: "cancel",
        },
        {
          text: "Seleccionar",
          onPress: () => selectCandidate(user.user_id),
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.card}>
      <View style={styles.card_icon}>
        {selectedCandidateId === user.user_id ? (
          <Image
            source={require("../../../assets/hired.png")}
            style={styles.icon}
          />
        ) : (
          <Image
            source={require("../../../assets/person.png")}
            style={styles.icon}
          />
        )}
      </View>
      <View style={styles.row}>
        <Text style={styles.subtitle}>{user.fullname}</Text>
        {selectedCandidateId === user.user_id && (
          <Text style={globalStyles.text_label}> (Contratado)</Text>
        )}
      </View>

      <View style={styles.column}>
        <Text style={globalStyles.text_label}>Habilidades técnicas</Text>
        <View style={styles.skills}>
          {user.tech_skills.map((skill) => (
            <Chip key={skill.id} label={skill.name} backgroundColor="#FAE8FF" />
          ))}
        </View>
      </View>
      <View style={styles.column}>
        <Text style={globalStyles.text_label}>Habilidades blandas</Text>
        <View style={styles.skills}>
          {user.soft_skills.map((skill) => (
            <Chip key={skill.id} label={skill.name} backgroundColor="#F4E8C9" />
          ))}
        </View>
      </View>

      {!isClosed && (
        <View style={styles.actions}>
          <Pressable
            style={globalStyles.small_button_outline}
            onPress={() => showConfirmationAlert()}
            aria-label="Interviews"
          >
            <Text style={globalStyles.small_button_outline_text}>
              Seleccionar candidato
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  skills: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  column: {
    flexDirection: "column",
  },
  row: {
    alignItems: "baseline",
    flexDirection: "row",
  },
  card_icon: {
    position: "absolute",
    padding: 16,
  },
  card: {
    paddingLeft: 40,
    backgroundColor: "white",
    borderRadius: 4,
    padding: 16,
    marginVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 4,
    gap: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  actions: {},
});

export default CandidateCard;
