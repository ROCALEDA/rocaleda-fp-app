import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeUser = async (token: string, role_id: number) => {
  try {
    await AsyncStorage.setItem("@token_key", token);
    await AsyncStorage.setItem("@role_key", role_id.toString());
  } catch (e) {
    // Handle saving error
    console.error(e);
  }
};

export const getUser = async () => {
  try {
    const token = await AsyncStorage.getItem("@token_key");
    const role = await AsyncStorage.getItem("@role_key");

    if (token !== null && role !== null) {
      return {
        token,
        role,
      };
    }
  } catch (e) {
    console.error(e);
  }

  return null;
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem("@token_key");
    await AsyncStorage.removeItem("@role_key");
  } catch (e) {
    // Handle removal error
    console.error(e);
  }
};

export const storeToken = async (token: string) => {
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
