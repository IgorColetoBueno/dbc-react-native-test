import { Person } from "../entities/Person";

export const peopleFilterUseCase = (people: Person[], text:string = "") => {
  if (!people.length || !text.trim()) return people;

  const words = text.trim().toLowerCase().split(' ')

  return people.filter((person) => {
    return words.some(word => person.name.trim().toLowerCase().includes(word));
  });
};
