import AntDesign from "@expo/vector-icons/build/AntDesign";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// CustomPicker - a lightweight dropdown similar in behaviour to @react-native-picker/picker
// Props:
// - items: [{ label: string, value: any }]
// - selectedValue: any
// - onValueChange: (value, index) => void
// - placeholder: string
// - style: additional container style
// - itemStyle: additional item text style

export default function CustomPicker({
  items,
  selectedValue,
  onValueChange,
  hideIcon,
  style = {},
  itemStyle = {},
}) {
  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(() =>
    items.findIndex((i) => i.value === selectedValue)
  );
  const [currentValue, setCurrentValue] = useState(selectedValue);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setSelectedIndex(items.findIndex((i) => i.value === selectedValue));
  }, [selectedValue, items]);

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: visible ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [visible, rotateAnim]);

  const selectedLabel =
    selectedIndex >= 0 && items[selectedIndex]
      ? items[selectedIndex].label
      : null;

  const onSelect = (item, index) => {
    setVisible(false);
    setSelectedIndex(index);
    onValueChange(item.value, index);
    setCurrentValue(item.value);
  };

  const arrowRotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setVisible(true)}
        style={styles.button}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.buttonText, itemStyle]}
        >
          {currentValue}
        </Text>
        {hideIcon ? (
          <Text></Text>
        ) : (
          <AntDesign name="caretdown" size={10} color="white" />
        )}
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modalContainer}>
            <FlatList
              data={items}
              keyExtractor={(item, idx) => String(item.value) + "-" + idx}
              renderItem={({ item, index }) => {
                const isSelected = index === selectedIndex;
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => onSelect(item, index)}
                    style={styles.itemWrapper}
                  >
                    <Text
                      style={[
                        styles.itemText,
                        itemStyle,
                        isSelected && styles.itemTextSelected,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 5,
    backgroundColor: "#272727", // requested background
  },
  buttonText: {
    fontSize: 16,
    color: "#ffffff", // white font color
    // fontFamily must be loaded in the app (Poppins-Regular)
    fontFamily: Platform.select({
      ios: "Poppins-Regular",
      android: "Poppins-Regular",
    }),
  },
  caret: {
    fontSize: 16,
    color: "#ffffff",
    marginLeft: 8,
    // match font family for consistency
    fontFamily: Platform.select({
      ios: "Poppins-Regular",
      android: "Poppins-Regular",
    }),
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  modalContainer: {
    maxHeight: "60%",
    backgroundColor: "#272727", // same background for the dropdown list
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  itemWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  itemText: {
    fontSize: 16,
    color: "#ffffff",
    fontFamily: Platform.select({
      ios: "Poppins-Regular",
      android: "Poppins-Regular",
    }),
  },
  itemTextSelected: {
    color: "#19aa59", // requested selected color
    fontWeight: "600",
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    marginHorizontal: 8,
  },
});

/*
Usage example:

<CustomPicker
  items={[{label: 'Apple', value: 'apple'}, {label: 'Banana', value: 'banana'}]}
  selectedValue={value}
  onValueChange={(val, idx) => setValue(val)}
  placeholder="Choose fruit"
/>

Notes:
- Make sure you have Poppins-Regular loaded in your project (expo-font or react-native link / bundling).
- This component is kept dependency-free and mimics the basic behaviour of @react-native-picker/picker.
- If you want accessibility improvements, keyboard navigation, or support for sections, tell me and I can extend it.
*/
