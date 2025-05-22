import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const TotalContext = createContext();

export const TotalProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const FetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://dummyjson.com/products`);
        setTotal(response.data.total);
        setProducts(response.data.products);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    FetchData();
  }, []);
  return (
    <TotalContext.Provider value={{ total, error, loading, products }}>
      {children}
    </TotalContext.Provider>
  );
};
export const useTotal = () => {
  return useContext(TotalContext);
};
