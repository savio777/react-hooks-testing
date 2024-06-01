import { useLayoutEffect, useRef } from "react";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useCount from "./useCount";

function App() {
  const {
    count,
    handleAddCount,
    countRef,
    handleAddCountRef,
    reducer,
    expensiveCount,
  } = useCount();

  const divRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect

  useLayoutEffect(() => {
    const rect = divRef.current?.getBoundingClientRect();

    console.log("div height: ", rect.height);
  }, []);

  return (
    <>
      <div ref={divRef}>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React Hooks</h1>
      <div className="card">
        <button onClick={handleAddCount}>count is {count}</button>

        <button onClick={handleAddCountRef}>
          count ref is {countRef.current}
        </button>

        <button onClick={() => reducer.dispatch({ type: "add" })}>
          count reducer is {reducer.state}
        </button>

        <button>
          expensive count {expensiveCount.toFixed(2).replace(".", ",")}
        </button>
      </div>
    </>
  );
}

export default App;
