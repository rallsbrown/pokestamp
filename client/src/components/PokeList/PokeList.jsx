// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./PokeList.css";
import { usePokeContext } from "../../usePokeContext";
import PokeCard from "../PokeCard/PokeCard";

const PokeList = () => {
  //do i want a global isloading state, or per component?
  // eslint-disable-next-line no-unused-vars
  const {
    pokeList,
    setPokeList,
    loading,
    randomPoke,
    setRandomPoke,
    pokeData,
  } = usePokeContext();
  const [isLoaded, setIsLoaded] = useState(false);
  // console.log("pokeList - randomPoke", randomPoke);
  // console.log("pokeList - pokeData", pokeData);
  const handleRandomPokemon = () => {
    if (pokeList.length) {
      const randIdx = Math.floor(Math.random() * pokeList.length);
      // console.log("pokeList", pokeList[randIdx]);
      setRandomPoke([pokeList[randIdx]]);
    }
  };

  useEffect(() => {
    if (pokeList.length) {
      setIsLoaded(true);
    }
  }, [pokeList]);

  useEffect(() => {
    handleRandomPokemon();
    console.log("loaded");
  }, [isLoaded]);

  //commented this out as the fast loading and flashing was distracting
  // if (loading) {
  //   return <h1>loading...</h1>;
  // }

  return (
    <>
      <div className='PokeList'>
        <div className='ListButtons'>
          <button onClick={() => handleRandomPokemon()} className='ListButton'>
            get random pokemon
          </button>
          <button className='ListButton' disabled={true}>
            clear pokemon
          </button>
        </div>
        <div className='PokeCards'>
          {!!pokeList.length &&
            pokeData.map((poke, i) => {
              return <PokeCard key={i} {...poke} />;
            })}
        </div>
      </div>
    </>
  );
};

export default PokeList;
