import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { addSet, getSession } from "../api";

export default function AddSetScreen({ route, navigation }) {
  const { userId, sessionId } = route.params;

  const [exercise, setExercise] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState([]);

  async function refreshSets() {
    try {
      const session = await getSession(sessionId);
      setSets(session.sets);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    refreshSets();
  }, []);

  async function handleAddSet() {
    if (!exercise || !reps || !weight) {
      Alert.alert("Missing info", "Please enter exercise, reps, and weight.");
      return;
    }

    try {
      await addSet(sessionId, {
        exercise,
        reps: Number(reps),
        weight: Number(weight),
      });

      setExercise("");
      setReps("");
      setWeight("");

      refreshSets();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Session</Text>

      {/* List of sets */}
      <FlatList
        data={sets}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<Text style={styles.subtitle}>Your Sets</Text>}
        renderItem={({ item }) => (
          <View style={styles.setItem}>
            <Text style={styles.setText}>
              {item.exercise}: {item.reps} reps × {item.weight} lbs
            </Text>
          </View>
        )}
      />

      {/* Add new set */}
      <Text style={styles.subtitle}>Add a Set</Text>

      <TextInput
        style={styles.input}
        placeholder="Exercise (e.g., Bench Press)"
        value={exercise}
        onChangeText={setExercise}
      />

      <TextInput
        style={styles.input}
        placeholder="Reps"
        keyboardType="numeric"
        value={reps}
        onChangeText={setReps}
      />

      <TextInput
        style={styles.input}
        placeholder="Weight (lbs)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />

      <Button title="Add Set" onPress={handleAddSet} />

      <View style={{ marginTop: 20 }}>
        <Button
          title="Finish Workout"
          color="red"
          onPress={() => navigation.navigate("Dashboard", { userId })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#020617" },
  title: { fontSize: 26, fontWeight: "bold", color: "white", marginBottom: 16 },
  subtitle: { color: "#93C5FD", marginVertical: 10, fontSize: 16 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  setItem: {
    backgroundColor: "#1E293B",
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
  },
  setText: { color: "#F1F5F9", fontSize: 15 },
});