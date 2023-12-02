import React, { useState } from "react";
import axios from "axios";

export const PokeContext = React.createContext(null);

// eslint-disable-next-line react/prop-types
const Provider = ({ children }) => {
  const [pokeList, setPokeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [randomPoke, setRandomPoke] = useState([]);
  const [PokeData, setPokeData] = useState(null);

  //got stuck on this
  //Uncaught Error: Objects are not valid as a React child (found: object with keys {name, url})
  //can't render an object to the DOM
  const getPokeList = async () => {
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

  const getPokeData = async () => {
    setLoading(true);
    if (randomPoke.length) {
      try {
        const { data } = await axios.get(randomPoke[0].url);
        setPokeData(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
  };

  React.useEffect(() => {
    getPokeData();
  }, [randomPoke]);

  // this was just to make sure context state was in sync with click handler
  React.useEffect(() => {
    console.log("pokeData", PokeData);
  }, [PokeData]);
  // this was just to make sure context state was in sync with click handler
  React.useEffect(() => {
    console.log("context", randomPoke);
  }, [randomPoke]);

  React.useEffect(() => {
    getPokeList();
  }, []);

  const contextValue = {
    pokeList,
    setPokeList,
    loading,
    randomPoke,
    setRandomPoke,
    PokeData,
  };

  return (
    <PokeContext.Provider value={contextValue}>{children}</PokeContext.Provider>
  );
};

export default Provider;
