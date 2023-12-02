// import React from "react";
// import { usePokeContext } from "../../usePokeContext";
import "./PokeCard.css";
// eslint-disable-next-line react/prop-types
const PokeCard = ({ name, types, sprites }) => {
  // const { pokeList, pokeData, randomPoke } = usePokeContext();
  // console.log("pokeCard - PokeList", pokeList);
  // console.log("pokeCard - randomPoke", randomPoke[0]);

  // React.useEffect(() => {
  //   console.log("PokeCard - PokeData", pokeData);
  // }, [pokeData]);
  return (
    <>
      <div>
        <p>{name}</p>
        <p>{types[0].type.name}</p>
        <img src={sprites.front_default}></img>
      </div>
    </>
  );
};

export default PokeCard;
