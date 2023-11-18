import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Alert,
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
import { TCandidate, TUser } from "../../../types/user";
import API_URL from "../../../api/config";
import { TPosition, TProject } from "../../../types/projects";
import RectangleSkeleton from "../skeletons/skeleton-rectangle";
import { TTechnicalTestPayload } from "../../../types/review";

type PositionsProps = {
  navigation: StackNavigationProp<ParamListBase>;
};

const TechnicalTest = ({ navigation }: PositionsProps) => {
  const [currentProject, setCurrentProject] = useState<TProject | null>(null);
  const [positionId, setPositionId] = useState<number | null>(null);

  const [candidateId, setCandidateId] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [score, setScore] = useState(0);
  const [user, setUser] = useState<TUser>();

  const [isLoading, setLoading] = useState(false);
  const [isLoadingProjects, setLoadingProjects] = useState(true);
  const [isLoadingCandidates, setLoadingCandidates] = useState(false);

  const [projects, setProjects] = useState<TProject[]>();
  const [candidates, setCandidates] = useState<TCandidate[] | null>(null);

  const validateForm = () => {
    if (!currentProject?.id) {
      alert("Please select a project");
      return false;
    }
    if (!positionId) {
      alert("Please select a position");
      return false;
    }
    if (!candidateId) {
      alert("Please select a candidate");
      return false;
    }
    if (!description) {
      alert("Observations cannot be empty");
      return false;
    }
    return true;
  };

  const sendTechnicalTest = async (
    positionId: number,
    technicalTest: TTechnicalTestPayload
  ) => {
    try {
      setLoading(true);
      if (user?.token) {
        const response = await fetch(
          `${API_URL}/positions/${positionId}/tests`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(technicalTest),
            method: "POST",
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("RESPONSE DATA", data);
          if (data) {
            Alert.alert(`Prueba técnica guardada`);
            navigation.navigate("Home");
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
      if (candidateId && positionId) {
        sendTechnicalTest(positionId, {
          candidate_id: candidateId,
          name: "Technical Test",
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
    const fetchCandidates = async () => {
      try {
        setLoadingCandidates(true);
        setCandidateId(null);
        if (user?.token) {
          const response = await fetch(
            `${API_URL}/positions/${positionId}/candidates`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setCandidates(data);
          }
        } else {
          Alert.alert(`Usuario no autenticado`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingCandidates(false);
      }
    };

    if (positionId) {
      fetchCandidates();
    }
  }, [positionId]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <NavBar navigation={navigation} />
      <Text style={globalStyles.text_title}>Resultado de prueba técnica</Text>
      <View style={styles.form}>
        <View>
          <Text style={globalStyles.text_label}>Proyecto</Text>
          {isLoadingProjects ? (
            <RectangleSkeleton />
          ) : (
            <View style={styles.bordered}>
              <Picker
                selectedValue={currentProject?.id}
                onValueChange={(itemId) => {
                  if (itemId != null && projects) {
                    const selectedProject = projects.find(
                      (project) => project.id === itemId
                    );
                    setCurrentProject(selectedProject || null);
                  }
                }}
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
        {currentProject?.is_team_complete && (
          <Text style={globalStyles.text_label}>
            No hay posiciones abiertas en el proyecto seleccionado
          </Text>
        )}
        {currentProject && (
          <>
            <View>
              <Text style={globalStyles.text_label}>Posición</Text>

              <>
                <View style={styles.bordered}>
                  <Picker
                    testID="position-picker"
                    selectedValue={positionId}
                    onValueChange={(itemId) => setPositionId(itemId)}
                  >
                    <Picker.Item
                      label="Selecciona una posición"
                      value={null}
                      key={null}
                    />
                    {currentProject.positions?.map(
                      (positionItem: TPosition) => (
                        <Picker.Item
                          label={positionItem.name}
                          value={positionItem.id}
                          key={positionItem.id}
                        />
                      )
                    )}
                  </Picker>
                </View>
                {!positionId && (
                  <Text style={globalStyles.text_error}>
                    Selecciona una posición
                  </Text>
                )}
              </>
            </View>
            {candidates?.length === 0 ? (
              <Text style={globalStyles.text_label}>
                No hay candidatos asociados a la posición seleccionada
              </Text>
            ) : (
              <>
                <View>
                  <Text style={globalStyles.text_label}>Candidato</Text>
                  {isLoadingCandidates ? (
                    <RectangleSkeleton />
                  ) : (
                    <>
                      <View style={styles.bordered}>
                        <Picker
                          testID="candidate-picker"
                          selectedValue={candidateId}
                          onValueChange={(itemId) => setCandidateId(itemId)}
                        >
                          <Picker.Item
                            label="Selecciona un candidato"
                            value={null}
                            key={null}
                          />
                          {candidates?.map((candidateItem: TCandidate) => (
                            <Picker.Item
                              label={candidateItem.fullname}
                              value={candidateItem.user_id}
                              key={candidateItem.user_id}
                            />
                          ))}
                        </Picker>
                      </View>
                      {!candidateId && (
                        <Text style={globalStyles.text_error}>
                          Selecciona un candidato
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
                    placeholder="Observación"
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
                      renderPrimaryButtonText("SUBMIT")
                    )}
                  </Pressable>
                </View>
              </>
            )}
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

export default TechnicalTest;
