/* eslint-disable react-refresh/only-export-components */
import {
  Dispatch,
  MutableRefObject,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

const INITIAL_COUNT = 0;

interface Props {
  children: ReactNode;
}

interface IActionPayloadReducer {
  type: "add" | "decrease";
}

interface IValues {
  count: number;
  countRef: MutableRefObject<number>;
  handleAddCountRef: () => void;
  handleAddCount: () => void;
  reducer: {
    state: number;
    dispatch: Dispatch<IActionPayloadReducer>;
  };
}

const reducer = (state: number, action: IActionPayloadReducer) => {
  switch (action.type) {
    case "add":
      return state + 1;
    case "decrease":
      return state - 1;
    default:
      return state;
  }
};

// context
export const CountContext = createContext<IValues>({} as IValues);

export const CountProvider = ({ children }: Props) => {
  console.log("context count");

  // useState

  const [count, setCount] = useState(INITIAL_COUNT);

  const handleAddCount = useCallback(() => {
    setCount((oldValue) => oldValue + 1);
  }, []);

  // useRef

  const countRef = useRef(0);

  const handleAddCountRef = () => countRef.current++; // don't re render on action

  // useReducer

  const [state, dispatch] = useReducer(reducer, INITIAL_COUNT);

  // useEffect

  useEffect(() => {
    const initData = async () => {
      try {
        const response = await fetch("https://api.github.com/users/savio777");
        const responseJson = await response.json();

        console.log("execute when component did mount", responseJson);
      } catch (error) {
        console.log({ error });
      }
    };

    initData();
  }, []);

  useEffect(() => {
    console.log("with each status update: ", count);

    // execute when dismount
    /*
  return () => {
    setCount(0);
  };
  */
  }, [count]);

  return (
    <CountContext.Provider
      value={{
        count,
        handleAddCount,
        countRef,
        handleAddCountRef,
        reducer: {
          dispatch,
          state,
        },
      }}
    >
      {children}
    </CountContext.Provider>
  );
};

const useCount = (): IValues => {
  const context = useContext(CountContext);

  if (!context) {
    throw new Error("useI18N must be used within an I18nProvider");
  }

  return context;
};

export default useCount;
