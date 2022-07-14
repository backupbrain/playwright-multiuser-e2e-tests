import React from "react";
import { StyleSheet, Text, View } from "react-native";

export type Props = {
  text: string;
  style: { [key: string]: string | number };
};
export default function InfoAlert(props: Props) {
  return (
    <View style={[styles.alertContainer, props.style]}>
      <Text>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  alertContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
  },
});
