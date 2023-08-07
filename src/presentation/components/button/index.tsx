import { PropsWithChildren } from "react";
import { Pressable, TouchableOpacityProps, StyleSheet } from "react-native";
import Theme, { Color } from "../../theme";
import { TextBody } from "../typography";

interface ButtonProps extends TouchableOpacityProps {
  backgroundColor?: Color;
  color?: Color;
  title: string;
}

const Button = ({
  children,
  style,
  backgroundColor = "black",
  color = "white",
  title,
  ...rest
}: ButtonProps) => {
  return (
    <Pressable {...rest} style={[style, styles.button, { backgroundColor }]}>
      <TextBody color={color} style={{fontWeight: '500'}}>{title}</TextBody>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.spacing["3xl"],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Button;
