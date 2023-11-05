import { Text, StyleSheet, Image, View } from "react-native";

import Chip from "../chip/Chip";
import { soft_skills_by_id, tech_skills_by_id } from "../../../utils/skils";

type TPosition = {
  open_position: {
    candidate_id: number | null;
    id: number;
    is_open: boolean;
    position_name: string;
    project_id: number;
  };
  project: {
    customer_id: number;
    description: string;
    id: number;
    is_team_complete: boolean;
    name: string;
  };
  soft_skill_ids: number[];
  technology_ids: number[];
};

const PositionCard = ({ position }: { position: TPosition }) => {
  const getTechSkillLabelById = (skillId: string) => {
    const skill = tech_skills_by_id.find((skill) => skill.value === skillId);
    return skill ? skill.label : "Unknown";
  };
  const getSoftSkillLabelById = (skillId: string) => {
    const skill = soft_skills_by_id.find((skill) => skill.value === skillId);
    return skill ? skill.label : "Unknown";
  };
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image
          source={require("../../../assets/person.png")}
          style={styles.icon}
        />
        <Text style={styles.title}>{position.open_position.position_name}</Text>
      </View>
      <View style={styles.row}>
        {position.technology_ids.map((skillId, index) => (
          <Chip
            key={`${skillId}-${index}`}
            label={getTechSkillLabelById(skillId.toString())}
            backgroundColor="#FAE8FF"
          />
        ))}
      </View>
      <View style={styles.row}>
        {position.soft_skill_ids.map((skillId, index) => (
          <Chip
            key={`${skillId}-${index}`}
            label={getSoftSkillLabelById(skillId.toString())}
            backgroundColor="#F4E8C9"
          />
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

export default PositionCard;
