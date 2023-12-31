import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import BaseScreen from "../components/base-screen/BaseScreen";
import Button from "../components/button";
import Box, { Column } from "../components/flex";
import PersonCard from "../components/person-card";
import SearchInput from "../components/search-input";
import { TextH3 } from "../components/typography";
import useDebounce from "../hooks/useDebounce";
import ScreenHeader from "../navigation/ScreenHeader";
import { usePeopleContext } from "../store";
import Theme from "../theme";

const People = () => {
  const {
    people,
    paginatedPeople,
    fetchPeople,
    filterPeople,
    isLoading,
    isErrorState,
    showMore,
  } = usePeopleContext();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const ref = useRef<ScrollView>(null);

  useEffect(() => {
    fetchPeople();
  }, []);

  useEffect(() => {
    filterPeople(debouncedSearch).then(() => {
      ref.current?.scrollTo({ y: 0 });
    });
  }, [debouncedSearch]);

  const showMoreShown = !isLoading && paginatedPeople.length < people.length;
  const hasError = !isLoading && isErrorState;
  const hasPeople = !!paginatedPeople.length;

  return (
    <BaseScreen>
      <Column flex={1} gap={Theme.spacing.sm}>
        <Column gap={Theme.spacing.sm} paddingHorizontal={Theme.spacing.sm}>
          <ScreenHeader title="People List" />
          <SearchInput
            autoCapitalize="none"
            value={search}
            onChangeText={setSearch}
            placeholder="Search"
          />
        </Column>
        {hasError && (
          <TextH3 style={styles.h3} color="red">
            Internal server error test
          </TextH3>
        )}
        {!isErrorState && (
          <ScrollView ref={ref} style={styles.scrollView}>
            <Column gap={Theme.spacing.sm} marginBottom={Theme.spacing.md}>
              {hasPeople && (
                <Column gap={Theme.spacing.sm}>
                  {paginatedPeople.map((person) => (
                    <PersonCard key={person.id} person={person} />
                  ))}
                </Column>
              )}
              {isLoading && (
                <TextH3 style={styles.h3} color="blue">
                  Loading...
                </TextH3>
              )}
              {showMoreShown && (
                <Box>
                  <Button title="Show more" onPress={() => showMore(search)} />
                </Box>
              )}
            </Column>
          </ScrollView>
        )}
      </Column>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: Theme.spacing.sm,
    gap: Theme.spacing.sm,
  },
  h3: {
    textAlign: "center",
    fontWeight: "600",
    textTransform: "uppercase",
  },
});

export default People;
