import { Text, StyleSheet, Image, View } from "react-native";
import { TTechnicalTest } from "../../../types/interview";
import globalStyles from "../../../styles/global-styles";

type TechnicalCardProps = {
  technicalTest: TTechnicalTest;
};

const TechnicalTestCard = ({ technicalTest }: TechnicalCardProps) => {
  return (
    <View style={styles.card}>
      <Image source={require("../../../assets/box.png")} style={styles.icon} />
      <View style={styles.column}>
        <Text style={styles.title}>{technicalTest.name}</Text>
        <Text style={styles.observations}>{technicalTest.observations}</Text>
        <Text style={globalStyles.text_label}>
          Puntaje:{technicalTest.score}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  column: {
    flexDirection: "column",
  },
  card: {
    flexDirection: "row",
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
  observations: {
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

export default TechnicalTestCard;
