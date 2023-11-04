import { useEffect, useRef } from "react";
import { Animated, View, StyleSheet, Easing } from "react-native";

const AnimatedSkeleton = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const runAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    runAnimation();
  }, []);

  const interpolatedColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#F5F5F5", "#e0e0e0"],
  });

  return (
    <Animated.View
      style={{ ...styles.skeletonCard, backgroundColor: interpolatedColor }}
    >
      <View style={styles.skeletonAvatar} />
      <View style={styles.skeletonLine} />
      <View style={styles.skeletonLine} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  skeletonCard: {
    borderRadius: 4,
    padding: 16,
    marginVertical: 16,
  },
  skeletonAvatar: {
    width: 60,
    height: 60,
    backgroundColor: "#F5F5F5",
    borderRadius: 30,
    marginBottom: 10,
  },
  skeletonLine: {
    height: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default AnimatedSkeleton;
