// import React from "react";
// import { usePokeContext } from "../../usePokeContext";
import "./PokeCard.css";
// eslint-disable-next-line react/prop-types
const PokeCard = ({ name, types, sprites }) => {
  const typeNames = () => {
    types.map((l, i) => {
      console.log(`type ${i + 1}`, l.type.name);
    });
  };
  typeNames();
  console.log(types);
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
        <div className='types'>
          {types.map((l, i) => (
            <p key={i} className='foo'>
              type {i + 1} {l.type.name}
            </p>
          ))}
          <img src={sprites.front_default}></img>
        </div>
      </div>
    </>
  );
};

export default PokeCard;
