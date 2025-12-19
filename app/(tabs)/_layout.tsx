import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#19AA59",
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#1D1D1D",
          paddingTop: 10,
          marginBottom: 10,
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              size={28}
              name={`home${focused ? "" : "-outline"}`}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="attendance"
        options={{
          title: "Attendance",
          tabBarIcon: ({ focused, color }) => (
            <AntDesign name="carry-out" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
