import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type ChipProps = {
  label: string;
  backgroundColor?: string;
};

const Chip = ({ label, backgroundColor }: ChipProps) => {
  return (
    <View style={[styles.chipContainer, { backgroundColor }]}>
      <Text style={styles.chipText}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#AEEE",
    borderRadius: 16,
    margin: 4,
  },
  chipText: {
    color: "#000",
    fontSize: 14,
    marginRight: 4,
  },
  deleteIcon: {
    // If using an image or vector icon, adjust the size here accordingly
    padding: 4,
    marginLeft: 4,
  },
  chipDeleteText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Chip;
