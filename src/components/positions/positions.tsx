import { useEffect, useState } from "react";
import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, Alert, StyleSheet, FlatList, View } from "react-native";

import NavBar from "../navbar/navbar";
import API_URL from "../../../api/config";
import { getUser } from "../../../utils/storage";
import globalStyles from "../../../styles/global-styles";
import AnimatedSkeleton from "../skeletons/skeleton-card";
import PositionCard from "./position-card";
import { TUser } from "../../../types/user";

type TPosition = {
  open_position: {
    candidate_id: number | null;
    id: number;
    is_open: boolean;
    position_name: string;
    project_id: number;
  };
  project: {
    customer_id: number;
    description: string;
    id: number;
    is_team_complete: boolean;
    name: string;
  };
  soft_skill_ids: number[];
  technology_ids: number[];
};

type PositionsProps = {
  navigation: StackNavigationProp<ParamListBase>;
};

const Positions = ({ navigation }: PositionsProps) => {
  const [positions, setPositions] = useState<TPosition[]>();
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<TUser>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser();
        setUser(user);
        if (user?.token) {
          const response = await fetch(`${API_URL}/positions`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          });
          console.log("user", user);
          if (response.ok) {
            const data = await response.json();
            if (user.role == "2") {
              const filteredPositions = data.filter(
                (position: TPosition) =>
                  position.project.customer_id === Number(user.id)
              );
              setPositions(filteredPositions);
            } else {
              setPositions(data);
            }
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
        {user?.role === "2" ? "Mis posiciones" : "Posiciones"}
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
            data={positions}
            keyExtractor={(position) =>
              `po${position.open_position.id.toString()}-pr${position.project.id.toString()}`
            }
            renderItem={({ item }) => (
              <PositionCard
                position={item}
                key={`po${item.open_position.id.toString()}-pr${item.project.id.toString()}`}
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

export default Positions;
