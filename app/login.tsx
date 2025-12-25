import {
  LoginUserMutation,
  LoginUserMutationVariables,
} from "@/graphql_interfaces/auth.interface";
import { useAuthStore } from "@/stores/auth.store";
import { useNotificationStore } from "@/stores/notification.store";
import { registerForPushNotificationsAsync } from "@/utils/registerForPushNotificationAsync";
import { MaterialIcons } from "@expo/vector-icons";
import { gql } from "@urql/core";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useMutation } from "urql";

const LOGIN = gql`
  mutation LoginUser($rollNo: Float!, $password: String!) {
    loginUser(rollno: $rollNo, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

export default function Login() {
  const { setLoggedIn, setTokens } = useAuthStore((state) => state);
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // <-- New state
  const [result, loginUser] = useMutation<
    LoginUserMutation,
    LoginUserMutationVariables
  >(LOGIN);
  const router = useRouter();
  const { setExpoPushToken, setNotificationError } = useNotificationStore(
    (state) => state
  );
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleLogin = async () => {
    if (!rollNo || !password) return;

    const variables = { rollNo: parseFloat(rollNo), password };
    const response = await loginUser(variables);

    if (response.data) {
      const { accessToken, refreshToken } = response.data.loginUser;

      // Save tokens securely
      SecureStore.setItemAsync("accessToken", accessToken);
      SecureStore.setItemAsync("refreshToken", refreshToken);
      if (Platform.OS === "web" && typeof localStorage !== "undefined") {
        try {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
        } catch {}
      }

      // Also update the tokens in the global auth store
      setTokens(accessToken, refreshToken);

      //Update the global loggedIn status to ensure that you can navigate to protected routes.
      setLoggedIn(true);

      // Get the expo push token and set it to the global user store;
      const token = await registerForPushNotificationsAsync();
      if (token) {
        setExpoPushToken(token);
      }

      setErrorMessage("");
    } else if (response.error) {
      console.error("Login failed", response.error);
      // Display invalid credentials message
      setErrorMessage(
        "Invalid credentials. Please check your Roll No and Password."
      );
    }

    setPassword("");
    setRollNo("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.contentWrapper}>
            <Text style={styles.title}>
              <Text style={styles.accentTitle}>Welcome</Text> to your class hub
            </Text>
            <Text style={styles.subtitle}>
              Track. Share. Collaborate and Grow.
            </Text>

            <View style={styles.formWrapper}>
              <TextInput
                value={rollNo}
                onChangeText={setRollNo}
                placeholder="Roll No"
                placeholderTextColor="#9CA3AF"
                style={styles.input}
              />

              <View style={styles.inputWrapper}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={secure}
                  style={styles.inputM}
                />
                <TouchableOpacity onPress={() => setSecure(!secure)}>
                  <MaterialIcons
                    name={secure ? "visibility-off" : "visibility"}
                    size={20}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              </View>

              {/* Display error message */}
              {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
              ) : null}

              <TouchableOpacity
                touchSoundDisabled={false}
                style={styles.forgotWrapper}
                onPress={() => router.replace("/forgot_password")}
              >
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                touchSoundDisabled={false}
                style={styles.forgotWrapper}
                onPress={() => router.replace("/profile")}
              >
                <Text style={styles.forgotText}>profile</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handleLogin}
                style={styles.loginButton}
              >
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>

          {!keyboardVisible && (
            <View style={styles.iconWrapper}>
              <Image
                source={require("../assets/images/logo.png")}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    paddingHorizontal: 32,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  contentWrapper: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 34,
    marginBottom: 10,
    fontFamily: "DMSerifDisplay-Regular",
    color: "#FFFFFF",
  },
  accentTitle: {
    fontSize: 34,
    marginBottom: 10,
    fontFamily: "DMSerifDisplay-Regular",
    color: "#19aa59",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "Poppins-Regular",
    color: "#FFFFFF",
  },
  formWrapper: {
    width: "100%",
    marginTop: 30,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2D2D2D",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  inputM: {
    flex: 1,
    color: "#FFFFFF",
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  input: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#2D2D2D",
    fontFamily: "Poppins-Regular",
    color: "#FFF",
  },
  forgotWrapper: {
    alignItems: "flex-end",
    marginBottom: 20,
    marginTop: 5,
  },
  forgotText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    fontWeight: "500",
    color: "#D1D5DB",
    textDecorationLine: "underline",
  },
  loginButton: {
    width: "100%",
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#19aa59",
  },
  loginText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "DMSerifDisplay-Regular",
  },
  iconWrapper: {
    position: "absolute",
    bottom: 20,
    alignItems: "center",
  },
  errorText: {
    color: "#F87171", // red
    fontSize: 14,
    marginBottom: 12,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
});
