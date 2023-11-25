import { Text, StyleSheet, Image, View, TouchableOpacity } from "react-native";

import Chip from "../chip/Chip";
import { soft_skills_by_id, tech_skills_by_id } from "../../../utils/skils";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";

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

type PositionCardProps = {
  navigation: StackNavigationProp<ParamListBase>;
  position: TPosition;
};

const PositionCard = ({ position, navigation }: PositionCardProps) => {
  const getTechSkillLabelById = (skillId: string) => {
    const skill = tech_skills_by_id.find((skill) => skill.value === skillId);
    return skill ? skill.label : "Unknown";
  };
  const getSoftSkillLabelById = (skillId: string) => {
    const skill = soft_skills_by_id.find((skill) => skill.value === skillId);
    return skill ? skill.label : "Unknown";
  };
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("PositionDetail", {
          positionId: position.open_position.id,
          positionName: position.open_position.position_name,
          description: position.open_position.position_name,
          isOpen: position.open_position.is_open,
          projectName: position.project.name,
          projectDescription: position.project.description,
          softSkills: position.soft_skill_ids,
          techSkills: position.technology_ids,
          candidateId: position.open_position.candidate_id,
        })
      }
    >
      <View style={styles.row}>
        <Image
          source={require("../../../assets/box.png")}
          style={styles.icon}
        />
        <Text style={styles.title}>{position.open_position.position_name}</Text>
      </View>
      <View style={styles.card_content}>
        <Text style={styles.project}>
          Proyecto:&nbsp;{position.project.name}
        </Text>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
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
  card_content: {
    paddingLeft: 25,
  },

  title: {
    fontSize: 18,
    fontFamily: "Outfit-SemiBold",
  },
  project: {
    fontSize: 16,
    fontFamily: "Outfit-Regular",
    color: "#718096",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default PositionCard;
