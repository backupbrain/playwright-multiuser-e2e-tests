import React from "react";
import { Text, TextInput, StyleSheet } from "react-native";

export type Props = {
  label?: string;
  placeholder?: string;
  value?: string;
  keyboardType?: "email-address" | null;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void;
};
export default function LabelInput(props: Props) {
  return (
    <>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <TextInput
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        value={props.value}
        autoComplete="off"
        autoCorrect={false}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
        style={styles.textInput}
      />
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    paddingBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
});
