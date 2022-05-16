import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "src/res/theme";
import TextInputStyled from "src/components/common/TextInputStyled";
import Header from "src/components/common/Header";
import HeaderAndIcon from "src/components/common/HeaderAndIcon";
import ListAttributes from "src/components/common/ListAttributes";

export default function ComponentsTest() {
  return (
    <View style={styles.container}>
      <Header title="ComponentsTest" />
      <HeaderAndIcon icon="gear" iconColor={"grey"} title="Title with icon" />
      <TextInputStyled placeholder="placeholder" />
      <ListAttributes leftText="Name" rightText="Role" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
});
