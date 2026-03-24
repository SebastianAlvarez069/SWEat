import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { login } from "../api";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const data = await login(email, password);
      navigation.replace("Dashboard", {
        userId: data.user_id,
        token: data.access_token,
      });
    } catch (err) {
      Alert.alert("Login Failed", err.message);
    }
  }

  return (
    <View style={styles.container}>
      {/* --- SWEat Logo --- */}
      <Image
        source={require("../../assets/img/sweatlogo.png")}
        style={styles.logo}
      />

      {/* --- TEXT INPUTS --- */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#FFC7DE"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#FFC7DE"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* --- LOGIN BUTTON --- */}
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOG IN</Text>
      </TouchableOpacity>

      {/* --- Bottom Links --- */}
      <View style={styles.bottomRow}>
        <TouchableOpacity>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
          <Text style={styles.link}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const PINK = "#FF4FA3";
const DARK = "#0D0D0D";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },

  logo: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    marginBottom: 40,
  },

  input: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: PINK,
    color: "white",
    fontSize: 16,
    marginBottom: 18,
  },

  loginBtn: {
    backgroundColor: PINK,
    width: "100%",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
    shadowColor: PINK,
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },

  loginText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },

  link: {
    color: "#FFC7DE",
    textDecorationLine: "underline",
  },
});
