import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Button, StyleSheet } from "react-native";
import LabelInput from "../components/LabelInput";
import { useMutation } from "urql";
import { useAuthStore } from "../store/authStore";
import InfoAlert from "../components/InfoAlert";

const loginMutation = `
  mutation login($username: String!, $password: String!) {
    login(input: {
      username: $username,
      password: $password
    }) {
      authToken
    }
  }
`;

export default function LoginView({ navigation }) {
  const [username, setUsername] = useState("user");
  const [password, setPassword] = useState("pass");
  const [error, setError] = useState("");
  const setAuthToken = useAuthStore((state) => state.setAuthToken);
  const authToken = useAuthStore((state) => state.authToken);

  const [, executeLoginMutation] = useMutation(loginMutation);

  const redirectOnLogin = async () => {
    const authToken = await AsyncStorage.getItem("authToken");
    if (authToken) {
      navigation.navigate("Authorized");
    }
  };

  const login = async () => {
    const response = await executeLoginMutation({
      username,
      password,
    });
    console.log({ response });
    if (response.error) {
      setError(response.error.message);
    } else if (response.data) {
      console.log({ data: response.data });
      const authToken = response.data.login.authToken;
      await setAuthToken(authToken);
      navigation.navigate("Authorized");
      setError("");
    }
  };

  useEffect(() => {
    redirectOnLogin();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.form}>
        {error !== "" && (
          <InfoAlert text={error} style={styles.alert}></InfoAlert>
        )}
        <LabelInput
          label="Email"
          placeholder="email@example.com"
          onChangeText={setUsername}
          value={username}
          keyboardType="email-address"
        />
        <LabelInput
          label="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={false}
        />
        <Button
          title="Log in"
          onPress={() => login()}
          disabled={!(username !== "" && password !== "")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  alert: {
    paddingBottom: 8,
  },
  form: {
    justifyContent: "flex-start",
  },
  label: {
    paddingBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
});
