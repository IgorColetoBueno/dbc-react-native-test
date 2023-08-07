import { StatusBar } from "expo-status-bar";
import People from "./src/presentation/screens/People";
import { PeopleProvider } from "./src/presentation/store";
import Theme from "./src/presentation/theme";

export default function App() {
  return (
    <PeopleProvider>
      <StatusBar backgroundColor={Theme.colors.white} />
      <People />
    </PeopleProvider>
  );
}
