import { useEffect, useState } from "react";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Text,
  Alert,
  StyleSheet,
  FlatList,
  View,
  ScrollView,
} from "react-native";

import NavBar from "../navbar/navbar";
import API_URL from "../../../api/config";
import { getUser } from "../../../utils/storage";
import globalStyles from "../../../styles/global-styles";
import AnimatedSkeleton from "../skeletons/skeleton-card";
import CandidateCard from "../candidates/candidate-card";
import { TCandidate } from "../../../types/user";

type PositionsProps = {
  navigation: StackNavigationProp<ParamListBase>;
  route: any;
};

const PositionDetail = ({ navigation, route }: PositionsProps) => {
  const [candidates, setCandidates] = useState<TCandidate[]>();
  const [isLoading, setLoading] = useState(true);
  console.log("candidates", candidates);
  const { positionId, positionName } = route.params;
  console.log("POSITIONID", positionId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser();
        if (user?.token && positionId) {
          const response = await fetch(
            `${API_URL}/positions/${positionId}/candidates`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          const data = await response.json();
          console.log("data", data);
          setCandidates(data);
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
      <Text style={globalStyles.text_title}>Candidatos de {positionName}</Text>
      <View style={styles.list}>
        {isLoading ? (
          <>
            <AnimatedSkeleton />
            <AnimatedSkeleton />
            <AnimatedSkeleton />
            {/* Render as many skeletons as you want to simulate a full page */}
          </>
        ) : (
          <FlatList
            data={candidates}
            keyExtractor={(item) => item.user_id.toString()}
            renderItem={({ item }) => <CandidateCard user={item} />}
          />
        )}
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
  contentContainer: {
    justifyContent: "space-around",
  },
  list: {
    paddingHorizontal: 30,
    height: "100%",
    flexGrow: 1,
    flex: 1,
  },
});

export default PositionDetail;
