import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { authExchange } from "@urql/exchange-auth";
import {
  Provider,
  createClient,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  makeOperation,
} from "urql";
import LoginView from "./views/LoginView";
import AuthorizedView from "./views/AuthorizedView";
import { useAuthStore } from "./store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
  Login: undefined;
  Authorized: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginView} />
      <Stack.Screen name="Authorized" component={AuthorizedView} />
    </Stack.Navigator>
  );
}

type AuthState = {
  authToken: string;
};

export default function App() {
  const authToken = useAuthStore((state) => state.authToken);

  // recreate client and especially the internal cache every time the authentication state changes
  const urqlClient = useMemo(() => {
    return createClient({
      url: "http://localhost:4001",
      requestPolicy: "cache-and-network",
      exchanges: [
        dedupExchange,
        cacheExchange,
        authExchange<AuthState>({
          getAuth: async ({ authState }) => {
            const authToken = await AsyncStorage.getItem("authToken");
            if (!authState) {
              if (authToken) {
                return { authToken };
              }
            }
            return null;
          },
          addAuthToOperation: ({ authState, operation }) => {
            if (!authState || !authState.authToken) {
              return operation;
            }
            const fetchOptions =
              typeof operation.context.fetchOptions === "function"
                ? operation.context.fetchOptions()
                : operation.context.fetchOptions || {};
            return makeOperation(operation.kind, operation, {
              ...operation.context,
              fetchOptions: {
                ...fetchOptions,
                headers: {
                  ...fetchOptions.headers,
                  Authorization: `Bearer ${authState.authToken}`,
                },
              },
            });
          },
        }),
        fetchExchange,
      ],
    });
  }, [authToken]);

  return (
    <Provider value={urqlClient}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
