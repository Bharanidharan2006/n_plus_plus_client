import {
  ChangePasswordMutation,
  ChangePasswordMutationVariables,
} from "@/graphql_interfaces/auth.interface";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
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
import { gql, useMutation } from "urql";

const FORGOT_PASSWORD = gql`
  mutation ChangePassword($input: changePasswordInput!) {
    changePassword(input: $input)
  }
`;

export default function ForgotPassword() {
  const [masterPassword, setMasterPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [masterPasswordError, setMasterPasswordError] = useState("");
  const [generalError, setGeneralError] = useState(""); // <-- new state
  const [result, changePassword] = useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(FORGOT_PASSWORD);
  const [secure, setSecure] = useState(true);
  const [rollNo, setRollNo] = useState("");
  const router = useRouter();

  const handleSubmission = async () => {
    setGeneralError(""); // reset before new request

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    const variables = {
      input: {
        masterPassword,
        password: confirmPassword,
        rollno: parseFloat(rollNo),
      },
    };

    const response = await changePassword(variables);

    if (response.error || response.data?.changePassword === false) {
      setGeneralError("Invalid credentials");
      return;
    }

    if (response.data?.changePassword) {
      router.replace("/login");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1, width: "100%" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.contentWrapper}>
            <Text style={styles.title}>
              Lost between <Text style={styles.accentTitle}>assignments?</Text>
            </Text>
            <Text style={styles.subtitle}>
              Passwords can get lost too. Let’s set a new one!
            </Text>

            <View style={styles.formWrapper}>
              <TextInput
                value={rollNo}
                onChangeText={setRollNo}
                placeholder="Roll No"
                placeholderTextColor="#9CA3AF"
                style={styles.input}
              />

              {/* Master Password with show/hide */}
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.inputM}
                  placeholder="Master Password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={secure}
                  value={masterPassword}
                  onChangeText={(text) => {
                    setMasterPassword(text);
                    if (masterPasswordError) setMasterPasswordError("");
                  }}
                />
                <TouchableOpacity onPress={() => setSecure(!secure)}>
                  <MaterialIcons
                    name={secure ? "visibility-off" : "visibility"}
                    size={20}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              </View>
              {masterPasswordError ? (
                <Text style={styles.errorText}>{masterPasswordError}</Text>
              ) : null}

              {/* Other password inputs */}
              <TextInput
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (passwordError) setPasswordError("");
                }}
                placeholder="New Password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                style={styles.input}
              />
              <TextInput
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (passwordError) setPasswordError("");
                }}
                placeholder="Confirm Password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                style={styles.input}
              />
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}

              {/* General error */}
              {generalError ? (
                <Text style={styles.errorText}>{generalError}</Text>
              ) : null}

              <TouchableOpacity
                onPress={handleSubmission}
                style={styles.loginButton}
              >
                <Text style={styles.loginText}>Confirm</Text>
              </TouchableOpacity>

              <TouchableOpacity
                touchSoundDisabled={false}
                style={styles.forgotWrapper}
                onPress={() => router.replace("/login")}
              >
                <Text style={styles.forgotText}>Go to Login</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Logo at the bottom */}
          <View style={styles.iconWrapper}>
            <Image
              source={require("../assets/images/logo.png")}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          </View>
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
    marginBottom: 40,
  },
  title: {
    fontSize: 34,
    marginBottom: 10,
    fontFamily: "DMSerifDisplay-Regular",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#FFFFFF",
  },
  formWrapper: {
    width: "100%",
    marginTop: 30,
  },
  forgotWrapper: {
    alignItems: "center",
    marginTop: 20,
  },
  forgotText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    fontWeight: "500",
    color: "#D1D5DB",
    textDecorationLine: "underline",
  },
  accentTitle: {
    fontSize: 34,
    marginBottom: 10,
    fontFamily: "DMSerifDisplay-Regular",
    color: "#19aa59",
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
  loginButton: {
    width: "100%",
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#19aa59",
    marginTop: 10,
  },
  loginText: {
    fontSize: 16,
    color: "#000",
    fontFamily: "DMSerifDisplay-Regular",
  },
  iconWrapper: {
    position: "absolute",
    bottom: 20,
    alignItems: "center",
  },
  errorText: {
    color: "#FF4D4F",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    marginBottom: 8,
    marginLeft: 4,
  },
});
