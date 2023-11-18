import { useEffect, useRef } from "react";
import { Animated, View, StyleSheet } from "react-native";
import { runAnimation } from "../../../utils/animations";

const RectangleSkeleton = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    runAnimation(animatedValue);
  }, []);

  const interpolatedColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#F5F5F5", "#e0e0e0"],
  });

  return (
    <Animated.View
      testID="animatedSkeleton"
      style={{ ...styles.skeletonCard, backgroundColor: interpolatedColor }}
    ></Animated.View>
  );
};

const styles = StyleSheet.create({
  skeletonCard: {
    borderRadius: 4,
    padding: 16,
    marginVertical: 16,
  },
  skeletonLine: {
    height: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default RectangleSkeleton;
