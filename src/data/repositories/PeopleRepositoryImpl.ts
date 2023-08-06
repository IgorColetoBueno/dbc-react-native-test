import { Person } from "../../domain/entities/Person";
import HTTPExceptionTest from "../../domain/exceptions/HTTPExceptionTest";
import { Repository } from "../../domain/repositories/Repository";
import { peopleSortByNameUseCase } from "../../domain/usecases/PeopleSortByNameUseCase";
import { wait } from "../../util/wait";
import { PeopleResponse } from "../models/PeopleResponse";
import peopleJson from "./people.json";

export class PeopleRepositoryImpl implements Repository<PeopleResponse> {
  public simulateError: boolean = false;
  public simulateDelay: number = 1000;

  async result(): Promise<PeopleResponse> {
    await wait(this.simulateDelay);

    if (this.simulateError) {
      throw new HTTPExceptionTest();
    }

    const peopleSort: Person[] = peopleSortByNameUseCase(
      peopleJson.people as Person[]
    );
    return {
      status: 200,
      data: peopleSort,
    };
  }
}
