import { useEffect, useState } from "react";
import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, Alert, StyleSheet, FlatList, View } from "react-native";

import NavBar from "../navbar/navbar";
import API_URL from "../../../api/config";
import { getUser } from "../../../utils/storage";
import globalStyles from "../../../styles/global-styles";
import AnimatedSkeleton from "../skeletons/skeleton-card";

import { TUser } from "../../../types/user";
import { TInterview } from "../../../types/interview";
import InterviewCard from "./interview-card";

type InterviewsProps = {
  navigation: StackNavigationProp<ParamListBase>;
};

const Interviews = ({ navigation }: InterviewsProps) => {
  const [interviews, setInterviews] = useState<TInterview[]>();
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<TUser>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser();
        setUser(user);
        if (user?.token) {
          const response = await fetch(`${API_URL}/interviews`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            console.log("interviews", data);
            setInterviews(data.data)
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

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <NavBar navigation={navigation} />
      <Text style={globalStyles.text_title}>
      {user?.role === "2" ? "Entrevistas agendadas" : "Mis entrevistas"}
      </Text>
      <View style={styles.list}>
        {isLoading ? (
          <>
            <AnimatedSkeleton />
            <AnimatedSkeleton />
            <AnimatedSkeleton />
          </>
        ) : (
          <FlatList
            data={interviews}
            renderItem={({ item }) => (
              <InterviewCard
                interview={item}
                navigation={navigation}
              />
            )}
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
    padding: 10,
    flexGrow: 1,
    flex: 1,
  },
});

export default Interviews;
