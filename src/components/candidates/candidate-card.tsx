// Login.js
import { useEffect, useState } from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import API_URL from "../../../api/config";
import { getToken, getUser } from "../../../utils/storage";
import globalStyles from "../../../styles/global-styles"; // Adjust the path accordingly
import Chip from "../chip/Chip";

type TCandidate = {
  fullname: string;
  soft_skills: { description: string; id: number; name: string }[];
  tech_skills: { description: string; id: number; name: string }[];
  user_id: string;
};

const CandidateCard = ({ user }: { user: TCandidate }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image
          source={require("../../../assets/person.png")}
          style={styles.icon}
        />
        <Text style={styles.title}>{user.fullname}</Text>
      </View>
      <View style={styles.row}>
        {user.tech_skills.map((skill) => (
          <Chip key={skill.id} label={skill.name} backgroundColor="#FAE8FF" />
        ))}
      </View>
      <View style={styles.row}>
        {user.soft_skills.map((skill) => (
          <Chip key={skill.id} label={skill.name} backgroundColor="#F4E8C9" />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
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
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: "600",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default CandidateCard;
