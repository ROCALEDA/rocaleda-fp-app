// Login.js
import {
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Alert,
} from "react-native";

import globalStyles from "../../../styles/global-styles"; // Adjust the path accordingly
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken, getUser } from "../../../utils/token";
import API_URL from "../../../api/config";

type TCandidate = {
  fullname: string;
  soft_skills: { description: string; id: number; name: string }[];
  tech_skills: { description: string; id: number; name: string }[];
  user_id: string;
};

const Candidates = ({}) => {
  const [candidates, setCandidates] = useState<TCandidate[]>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve the item from AsyncStorage
        const user = await getUser();
        if (user?.token) {
          // Make a fetch request using the retrieved item
          const response = await fetch(`${API_URL}/candidate`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          });
          const data = await response.json();
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
    <ImageBackground
      source={require("../../../assets/red-background.jpeg")} // Adjust the path accordingly
      style={styles.backgroundImage}
      testID="background-image"
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={globalStyles.text_title}>Candidates</Text>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch' or 'contain'
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "space-around",
  },
});

export default Candidates;
