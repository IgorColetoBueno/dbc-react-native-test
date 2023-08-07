import React, { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform, View, ViewProps } from "react-native";

const KeyboardAvoidingWrapper = ({
  children,
  style,
}: PropsWithChildren<ViewProps>) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
    >
      <View style={[{ flex: 1 }, style]}>{children}</View>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingWrapper;
