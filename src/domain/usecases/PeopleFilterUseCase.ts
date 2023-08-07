import { Person } from "../entities/Person";

export const peopleFilterUseCase = (people: Person[], text: string = "") => {
  if (!people.length || !text.trim()) return people;

  const words = text.trim().toLowerCase().split(" ");

  return people.filter((person) => {
    return (
      words.every((word) => person.name.trim().toLowerCase().includes(word)) ||
      words.every((word) => person.phone.trim().toLowerCase().includes(word)) ||
      words.every((word) => person.salary.toString().trim().toLowerCase().includes(word))
    );
  });
};
