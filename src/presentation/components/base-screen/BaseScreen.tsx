import { PropsWithChildren } from "react";
import {
  Platform,
  SafeAreaView
} from "react-native";

const isAndroid = Platform.OS === "android";
const BaseScreen = ({ children }: PropsWithChildren) => {
  return (
    <SafeAreaView style={{ paddingTop: isAndroid ? 30 : 0, flex: 1 }}>
      {children}
    </SafeAreaView>
  );
};

export default BaseScreen;
