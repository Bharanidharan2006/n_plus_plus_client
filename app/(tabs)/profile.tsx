import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useUserStore } from "@/stores/user.store";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
export default function Profile() {
  const user = useUserStore((state) => state.user);
  const getAvatar = (seed: string) =>
    `https://api.dicebear.com/7.x/notionists/png?seed=${encodeURIComponent(
      seed
    )}`;
  const avatar = getAvatar(user?.userName ? user.userName : "defaultPerson"); // change with name
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scrollContainer]}>
        <View style={{ width: "100%" }}>
          <View
            style={{
              width: "100%",
              padding: 10,
              backgroundColor: "#111111ff",
              borderRadius: 15,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <View style={{ paddingHorizontal: 10 }}>
                <Image
                  style={{
                    borderColor: "#19aa59",
                    width: 100,
                    height: 100,
                    backgroundColor: "",
                    borderRadius: 50,
                    borderWidth: 2,
                  }}
                  source={{ uri: avatar }}
                />
              </View>
              <View
                style={{
                  paddingLeft: 30,
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={[
                    {
                      fontFamily: "DMSerifDisplay-Regular",
                      fontSize: 22,
                      color: "#19aa59",
                    },
                  ]}
                >
                  {user?.userName}{" "}
                  {
                    //change with name
                  }
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    paddingVertical: 10,
                    color: "#fff",
                  }}
                >
                  {user?.rollNo}{" "}
                  {
                    //change with roll
                  }
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            width: "100%",
            backgroundColor: "#111111ff",
            borderRadius: 10,
          }}
        >
          <View style={{ paddingLeft: 20, paddingTop: 20 }}>
            <Text
              style={{
                fontFamily: "DMSerifDisplay-Regular",
                color: "#19aa59",
                fontSize: 26,
              }}
            >
              Personal Info
            </Text>
          </View>
          <View
            style={{
              padding: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <View
              style={{
                marginVertical: 5,
                display: "flex",
                width: "100%",
                flexDirection: "row",
                paddingVertical: 5,
                alignItems: "center",
              }}
            >
              <View style={{ justifyContent: "flex-start", paddingLeft: 15 }}>
                <Ionicons
                  name="mail-outline"
                  size={24}
                  style={{ color: "white" }}
                />
              </View>
              <View style={{ paddingLeft: 15 }}>
                {/* <Text style={{color:"#9CA3AF" , fontFamily:"Poppins-Light"}}>
                                    Mail
                                </Text> */}
                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 18,
                    color: "#fff",
                  }}
                >
                  {user?.email}
                </Text>
              </View>
            </View>

            <View
              style={{
                marginVertical: 6,
                display: "flex",
                width: "100%",
                flexDirection: "row",
                paddingVertical: 5,
                alignItems: "center",
              }}
            >
              <View style={{ justifyContent: "flex-start", paddingLeft: 15 }}>
                <Ionicons
                  name="phone-portrait-outline"
                  size={24}
                  color="white"
                />
              </View>
              <View style={{ paddingLeft: 15 }}>
                {/* <Text style={{color:"#9CA3AF" , fontFamily:"Poppins-Light"}}>
                                    Phone
                                </Text> */}
                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 18,
                    color: "#fff",
                  }}
                >
                  {user?.phoneNo}
                </Text>
              </View>
            </View>

            <View
              style={{
                marginVertical: 6,
                display: "flex",
                width: "100%",
                flexDirection: "row",
                paddingVertical: 5,
                alignItems: "center",
              }}
            >
              <View style={{ justifyContent: "flex-start", paddingLeft: 15 }}>
                <Ionicons name="school" size={24} style={{ color: "white" }} />
              </View>
              <View style={{ paddingLeft: 15 }}>
                {/* <Text style={{color:"#9CA3AF" , fontFamily:"Poppins-Light"}}>
                                    Current Sem
                                </Text> */}
                <Text style={{ fontFamily: "", fontSize: 18, color: "#fff" }}>
                  {user?.currentSemester}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 20, width: "100%" }}>
          <TouchableOpacity
            style={{ borderRadius: 6, backgroundColor: "#19aa59" }}
            onPress={() => router.replace("/(app)/(shared)/attendance")}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Text style={{ padding: 10, fontFamily: "Poppins-Regular" }}>
                Get Attendance Analysis
              </Text>
              <Ionicons name="arrow-forward" size={25} />
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={() => router.replace("/login")}>
            <Text>Go HOME</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  avatarImage: {
    width: 100,
    height: 100,
  },
  profileText: { color: "#FFFFFF", fontFamily: "Poppins-Regular", padding: 5 },
  profileHeader: {
    flexDirection: `row`,
    justifyContent: "space-evenly",
  },
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    paddingHorizontal: 32,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 50,
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
