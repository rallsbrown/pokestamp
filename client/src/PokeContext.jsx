import React, { useState } from "react";
import axios from "axios";

export const PokeContext = React.createContext(null);

const Provider = (props) => {
  const [pokeList, setPokeList] = useState([]);
  const [loading, setLoading] = useState(false);

  //got stuck on this
  //Uncaught Error: Objects are not valid as a React child (found: object with keys {name, url})
  //can't render an object to the DOM
  const getPoke = React.useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:8000/pokemon");
      const pokeUrls = data.map((poke) => poke.url);
      const pokeNames = data.map((poke) => poke.name);
      console.log("poke urls", pokeUrls);
      console.log("poke names", pokeNames);
      setPokeList(pokeNames);
      console.log("fetched data", data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    getPoke();
    console.log("pokeList-useEffect", pokeList);
  }, []);

  const contextValue = {
    pokeList,
    setPokeList,
    loading,
  };

  return (
    <PokeContext.Provider value={contextValue}>
      {props.children}
    </PokeContext.Provider>
  );
};

export default Provider;
