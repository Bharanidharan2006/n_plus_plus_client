import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Tabs, usePathname } from "expo-router";

// TODO - 24/12/25
// [ ] - When clicking view attendance record btn on the homepage, then choosing any subject you will land on the attendance record for
//a particular subject but when you navigate back using < you end up in attendance tab and if you navigate using back button, you end
//up in home page as expected but when you go to attendance tab instead of attendance/index , attendance/record/index is displayed.

export default function TabLayout() {
  const pathName = usePathname();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#19AA59",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1D1D1D",
          paddingBottom: 10,
        },
        sceneStyle: {
          backgroundColor: "#1D1D1D",
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          popToTopOnBlur: true,
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
          popToTopOnBlur: true,
          tabBarIcon: ({ focused, color }) => (
            <AntDesign name="carryout" size={24} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            if (pathName !== "/(tabs)/attendance") {
              router.replace("/(tabs)/attendance");
            }
          },
        }}
      />
    </Tabs>
  );
}
