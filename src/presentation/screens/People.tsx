import { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native";
import BaseScreen from "../components/base-screen/BaseScreen";
import Button from "../components/button";
import Box, { Column } from "../components/flex";
import KeyboardAvoidingWrapper from "../components/keyboard-avoiding";
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
  const debouncedSearch = useDebounce(search, 200);
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
        {!isLoading && isErrorState && (
          <TextH3
            style={{
              textAlign: "center",
              fontWeight: "600",
              textTransform: "uppercase",
            }}
            color="red"
          >
            Internal server error test
          </TextH3>
        )}
        {!isErrorState && (
          <ScrollView
            ref={ref}
            style={{
              paddingHorizontal: Theme.spacing.sm,
              gap: Theme.spacing.sm,
            }}
            alwaysBounceVertical={false}
            keyboardDismissMode="interactive"
          >
            <KeyboardAvoidingWrapper>
              <Column gap={Theme.spacing.sm}>
                {!!paginatedPeople.length && (
                  <Column gap={Theme.spacing.sm}>
                    {paginatedPeople.map((person) => (
                      <PersonCard key={person.id} person={person} />
                    ))}
                  </Column>
                )}
                {isLoading && (
                  <TextH3
                    style={{
                      textAlign: "center",
                      fontWeight: "600",
                      textTransform: "uppercase",
                    }}
                    color="blue"
                  >
                    Loading...
                  </TextH3>
                )}
                {showMoreShown && (
                  <Box paddingBottom={Theme.spacing.md}>
                    <Button
                      title="Show more"
                      onPress={() => showMore(search)}
                    />
                  </Box>
                )}
              </Column>
            </KeyboardAvoidingWrapper>
          </ScrollView>
        )}
      </Column>
    </BaseScreen>
  );
};

export default People;
