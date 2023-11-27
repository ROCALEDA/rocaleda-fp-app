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
import Chip from "../chip/Chip";

type PositionDetailParamList = {
  PositionDetail: {
    positionId: string;
    candidateId: string;
    positionName: string;
    description: string;
    isOpen: boolean;
    projectName: string;
    projectDescription: string;
    softSkills: number[];
    techSkills: number[];
  };
};

type PositionsProps = {
  navigation: StackNavigationProp<ParamListBase>;
  route: RouteProp<PositionDetailParamList, "PositionDetail">;
};

const PositionDetail = ({ navigation, route }: PositionsProps) => {
  const [candidates, setCandidates] = useState<TCandidate[]>();
  const [isLoading, setLoading] = useState(true);

  const {
    positionId,
    positionName,
    isOpen,
    projectName,
    projectDescription,
    candidateId,
  } = route.params;
  const [selectedCandidateId, setSelectedCandidateId] = useState(candidateId);

  const [isClosed, setIsClosed] = useState<boolean>(!isOpen);

  const getCandidates = async () => {
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

  const selectCandidate = async (candidate_id: string) => {
    try {
      const user = await getUser();
      if (user?.token) {
        const response = await fetch(`${API_URL}/positions/${positionId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ candidate_id }),
          method: "PATCH",
        });

        if (response.ok) {
          const data = await response.json();
          setIsClosed(!data.is_open);
          setSelectedCandidateId(data.candidate_id);
          Alert.alert(`CANDIDATO SELECCIONADO`);
        }
      } else {
        Alert.alert(`Usuario no autenticado`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCandidates();
  }, []);

  return (
    <View style={styles.container}>
      <NavBar navigation={navigation} />
      <View style={styles.content}>
        <Text style={globalStyles.text_title}>Posición {positionName}</Text>
        <View style={styles.section}>
          <View style={styles.status_row}>
            <Text style={globalStyles.subtitle}>Estado</Text>
            <Chip
              label={isClosed ? "Cerrada" : "Abierta"}
              backgroundColor={isClosed ? "#84A1ED" : "#B1E5D9"}
            />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={globalStyles.subtitle}>Proyecto</Text>
          <Text style={globalStyles.text_label}>{projectName}</Text>
          <Text style={globalStyles.text_label}>{projectDescription}</Text>
        </View>
        <View style={styles.section}>
          <Text style={globalStyles.subtitle}>Candidatos</Text>
        </View>
        <View style={styles.list}>
          {isLoading ? (
            <>
              <AnimatedSkeleton />
              <AnimatedSkeleton />
              <AnimatedSkeleton />
            </>
          ) : (
            <>
              {candidates?.length == 0 ? (
                <Text style={globalStyles.text_label}>
                  No hay candidatos en esta posición
                </Text>
              ) : (
                <FlatList
                  testID="candidate-list"
                  data={candidates}
                  keyExtractor={(item) => item.user_id.toString()}
                  renderItem={({ item }) => (
                    <CandidateCard
                      selectedCandidateId={selectedCandidateId}
                      user={item}
                      selectCandidate={selectCandidate}
                      isClosed={isClosed}
                    />
                  )}
                />
              )}
            </>
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
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    gap: 40,
  },
  status_row: {
    alignItems: "center",
    gap: 10,
    flexDirection: "row",
  },
  status: {
    width: "auto",
  },

  section: {
    flexDirection: "column",
    gap: 5,
  },

  list: {
    flex: 1,
    flexGrow: 1,
    alignContent: "flex-start",
  },
});

export default PositionDetail;
