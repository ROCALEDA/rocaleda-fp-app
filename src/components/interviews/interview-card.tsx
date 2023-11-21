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
      <View
        style={[
          styles.circle,
          typeof interview.score === "number"
            ? styles.complete
            : styles.pending,
        ]}
      ></View>
      <View style={styles.row}>
        {typeof interview.score === "number" ? (
          <Chip label="Completada" backgroundColor="#B1E5D9" />
        ) : (
          <Chip label="Pendiente" backgroundColor="#F3DA90" />
        )}
      </View>
      <View style={styles.row}>
        <View style={[styles.column, styles.startdetails]}>
          <Text style={styles.title}>{interview.subject}</Text>
          <Text style={styles.subtitle}>{interview.client_name}</Text>
        </View>
        <View style={styles.rectangle} />
        <View style={styles.datetime}>
          <View style={styles.column}>
            <Text style={styles.title}>
              {getDay(interview.realization_date)}
            </Text>
            <Text style={styles.month}>
              {getMonth(interview.realization_date)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>
              {formatTime(interview.realization_date)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    margin: 2,
  },
  column: {
    flexDirection: "column",
    paddingEnd: 7,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 4,
    paddingTop: 6,
    paddingBottom: 12,
    paddingLeft: 24,
    paddingRight: 5,
    marginVertical: 16,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    color: "#718096",
  },
  rectangle: {
    width: 3,
    borderColor: "#D9D9D9",
    borderEndWidth: 3,
    marginHorizontal: 5,
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    position: "absolute",
    top: -10,
    left: -5,
    zIndex: 1
  },
  complete: {
    backgroundColor: "#B1E5D9",
  },
  pending: {
    backgroundColor: "#F3DA90",
  },
  startdetails: {
    flex: 3
  },
  datetime: {
    flexDirection: "row",
    flex: 2,
    alignItems: "center",
    marginTop: -15,
  },
  month: {
    fontWeight: "bold",
    fontSize: 10,
  },
});

export default InterviewCard;
