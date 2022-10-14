import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Home({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#1429eb",
        justifyContent: "center",
      }}
    >
      <View style={{ flex: 0.2, justifyContent: "space-between" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Text style={styles.buttonText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Voice")}>
          <Text style={styles.buttonText}>Voice</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    backgroundColor: "#e1bc1e",
    padding: 10,
    width: 200,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 30,
    color: "white",
  },
});
