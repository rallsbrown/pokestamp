import React, { useState } from "react";
import axios from "axios";

export const PokeContext = React.createContext(null);

// eslint-disable-next-line react/prop-types
const Provider = ({ children }) => {
  const [pokeList, setPokeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [randomPoke, setRandomPoke] = useState([]);

  //got stuck on this
  //Uncaught Error: Objects are not valid as a React child (found: object with keys {name, url})
  //can't render an object to the DOM
  const getPoke = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:8000/pokemon");
      setPokeList(data);
      // console.log("fetched data", data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    console.log("context", randomPoke);
  }, [randomPoke]);

  React.useEffect(() => {
    getPoke();
  }, []);

  const contextValue = {
    pokeList,
    setPokeList,
    loading,
    randomPoke,
    setRandomPoke,
  };

  return (
    <PokeContext.Provider value={contextValue}>{children}</PokeContext.Provider>
  );
};

export default Provider;
