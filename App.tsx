import People from "./src/presentation/screens/People";
import { PeopleProvider } from "./src/presentation/store";

export default function App() {
  return (
    <PeopleProvider>
      <People />
    </PeopleProvider>
  );
}
