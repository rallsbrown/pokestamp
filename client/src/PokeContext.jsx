import React, { useState } from "react";
import axios from "axios";

export const PokeContext = React.createContext(null);

const Provider = ({ children }) => {
  const [pokeList, setPokeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const getPoke = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:8000/pokemon");
      setPokeList(data.results);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  React.useEffect(() => {
    getPoke();
  }, []);

  const contextValue = {
    pokeList,
    setPokeList,
    loading,
  };

  return (
    <PokeContext.Provider value={contextValue}>{children}</PokeContext.Provider>
  );
};

export default Provider;
