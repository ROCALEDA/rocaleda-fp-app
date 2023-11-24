import { useEffect, useState } from "react";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, Alert, StyleSheet, FlatList, View } from "react-native";

import NavBar from "../navbar/navbar";
import API_URL from "../../../api/config";
import { getUser } from "../../../utils/storage";
import globalStyles from "../../../styles/global-styles";
import AnimatedSkeleton from "../skeletons/skeleton-card";
import CandidateCard from "../candidates/candidate-card";
import { TCandidate } from "../../../types/user";

type PositionDetailParamList = {
  PositionDetail: {
    positionId: string;
    positionName: string;
  };
};

type PositionsProps = {
  navigation: StackNavigationProp<ParamListBase>;
  route: RouteProp<PositionDetailParamList, "PositionDetail">;
};

const PositionDetail = ({ navigation, route }: PositionsProps) => {
  const [candidates, setCandidates] = useState<TCandidate[]>();
  const [isLoading, setLoading] = useState(true);
  const { positionId, positionName } = route.params;

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
          </>
        ) : (
          <FlatList
            testID="candidate-list"
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
