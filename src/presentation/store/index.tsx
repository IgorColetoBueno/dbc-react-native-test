import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useReducer,
  useRef,
} from "react";
import { Person } from "../../domain/entities/Person";
import { peopleFilterUseCase } from "../../domain/usecases/PeopleFilterUseCase";
import { peoplePaginateUseCase } from "../../domain/usecases/PeoplePaginateUseCase";
import { PeopleRepositoryImpl } from "../../data/repositories/PeopleRepositoryImpl";
import { peopleCheckErrorUseCase } from "../../domain/usecases/PeopleCheckErrorUseCase";

interface PeopleState {
  people: Person[];
  filteredPeople: Person[];
  page: number;
  isErrorState: boolean;
  isLoading: boolean;
  fetchPeople: () => Promise<void>;
  showMore: () => Promise<void>;
  filterPeople: (text: string) => Promise<void>;
}

const initialState: PeopleState = {
  people: [],
  page: 1,
  filteredPeople: [],
  isErrorState: false,
  isLoading: true,
  fetchPeople: async () => {},
  filterPeople: async () => {},
  showMore: async () => {},
};

// Define the context
const PeopleContext = createContext<PeopleState>(initialState);

enum ActionType {
  FETCH_PEOPLE = "FETCH_PEOPLE",
  FILTER_PEOPLE = "FILTER_PEOPLE",
  SHOW_MORE = "SHOW_MORE",
  SET_ERROR = "SET_ERROR",
  SET_LOADING = "SET_LOADING",
}

interface BaseAction<T> {
  type: ActionType;
  payload?: T;
}

interface FetchAction extends BaseAction<Person[]> {
  type: ActionType.FETCH_PEOPLE;
}

interface FilterAction extends BaseAction<string> {
  type: ActionType.FILTER_PEOPLE;
}

interface ShowMoreAction extends BaseAction<void> {
  type: ActionType.SHOW_MORE;
}

interface SetErrorAction extends BaseAction<void> {
  type: ActionType.SET_ERROR;
}

interface SetLoadingAction extends BaseAction<boolean> {
  type: ActionType.SET_LOADING;
  payload: boolean;
}

type Action =
  | FetchAction
  | FilterAction
  | ShowMoreAction
  | SetErrorAction
  | SetLoadingAction;

// Define the reducer function
const peopleReducer = (state: PeopleState, action: Action): PeopleState => {
  switch (action.type) {
    case ActionType.FETCH_PEOPLE:
      return {
        ...state,
        people: action.payload || [],
        filteredPeople: peoplePaginateUseCase(action.payload || [], 1),
        page: 1,
        isLoading: false,
        isErrorState: false,
      };
    case ActionType.FILTER_PEOPLE:
      const filterPeopleList = peopleFilterUseCase(
        state.people,
        action.payload
      );
      return {
        ...state,
        filteredPeople: peoplePaginateUseCase(filterPeopleList, 1),
        page: 1,
        isErrorState: false,
        isLoading: false,
      };
    case ActionType.SHOW_MORE:
      return {
        ...state,
        page: state.page + 1,
        filteredPeople: peoplePaginateUseCase(state.people, state.page + 1),
        isErrorState: false,
        isLoading: false,
      };
    case ActionType.SET_ERROR:
      return {
        ...state,
        page: 1,
        people: [],
        isErrorState: true,
        isLoading: false,
      };
    case ActionType.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

// Define the custom hook to access the context
const usePeopleContext = () => {
  const context = useContext(PeopleContext);
  if (!context) {
    throw new Error("usePeopleContext must be used within a PeopleProvider");
  }
  return context;
};

const PeopleProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(peopleReducer, initialState);
  const peopleRepository = useRef(new PeopleRepositoryImpl());

  const fetchPeople = useCallback(async () => {
    try {
      dispatch({ type: ActionType.SET_LOADING, payload: true });
      peopleRepository.current.simulateDelay = 5000;
      const { data } = await peopleRepository.current.result();

      dispatch({
        type: ActionType.FETCH_PEOPLE,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ActionType.SET_ERROR,
      });
      peopleRepository.current.simulateError = false;
    }
  }, []);

  const filterPeople = useCallback(async (text: string) => {
    if (peopleCheckErrorUseCase(text)) {
      peopleRepository.current.simulateError = true;
    }
    // Calling REST API to simulate a '/filter' endpoint and trigger loading
    await fetchPeople();

    dispatch({
      type: ActionType.FILTER_PEOPLE,
      payload: text,
    });
  }, []);

  const showMore = useCallback(async () => {
    if (state.filteredPeople.length === state.people.length) return;

    // Calling REST API to simulate a '/filter' endpoint and trigger loading
    await fetchPeople();
    dispatch({
      type: ActionType.SHOW_MORE,
    });
  }, []);

  return (
    <PeopleContext.Provider
      value={{ ...state, fetchPeople, filterPeople, showMore }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

export { PeopleProvider, usePeopleContext };
