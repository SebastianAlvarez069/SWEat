import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { createSession } from "../api";

export default function StartSessionScreen({ route, navigation }) {
  const { userId } = route.params;
  const [note, setNote] = useState("");

  async function handleStart() {
    try {
      const session = await createSession(note);
      navigation.replace("AddSet", {
        userId,
        sessionId: session.id,
      });
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Start Workout</Text>
      <Text style={styles.label}>Note (optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Chest day, legs, etc."
        value={note}
        onChangeText={setNote}
      />
      <Button title="Start Session" onPress={handleStart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#020617" },
  title: { fontSize: 22, fontWeight: "bold", color: "white", marginBottom: 16 },
  label: { color: "#E5E7EB", marginBottom: 4 },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 16,
  },
});