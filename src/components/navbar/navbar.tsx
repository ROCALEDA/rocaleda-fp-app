import { useEffect, useState } from "react";
import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, Alert, Image, StyleSheet, TouchableOpacity } from "react-native";

import { getUser, removeUser } from "../../../utils/storage";

type NavBarProps = {
  navigation: StackNavigationProp<ParamListBase>;
};

const LOGOS = {
  "1": require("../../../assets/logo_admin.jpeg"),
  "2": require("../../../assets/logo_empresas.jpeg"),
  "3": require("../../../assets/logo_candidatos.jpeg"),
  default: require("../../../assets/logo.png"),
};
type LogoKeys = keyof typeof LOGOS;

const NavBar = ({ navigation }: NavBarProps) => {
  const [roleId, setRoleId] = useState<string>("");

  useEffect(() => {
    const setUserData = async () => {
      try {
        const user = await getUser();
        if (user?.token && user.role) {
          setRoleId(user.role);
        } else {
          Alert.alert(`Usuario no autenticado`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    setUserData();
  }, []);

  function getLogo() {
    const key = roleId as LogoKeys;
    return LOGOS[key] || LOGOS.default;
  }

  const handleLogoutPress = () => {
    removeUser();
    navigation.navigate("Login");
  };

  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        style={styles.navItem}
        testID="back-button"
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require("../../../assets/arrow_back.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
      <View style={styles.navItem}>
        <Image
          source={getLogo()}
          style={styles.logo}
          resizeMode="contain"
          testID="logo-image"
        />
      </View>

      <TouchableOpacity
        style={styles.navItem}
        onPress={handleLogoutPress}
        testID="logout-button"
      >
        <Image
          source={require("../../../assets/logout.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    backgroundColor: "#ffffff",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
  },
  navButtonText: {
    fontSize: 16,
  },
  logo: {
    height: 40,
    width: 200,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default NavBar;
