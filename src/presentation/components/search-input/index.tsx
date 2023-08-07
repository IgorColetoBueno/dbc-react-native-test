import React from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import Theme from "../../theme";
import Box, { Row } from "../flex";
import { TextH3 } from "../typography";
interface SearchInputProps extends TextInputProps {}

const SearchInput = (props: SearchInputProps) => {
  const handleClearSearch = () => {
    props.onChangeText?.("");
  };

  return (
    <Box>
      <Row
        alignItems="center"
        borderColor={Theme.colors["dark-gray"]}
        borderWidth={1}
        borderRadius={8}
      >
        <TextInput
          style={[styles.searchInput, Theme.typography.body]}
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
