import { PropsWithChildren } from "react";
import { Text, TextProps } from "react-native";
import Theme, { Typography } from "../../theme";

interface TypographyProps extends TextProps {
  typography: Typography;
}

const Typography = ({
  children,
  style,
  typography,
  ...rest
}: PropsWithChildren<TypographyProps>) => {
  return (
    <Text style={[style, Theme.typography[typography]]} {...rest}>
      {children}
    </Text>
  );
};

export const TextBody2 = ({ children, ...rest }: TextProps) => {
  return (
    <Typography typography="body2" {...rest}>
      {children}
    </Typography>
  );
};

export const TextBody = ({ children, ...rest }: TextProps) => {
  return (
    <Typography typography="body" {...rest}>
      {children}
    </Typography>
  );
};

export const TextH4 = ({ children, ...rest }: TextProps) => {
  return (
    <Typography typography="h4" {...rest}>
      {children}
    </Typography>
  );
};

export const TextH3 = ({ children, ...rest }: TextProps) => {
  return (
    <Typography typography="h3" {...rest}>
      {children}
    </Typography>
  );
};

export const TextH2 = ({ children, ...rest }: TextProps) => {
  return (
    <Typography typography="h2" {...rest}>
      {children}
    </Typography>
  );
};

export const TextH1 = ({ children, ...rest }: TextProps) => {
  return (
    <Typography typography="h1" {...rest}>
      {children}
    </Typography>
  );
};
