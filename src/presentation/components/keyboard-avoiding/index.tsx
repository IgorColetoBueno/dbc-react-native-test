import React, { PropsWithChildren } from "react";
import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ViewProps,
} from "react-native";

const KeyboardAvoidingWrapper = ({
  children,
  style,
}: PropsWithChildren<ViewProps>) => {
  const handleBackgroundPress = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback
      style={{ backgroundColor: "red", flex: 1 }}
      onPress={handleBackgroundPress}
    >
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <View style={[{ flex: 1 }, style]}>{children}</View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default KeyboardAvoidingWrapper;
