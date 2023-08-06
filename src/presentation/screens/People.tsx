import { useEffect } from "react";
import { ScrollView, Text } from "react-native";
import BaseScreen from "../components/base-screen/BaseScreen";
import { usePeopleContext } from "../store";

const People = () => {
  const { filteredPeople, fetchPeople, isLoading } = usePeopleContext();

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <BaseScreen title="PEOPLE LIST">
      <ScrollView>
        <Text>{JSON.stringify(filteredPeople)}</Text>
        {isLoading && <Text>Loading</Text>}
      </ScrollView>
    </BaseScreen>
  );
};

export default People;
