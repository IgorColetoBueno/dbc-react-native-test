import { SafeAreaView } from "react-native";
import ScreenHeader from "../../navigation/ScreenHeader";
import { PropsWithChildren } from "react";

interface BaseScreenProps {
  title?: string;
}

const BaseScreen = ({
  children,
  title,
}: PropsWithChildren<BaseScreenProps>) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {title && <ScreenHeader title={title} />}
      {children}
    </SafeAreaView>
  );
};

export default BaseScreen;
