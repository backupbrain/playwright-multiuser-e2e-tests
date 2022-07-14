import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { useMutation, useQuery } from "urql";
import LoggedInUserListItem from "../components/LoggedInUserListItem";
import { useAuthStore } from "../store/authStore";

const logoutMutation = `
  mutation logout {
    logout {
      success
    }
  }
`;

const loggedInUsersQuery = `
  query loggedInUsers {
    loggedInUsers{
      usernames
    }
  }
`;

export default function AuthorizedView({ navigation }) {
  const clearAuthToken = useAuthStore((state) => state.clearAuthToken);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [, executeLogoutMutation] = useMutation(logoutMutation);
  const [executeLoggedInUsersQuery, refetchLoggedInUsersQuery] = useQuery({
    query: loggedInUsersQuery,
  });
  const REFETCH_INTERVAL_MS = 1000;
  const refetchTimer = useRef<any>(null);

  const verifyAuthorization = async () => {
    const currentAuthToken = await AsyncStorage.getItem("authToken");
    if (!currentAuthToken) {
      navigation.navigate("Login");
    }
    setAuthToken(currentAuthToken);
    refetchLoggedInUsersQuery();
  };

  const logout = async () => {
    await executeLogoutMutation();
    await clearAuthToken();
    navigation.navigate("Login");
  };

  useEffect(() => {
    verifyAuthorization();
    refetchTimer.current = setInterval(() => {
      refetchLoggedInUsersQuery();
    }, REFETCH_INTERVAL_MS);
    return () => {
      clearInterval(refetchTimer.current);
    };
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Logged in with auth token {authToken}</Text>

      <Button onPress={logout} title="Log out" />

      <Text style={styles.label}>Logged In Users</Text>
      {executeLoggedInUsersQuery.data?.loggedInUsers && (
        <FlatList
          // ItemSeparatorComponent={<View style={styles.separator} />}
          data={executeLoggedInUsersQuery.data.loggedInUsers.usernames}
          renderItem={({ item, index, separators }) => (
            <LoggedInUserListItem username={item} />
          )}
          keyExtractor={(item: string) => item}
          refreshing={executeLoggedInUsersQuery.fetching}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    paddingBottom: 8,
  },
  separator: {
    borderBottomWidth: 1,
  },
});
