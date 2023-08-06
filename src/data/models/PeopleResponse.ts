import { Person } from "../../domain/entities/People";

export interface PeopleResponse {
  status: number;
  data: Person[];
}
