import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem("@token_key", token);
  } catch (e) {
    // Handle saving error
    console.error(e);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("@token_key");
    if (token !== null) {
      return token;
    }
  } catch (e) {
    // Handle fetching error
    console.error(e);
  }

  return null;
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("@token_key");
  } catch (e) {
    // Handle removal error
    console.error(e);
  }
};
