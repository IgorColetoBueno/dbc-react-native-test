/* eslint-disable no-case-declarations */
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
} from "react";

import { PeopleRepositoryImpl } from "../../data/repositories/PeopleRepositoryImpl";
import { Person } from "../../domain/entities/Person";
import { peopleCheckErrorUseCase } from "../../domain/usecases/PeopleCheckErrorUseCase";
import { peopleFilterUseCase } from "../../domain/usecases/PeopleFilterUseCase";
import { peoplePaginateUseCase } from "../../domain/usecases/PeoplePaginateUseCase";

interface PeopleState {
  people: Person[];
  paginatedPeople: Person[];
  page: number;
  isErrorState: boolean;
  isLoading: boolean;
  fetchPeople: () => Promise<void>;
  showMore: (text: string) => Promise<void>;
  filterPeople: (text: string) => Promise<void>;
}

const initialState: PeopleState = {
  people: [],
  page: 1,
  paginatedPeople: [],
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

interface ShowMoreAction extends BaseAction<string> {
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
        paginatedPeople: peoplePaginateUseCase(action.payload || [], 1),
        isLoading: false,
        isErrorState: false,
      };
    case ActionType.FILTER_PEOPLE:
      const filterPeopleList = peopleFilterUseCase(
        state.people,
        action.payload,
      );
      return {
        ...state,
        people: filterPeopleList,
        paginatedPeople: peoplePaginateUseCase(filterPeopleList, 1),
        page: 1,
        isLoading: false,
      };
    case ActionType.SHOW_MORE:
      const showMoreFilterPeopleList = peopleFilterUseCase(
        state.people,
        action.payload,
      );
      return {
        ...state,
        page: state.page + 1,
        people: showMoreFilterPeopleList,
        paginatedPeople: peoplePaginateUseCase(
          showMoreFilterPeopleList,
          state.page + 1,
        ),
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
      const { data } = await peopleRepository.current.result();

      dispatch({
        type: ActionType.FETCH_PEOPLE,
        payload: data,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      dispatch({
        type: ActionType.SET_ERROR,
      });
    }
  }, []);

  const filterPeople = useCallback(
    async (text: string) => {
      if (peopleCheckErrorUseCase(text)) {
        peopleRepository.current.simulateError = true;
      } else {
        peopleRepository.current.simulateError = false;
      }
      // Calling REST API to simulate a '/filter' endpoint and trigger loading
      await fetchPeople();

      dispatch({
        type: ActionType.FILTER_PEOPLE,
        payload: text,
      });
    },
    [fetchPeople, peopleRepository.current],
  );

  const showMore = useCallback(
    async (text: string) => {
      if (state.paginatedPeople.length === state.people.length) return;

      // Calling REST API to simulate a '/filter' endpoint and trigger loading
      await fetchPeople();
      dispatch({
        type: ActionType.SHOW_MORE,
        payload: text,
      });
    },
    [fetchPeople, state.paginatedPeople, state.people],
  );

  const memoizedState = useMemo(
    () => ({ ...state, fetchPeople, filterPeople, showMore }),
    [state, fetchPeople, filterPeople, showMore],
  );

  return (
    <PeopleContext.Provider value={memoizedState}>
      {children}
    </PeopleContext.Provider>
  );
};

export { PeopleProvider, usePeopleContext };
