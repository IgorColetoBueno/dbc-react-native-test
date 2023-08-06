import { PropsWithChildren } from "react";
import { View, ViewStyle } from "react-native";

interface BoxProps extends ViewStyle {}

const Box = ({ children, ...rest }: PropsWithChildren<BoxProps>) => {
  return <View style={rest}>{children}</View>;
};

export const Row = ({ children, ...rest }: PropsWithChildren<BoxProps>) => {
  return (
    <Box flexDirection="row" {...rest}>
      {children}
    </Box>
  );
};

export const Column = ({ children, ...rest }: PropsWithChildren<BoxProps>) => {
  return (
    <Box flexDirection="column" {...rest}>
      {children}
    </Box>
  );
};

export default Box;
