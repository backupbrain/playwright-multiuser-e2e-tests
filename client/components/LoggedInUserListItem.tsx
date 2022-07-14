import React from "react";
import { View, Text, StyleSheet } from "react-native";

export type Props = {
  username?: string;
};
export default function LoggedInUserListItem(props: Props) {
  return (
    <View style={styles.listItem}>
      <Text>{props.username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
