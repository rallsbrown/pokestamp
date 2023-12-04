import React, { useState, useEffect } from "react";
import "./PokeStamp.css";
import { usePokeContext } from "../../usePokeContext";

const PokeStamp = () => {
  const {
    pokeList,
    setPokeList,
    loading,
    randomPoke,
    setRandomPoke,
    pokeData,
  } = usePokeContext();
  const [stamps, setStamps] = useState([]);

  const handlePlacePokeStamp = ({ nativeEvent }) => {
    if (pokeData.length) {
      const { layerX, layerY } = nativeEvent;
      setStamps((prevStamps) => [
        ...prevStamps,

        {
          x: layerX,
          y: layerY,
          name: pokeData[0].name,
          sprite: pokeData[0].sprites.front_default,
        },
      ]);
    } else {
      alert("Get random Pokemon first!");
    }
  };

  return (
    <>
      <div className='StampButtons'>
        <button className='StampButton'>undo</button>
        <button className='StampButton'>redo</button>
        <button className='StampButton'>clear</button>
        <button className='StampButton'>download</button>
        <button className='StampButton'>add to gallery</button>
        <button className='StampButton'>random bg color</button>
        <button className='StampButton'>save</button>
        <button className='StampButton'>load</button>
      </div>
      <div
        className='PokeStampCanvas'
        onClick={handlePlacePokeStamp}
        style={
          pokeData.length
            ? {
                cursor: `url(${pokeData[0].sprites.front_default}) 48 48, auto`,
              }
            : { cursor: "auto" }
        }
      >
        {stamps.map((point, idx) => (
          <div
            key={idx}
            className='Poke'
            style={{
              left: point.x - 48 + "px",
              top: point.y - 48 + "px",
            }}
          >
            <img alt={point.name} src={point.sprite} />
          </div>
        ))}
        <div className='PokeClickBox'></div>
      </div>
    </>
  );
};

export default PokeStamp;
