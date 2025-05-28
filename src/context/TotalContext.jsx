import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const TotalContext = createContext(undefined);

export const TotalProvider = ({ children }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const FetchData = async () => {
      const response = await axios.get(
        `https://dummyjson.com/products?limit=1`,
      );
      setTotal(response.data.total);
    };
    FetchData();
  }, []);

  return (
    <TotalContext.Provider value={{ total }}>{children}</TotalContext.Provider>
  );
};
export const useTotal = () => {
  return useContext(TotalContext);
};
