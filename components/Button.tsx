import { TouchableOpacity, Text, StyleSheet } from "react-native";
interface Props {
  children: React.ReactNode;
  onClick: () => void;
}
const Button = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onClick}>
      <Text>{props.children}</Text>
    </TouchableOpacity>
  );
};
