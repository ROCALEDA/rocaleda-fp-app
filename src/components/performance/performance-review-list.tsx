import { useEffect, useState } from "react";
import { ParamListBase, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Text,
  Alert,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";

import NavBar from "../navbar/navbar";
import API_URL from "../../../api/config";
import { TUser } from "../../../types/user";
import { getUser } from "../../../utils/storage";
import globalStyles from "../../../styles/global-styles";
import AnimatedSkeleton from "../skeletons/skeleton-card";
import { TTechnicalTest } from "../../../types/interview";
import TechnicalTestCard from "../technical-test/technical-test-card";

type PerformanceReviewProps = {
  navigation: StackNavigationProp<ParamListBase>;
};

const PerformanceReviewList = ({ navigation }: PerformanceReviewProps) => {
  const [reviews, setReviews] = useState<TTechnicalTest[]>();
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<TUser>();

  const getPerformanceReviews = async () => {
    try {
      const user = await getUser();
      setUser(user);
      if (user?.token) {
        const response = await fetch(
          `${API_URL}/customer/performance_evaluations`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
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
    getPerformanceReviews();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getPerformanceReviews();
    }, [])
  );
  return (
    <View style={styles.container}>
      <NavBar navigation={navigation} />
      <View style={styles.content}>
        <Text style={globalStyles.text_title}>Evaluaciones de desempeño</Text>
        <View style={styles.list}>
          <View style={styles.action}>
            <TouchableOpacity
              style={styles.add}
              onPress={() => navigation.navigate("Performance")}
              testID="create-performance-review"
            >
              <Image source={require("../../../assets/add.png")} />
              <Text style={globalStyles.text_label}>Añadir</Text>
            </TouchableOpacity>
          </View>
          {isLoading ? (
            <>
              <AnimatedSkeleton />
              <AnimatedSkeleton />
              <AnimatedSkeleton />
            </>
          ) : (
            <FlatList
              data={reviews}
              keyExtractor={(test) =>
                `ca${test.candidate_id}-po${test.open_position_id}-po${test.scheduled}`
              }
              renderItem={({ item }) => (
                <TechnicalTestCard technicalTest={item} />
              )}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    paddingTop: 40,
    backgroundColor: "white",
  },
  content: {
    flexGrow: 1,
    paddingVertical: 40,
    paddingHorizontal: 10,
    gap: 10,
  },
  add: {
    flexDirection: "row",
    alignItems: "center",
  },
  contentContainer: {
    paddingHorizontal: 10,
    justifyContent: "space-around",
  },
  action: {
    alignItems: "flex-end",
    alignContent: "flex-end",
  },
  list: {
    padding: 10,
    flexGrow: 1,
    flex: 1,
  },
});

export default PerformanceReviewList;
