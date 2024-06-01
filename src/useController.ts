import { useCallback, useEffect, useState } from "react";

const useController = () => {
  // useState

  const [count, setCount] = useState(0);

  const handleIncreaseCount = useCallback(() => {
    setCount((oldValue) => oldValue + 1);
  }, []);

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

  return { count, handleIncreaseCount };
};

export default useController;
