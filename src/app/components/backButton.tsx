import { router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export default function backButton() {
  return (
    <Pressable onPress={() => router.back()} style={styles.closeButton}>
      <Text style={styles.closeButtonText}> X </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    width: 50,
    height: 50,
    backgroundColor: "#da0507",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  closeButtonText: {
    fontSize: 24,
    color: "white",
  },
});
