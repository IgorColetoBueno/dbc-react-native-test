import { PropsWithChildren } from "react";
import { Text, TextProps } from "react-native";
import Theme, { Color, Typography as ThemeTypography } from "../../theme";
interface ColorVariant {
  color?: Color;
}
interface TypographyProps extends TextProps {
  typography: ThemeTypography;
}

const Typography = ({
  children,
  style,
  typography,
  color,
  ...rest
}: PropsWithChildren<TypographyProps> & ColorVariant) => {
  return (
    <Text
      style={[
        style,
        Theme.typography[typography],
        { color: Theme.colors[color ?? "black"] },
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export const TextBody2 = ({ children, ...rest }: TextProps & ColorVariant) => {
  return (
    <Typography typography="body2" {...rest}>
      {children}
    </Typography>
  );
};

export const TextBody = ({ children, ...rest }: TextProps & ColorVariant) => {
  return (
    <Typography typography="body" {...rest}>
      {children}
    </Typography>
  );
};

export const TextH4 = ({ children, ...rest }: TextProps & ColorVariant) => {
  return (
    <Typography typography="h4" {...rest}>
      {children}
    </Typography>
  );
};

export const TextH3 = ({ children, ...rest }: TextProps & ColorVariant) => {
  return (
    <Typography typography="h3" {...rest}>
      {children}
    </Typography>
  );
};

export const TextH2 = ({ children, ...rest }: TextProps & ColorVariant) => {
  return (
    <Typography typography="h2" {...rest}>
      {children}
    </Typography>
  );
};

export const TextH1 = ({ children, ...rest }: TextProps & ColorVariant) => {
  return (
    <Typography typography="h1" {...rest}>
      {children}
    </Typography>
  );
};
