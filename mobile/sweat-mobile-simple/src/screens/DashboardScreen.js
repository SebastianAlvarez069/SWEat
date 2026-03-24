import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";

import {
  getDashboardSummary,
  getRecommendedTasks,
  createSession,
} from "../api"; // <-- IMPORT createSession HERE

export default function DashboardScreen({ route, navigation }) {
  const { userId } = route.params;
  const [summary, setSummary] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      setLoading(true);
      const [summaryRes, tasksRes] = await Promise.all([
        getDashboardSummary(userId),
        getRecommendedTasks(userId),
      ]);
      setSummary(summaryRes);
      setTasks(tasksRes.recommended_tasks || []); // <-- updated key
    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading || !summary) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 8 }}>Loading dashboard...</Text>
      </View>
    );
  }

  async function handleStartWorkout() {
    try {
      // Create a session with an empty note
      const session = await createSession("");

      // Navigate straight to AddSet screen
      navigation.navigate("AddSet", {
        sessionId: session.id,
        userId,
      });
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi, {summary.greeting_name} 👋</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Steps Today</Text>
        <Text style={styles.bigNumber}>{summary.steps_today}</Text>
        <Text style={styles.subtitle}>
          Goal: {summary.steps_goal} ({summary.percent_complete}%)
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Calories Burned</Text>
        <Text style={styles.bigNumber}>{summary.calories_burned}</Text>
        <Text style={styles.subtitle}>
          Activity level: {summary.activity_level} | Goal: {summary.main_goal}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today's Tasks</Text>
        <FlatList
          data={tasks}
          keyExtractor={(item, index) => `${item.task_name}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.taskRow}>
              <Text style={styles.taskTitle}>{item.task_name}</Text>
              <Text style={styles.taskDesc}>{item.description}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.subtitle}>No tasks for today.</Text>
          }
        />
      </View>

      <Button title="Start Workout Session" onPress={handleStartWorkout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#020617" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", color: "white", marginBottom: 16 },
  card: {
    backgroundColor: "#111827",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardTitle: { color: "#93C5FD", fontWeight: "600", marginBottom: 4 },
  bigNumber: { fontSize: 28, fontWeight: "bold", color: "white" },
  subtitle: { color: "#D1D5DB", marginTop: 4 },
  taskRow: { marginBottom: 8 },
  taskTitle: { color: "white", fontWeight: "600" },
  taskDesc: { color: "#D1D5DB", fontSize: 12 },
});