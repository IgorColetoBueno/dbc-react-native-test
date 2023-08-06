import { Person } from "../entities/Person";

export const peoplePaginateUseCase = (people: Person[], page: number = 1) => {
  return people.slice(0, page * 10);
};
