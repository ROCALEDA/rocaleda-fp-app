// Login.js
import { useEffect, useState } from "react";
import { Text, Alert, StyleSheet, FlatList, View } from "react-native";

import NavBar from "../navbar/navbar";
import API_URL from "../../../api/config";
import CandidateCard from "./candidate-card";
import { getUser } from "../../../utils/token";
import globalStyles from "../../../styles/global-styles"; // Adjust the path accordingly
import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AnimatedSkeleton from "./skeleton-card";

type TCandidate = {
  fullname: string;
  soft_skills: { description: string; id: number; name: string }[];
  tech_skills: { description: string; id: number; name: string }[];
  user_id: string;
};

type CandidateProps = {
  navigation: StackNavigationProp<ParamListBase>;
};

const Candidates = ({ navigation }: CandidateProps) => {
  const [candidates, setCandidates] = useState<TCandidate[]>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser();
        if (user?.token) {
          const response = await fetch(`${API_URL}/candidate`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          });
          const data = await response.json();
          console.log("DATA USER", data);
          setCandidates(data.data);
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
      <Text style={globalStyles.text_title}>Candidatos</Text>
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
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "space-around",
  },
  list: {
    paddingHorizontal: 30,
    padding: 10,
  },
});

export default Candidates;
