import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Text,
  View,
  Alert,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Slider from "@react-native-community/slider";

import NavBar from "../navbar/navbar";
import globalStyles from "../../../styles/global-styles";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  renderPrimaryButtonText,
  renderSecondaryButtonText,
} from "../../../utils/buttons";
import { getUser } from "../../../utils/storage";
import { TUser } from "../../../types/user";
import API_URL from "../../../api/config";
import { TProfile, TProject } from "../../../types/projects";
import RectangleSkeleton from "../skeletons/skeleton-rectangle";
import { TPerformanceReviewPayload } from "../../../types/review";

type PositionsProps = {
  navigation: StackNavigationProp<ParamListBase>;
};

const Performance = ({ navigation }: PositionsProps) => {
  const [projectId, setProjectId] = useState<number | null>(null);
  const [candidateId, setCandidateId] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [score, setScore] = useState(0);
  const [user, setUser] = useState<TUser>();
  const [title, setTitle] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [isLoadingProjects, setLoadingProjects] = useState(true);
  const [isLoadingProfile, setLoadingProfile] = useState(false);

  const [projects, setProjects] = useState<TProject[]>();
  const [profiles, setProfiles] = useState<TProfile[] | null>(null);

  const validateForm = () => {
    if (!title) {
      alert("Ingresa un título a la evaluación");
      return false;
    }
    if (!projectId) {
      alert("Selecciona un proyecto");
      return false;
    }
    if (!candidateId) {
      alert("Selecciona un colaborador");
      return false;
    }
    if (!description) {
      alert("Ingresa la observación o descripción");
      return false;
    }
    return true;
  };

  const sendPerformanceReview = async (
    performance: TPerformanceReviewPayload
  ) => {
    try {
      setLoading(true);
      if (user?.token) {
        const response = await fetch(`${API_URL}/positions/evaluations`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(performance),
          method: "POST",
        });
        if (response.ok) {
          const data = await response.json();
          if (data) {
            Alert.alert(`Evaluación de desempeño guardada`);
            navigation.navigate("PerformanceReviewList");
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

  const handleSubmit = () => {
    if (validateForm()) {
      if (projectId && candidateId) {
        sendPerformanceReview({
          project_id: projectId,
          name: title,
          candidate_id: candidateId,
          score: score,
          observations: description,
        });
      }
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const user = await getUser();
        setUser(user);
        if (user?.token) {
          const response = await fetch(`${API_URL}/customer/projects`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setProjects(data);
          }
        } else {
          Alert.alert(`Usuario no autenticado`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoadingProfile(true);
        setCandidateId(null);
        if (user?.token) {
          const response = await fetch(
            `${API_URL}/positions/closed/${projectId}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setProfiles(data);
          }
        } else {
          Alert.alert(`Usuario no autenticado`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingProfile(false);
      }
    };

    if (projectId) {
      fetchProfiles();
    }
  }, [projectId]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <NavBar navigation={navigation} />
      <Text style={globalStyles.text_title}>Crear evaluación de desempeño</Text>
      <View style={styles.form}>
        <View>
          <Text style={globalStyles.text_label}>Título</Text>
          <TextInput
            onChangeText={(text) => setTitle(text)}
            value={title}
            style={styles.bordered}
            placeholder="Nombre"
          />
          {!title && (
            <Text style={globalStyles.text_error}>El título es requerido</Text>
          )}
        </View>
        <View>
          <Text style={globalStyles.text_label}>Proyecto</Text>
          {isLoadingProjects ? (
            <RectangleSkeleton />
          ) : (
            <View style={styles.bordered}>
              <Picker
                selectedValue={projectId}
                onValueChange={(itemValue) => setProjectId(itemValue)}
                testID="project-picker"
              >
                <Picker.Item
                  label="Selecciona un proyecto"
                  value={null}
                  key={null}
                />
                {projects?.map((project: TProject) => (
                  <Picker.Item
                    label={project.name}
                    value={project.id}
                    key={project.id}
                  />
                ))}
              </Picker>
            </View>
          )}
        </View>
        {profiles?.length == 0 && (
          <Text style={globalStyles.text_label}>
            No hay colaboradores o posiciones activas en el proyecto
            seleccionado
          </Text>
        )}
        {projectId && (isLoadingProjects || profiles != null) && (
          <>
            <View>
              <Text style={globalStyles.text_label}>Colaborador</Text>
              {isLoadingProjects || isLoadingProfile ? (
                <RectangleSkeleton />
              ) : (
                <>
                  <View style={styles.bordered}>
                    <Picker
                      selectedValue={candidateId}
                      onValueChange={(itemValue) => setCandidateId(itemValue)}
                    >
                      <Picker.Item
                        label="Selecciona un colaborador"
                        value={null}
                        key={null}
                      />
                      {profiles?.map((profileItem: TProfile) => (
                        <Picker.Item
                          label={`${profileItem.candidate_name} - ${profileItem.position_name}`}
                          value={profileItem.candidate_id}
                          key={profileItem.candidate_id}
                        />
                      ))}
                    </Picker>
                  </View>
                  {!candidateId && (
                    <Text style={globalStyles.text_error}>
                      Selecciona un colaborador
                    </Text>
                  )}
                </>
              )}
            </View>

            <View>
              <Text style={globalStyles.text_label}>Description</Text>
              <TextInput
                multiline
                numberOfLines={4}
                onChangeText={(text) => setDescription(text)}
                value={description}
                style={styles.bordered}
              />
              {!description && (
                <Text style={globalStyles.text_error}>
                  Observación del desempeño del candidato
                </Text>
              )}
            </View>
            <View>
              <Text style={globalStyles.text_label}>Score (0-100)</Text>
              <Slider
                step={1}
                minimumValue={0}
                maximumValue={100}
                onValueChange={setScore}
                value={score}
                minimumTrackTintColor="#A15CAC"
                maximumTrackTintColor="#EAB5FD"
                thumbTintColor="#A15CAC"
                style={{ width: "100%", height: 40 }}
              />
              <View style={styles.score}>
                <Text>{score}</Text>
              </View>
            </View>
            <View style={styles.buttons}>
              <Pressable
                style={globalStyles.button_outlined}
                onPress={() => navigation.navigate("Home")}
              >
                {renderSecondaryButtonText("CANCEL")}
              </Pressable>
              <Pressable
                style={globalStyles.button_primary}
                onPress={() => handleSubmit()}
              >
                {isLoading ? (
                  <ActivityIndicator />
                ) : (
                  renderPrimaryButtonText("GUARDAR")
                )}
              </Pressable>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    backgroundColor: "#fff",
  },
  contentContainer: {
    gap: 20,
    justifyContent: "space-around",
  },
  form: {
    padding: 30,
    gap: 40,
  },
  bordered: {
    borderBottomColor: "#B4B4B4",
    borderBottomWidth: 2,
  },
  score: {
    alignItems: "center",
    fontSize: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Performance;
