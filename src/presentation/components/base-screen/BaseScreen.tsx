import { PropsWithChildren } from "react";
import { Platform, SafeAreaView } from "react-native";

import KeyboardAvoidingWrapper from "../keyboard-avoiding";

const isAndroid = Platform.OS === "android";
const BaseScreen = ({ children }: PropsWithChildren) => {
  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={{ paddingTop: isAndroid ? 30 : 0, flex: 1 }}>
        {children}
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  );
};

export default BaseScreen;
