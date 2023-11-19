import { Text, StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { TInterview } from "../../../types/interview";
import Chip from "../chip/Chip";
import { formatTime, getDay, getMonth } from "../../../utils/date";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";

type InterviewCardProps = {
  navigation: StackNavigationProp<ParamListBase>;
  interview: TInterview;
};

const InterviewCard = ({ interview, navigation }: InterviewCardProps) => {
  return (
    /*<TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("InterviewDetail", {
          interviewData: interview,
        })
      }
    >*/
    <View style={styles.card}>
      <View style={styles.row}>
        {typeof interview.score === "number" ? (
          <Chip label="" backgroundColor="#B1E5D9" />
        ) : (
          <Chip label="" backgroundColor="#F3DA90" />
        )}
      </View>
      <View style={styles.row}>
        {typeof interview.score === "number" ? (
          <Chip label="Completada" backgroundColor="#B1E5D9" />
        ) : (
          <Chip label="Pendiente" backgroundColor="#F3DA90" />
        )}
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>{interview.subject}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.subtitle}>{interview.client_name}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.subtitle}>
          {getDay(interview.realization_date)}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.subtitle}>
          {getMonth(interview.realization_date)}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.subtitle}>
          {formatTime(interview.realization_date)}
        </Text>
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

export default InterviewCard;
