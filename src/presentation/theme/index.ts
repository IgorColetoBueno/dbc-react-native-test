import { StyleProp, TextStyle } from "react-native";

export type Color =
  | "red"
  | "dark-blue"
  | "blue"
  | "light-cyan"
  | "light-gray"
  | "dark-gray"
  | "black"
  | "white";

export type Spacing = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

export type Typography = "body2" | "body" | "h4" | "h3" | "h2" | "h1";

export interface ThemeProps {
  typography: Record<Typography, StyleProp<TextStyle>>;
  spacing: Record<Spacing, number>;
  colors: Record<Color, string>;
}

const Theme: ThemeProps = {
  typography: {
    body2: {
      fontSize: 12,
    },
    body: {
      fontSize: 14,
    },
    h4: {
      fontSize: 16,
    },
    h3: {
      fontSize: 18,
    },
    h2: {
      fontSize: 20,
    },
    h1: {
      fontSize: 24,
    },
  },
  spacing: {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
    "2xl": 48,
    "3xl": 64,
  },
  colors: {
    "dark-blue": "#1D3557",
    black: "#000",
    "light-cyan": "#A8DADC",
    "light-gray": "#F1FAEE",
    "dark-gray": "#a0aab2",
    blue: "#457B9D",
    red: "#E63946",
    white: "#FFF",
  },
};

export default Theme;
