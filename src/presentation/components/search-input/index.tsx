import React, { useCallback, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TouchableOpacity,
} from "react-native";

import Theme from "../../theme";
import Box, { Row } from "../flex";
import { TextH3 } from "../typography";
interface SearchInputProps extends TextInputProps {}

const SearchInput = ({ onFocus, onBlur, ...props }: SearchInputProps) => {
  const [focused, setFocused] = useState(false);
  const handleClearSearch = () => {
    props.onChangeText?.("");
  };

  const handleFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused(true);
      onFocus?.(e);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused(false);
      onBlur?.(e);
    },
    [onBlur],
  );

  return (
    <Box>
      <Row
        alignItems="center"
        borderColor={focused ? Theme.colors.black : Theme.colors["dark-gray"]}
        borderWidth={1}
        borderRadius={8}
      >
        <TextInput
          style={[styles.searchInput, Theme.typography.body]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {props.value !== "" && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearSearch}
          >
            <TextH3>x</TextH3>
          </TouchableOpacity>
        )}
      </Row>
    </Box>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: Theme.spacing.xs,
  },
  clearButton: {
    paddingVertical: Theme.spacing.xs,
    paddingRight: Theme.spacing.md,
  },
});

export default SearchInput;
