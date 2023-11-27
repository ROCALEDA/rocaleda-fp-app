import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import NavBar from "../navbar/navbar";
import { getUser } from "../../../utils/storage";
import globalStyles from "../../../styles/global-styles";
import { TInterview } from "../../../types/interview";
import Chip from "../chip/Chip";
import { formatTime, getDay, getMonth } from "../../../utils/date";

type InterviewDetailParamList = {
  InterviewDetail: {
    interview: TInterview;
  };
};

type InterviewDetailProps = {
  navigation: StackNavigationProp<ParamListBase>;
  route: RouteProp<InterviewDetailParamList, "InterviewDetail">;
};

const InterviewDetail = ({ navigation, route }: InterviewDetailProps) => {
  const [isLoading, setLoading] = useState(true);
  const { subject, client_name, realization_date, score } =
    route.params.interview;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser();
        if (user?.token && route.params.interview) {
          console.log("received interview details");
        } else {
          Alert.alert(`Usuario no autenticado`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <NavBar navigation={navigation} />
      <Text style={globalStyles.text_title}>Detalles de entrevista</Text>
      <View style={styles.interview}>
        <View
          style={[
            styles.circle,
            typeof score === "number" ? styles.complete : styles.pending,
          ]}
        ></View>
        <View style={styles.row}>
          {typeof score === "number" ? (
            <Chip label="Completada" backgroundColor="#B1E5D9" />
          ) : (
            <Chip label="Pendiente" backgroundColor="#F3DA90" />
          )}
        </View>
        <View style={styles.row}>
          <View style={[styles.column, styles.startdetails]}>
            <Text style={styles.title}>{subject}</Text>
            <Text style={styles.subtitle}>{client_name}</Text>
          </View>
          <View style={styles.rectangle} />
          <View style={styles.datetime}>
            <View style={styles.column}>
              <Text style={styles.title}>{getDay(realization_date)}</Text>
              <Text style={styles.month}>{getMonth(realization_date)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>{formatTime(realization_date)}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.row, styles.results]}>
          {typeof score === "number" ? (
            <View style={styles.column}>
              <Text style={styles.detail}>Resultado</Text>
              <Text style={styles.detail}>{score + "/100"}</Text>
            </View>
          ) : (
            <View style={styles.column}>
              <Text style={styles.detail}>
                Aun no hay resultados de esta entrevista
              </Text>
            </View>
          )}
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
    paddingHorizontal: 30,
    height: "100%",
    flexGrow: 1,
  },
  row: {
    flexDirection: "row",
    margin: 2,
  },
  column: {
    flexDirection: "column",
    justifyContent: "center",
    paddingEnd: 7,
  },
  interview: {
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
    fontWeight: "500",
    color: "#2D3748",
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
    zIndex: 1,
  },
  complete: {
    backgroundColor: "#B1E5D9",
  },
  pending: {
    backgroundColor: "#F3DA90",
  },
  startdetails: {
    flex: 3,
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
  results: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  detail: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: "bold",
    color: "#2D3748",
    textAlign: "center",
  },
});

export default InterviewDetail;
