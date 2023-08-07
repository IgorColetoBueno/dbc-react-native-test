import { Person } from "../entities/Person";

export const peopleSortByNameUseCase = (people: Person[]) => {
  return people.sort((a, b) =>
    a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1,
  );
};
