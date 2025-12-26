import React from "react";
import { Text, View } from "react-native";

const UpToDate = () => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Text
        style={{
          fontFamily: "Poppins-SemiBold",
          fontSize: 18,
          marginTop: 30,
          textAlign: "center",
          color: "#fff",
        }}
      >
        {"You are up to date :)"}
      </Text>
    </View>
  );
};

export default UpToDate;
