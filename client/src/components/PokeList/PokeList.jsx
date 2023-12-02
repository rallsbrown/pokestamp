import React, { useState } from "react";
import "./PokeList.css";
import { usePokeContext } from "../../usePokeContext";
import PokeCard from "../PokeCard/PokeCard";

const PokeList = () => {
  //do i want a global isloading state, or per component?
  // eslint-disable-next-line no-unused-vars
  const { pokeList, setPokeList, loading } = usePokeContext();

  if (loading) {
    return <h1>loading...</h1>;
  }
  return (
    <>
      <div className='PokeList'>
        <h2> p o k e l i s t </h2>
        <div className='ListButtons'>
          <button className='ListButton'>get random pokemon</button>
          <button className='ListButton'>clear pokemon</button>
        </div>
        <div className='PokeCards'>
          <PokeCard />
        </div>
      </div>
    </>
  );
};

export default PokeList;
