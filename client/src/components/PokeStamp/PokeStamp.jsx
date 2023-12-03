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
      <div className='PokeStamp'>
        <div className='PokeClickBox'></div>
      </div>
    </>
  );
};

export default PokeStamp;
