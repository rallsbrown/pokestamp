import React, { useState, useEffect, useRef } from "react";
import "./PokeStamp.css";
import { usePokeContext } from "../../usePokeContext";
import html2Canvas from "html2canvas";
import { faker } from "@faker-js/faker";

const PokeStamp = () => {
  const captureRef = useRef(null);
  const {
    pokeList,
    setPokeList,
    loading,
    randomPoke,
    setRandomPoke,
    pokeData,
  } = usePokeContext();
  const [stamps, setStamps] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [canvasBackGroundColor, setcanvasBackGroundColor] = useState(
    randomColor()
  );

  useEffect(() => {
    console.log(deleted);
  }, [deleted]);

  function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  }

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

  const handleUndo = () => {
    if (stamps.length) {
      const newStamps = [...stamps];
      const removed = newStamps.pop();
      setStamps([...newStamps]);
      setDeleted([...deleted, removed]);
    }
  };

  const handleRedo = () => {
    if (deleted.length) {
      const deletedStamps = [...deleted];
      setStamps([...stamps, deletedStamps.pop()]);
      setDeleted([...deletedStamps]);
    }
  };

  const handleClearStamps = () => {
    if (stamps.length) {
      setStamps([]), setDeleted([]);
    }
  };

  const handleDownload = () => {
    // const elementToCapture = document.querySelector(".PokeStampCanvas");
    if (!captureRef.current) {
      console.error("element not found");
      return;
    }

    html2Canvas(captureRef.current, {
      allowTaint: true,
      useCORS: true,
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg");
        const downloadLink = document.createElement("a");
        downloadLink.href = imgData;
        //use fakerjs to generate random names later.
        downloadLink.download = `${faker.color.human()}_${faker.animal.type()}.jpeg`;
        downloadLink.click();
      })
      .catch((e) => {
        console.error("capture and download failed", e);
      });
  };

  const handleAddToGallery = () => {};
  const handleRandomBgColor = () => {
    setcanvasBackGroundColor(randomColor());
  };
  const handleSave = () => {};
  const handleLoad = () => {};

  return (
    <>
      <div className='StampButtons'>
        <button
          disabled={stamps.length === 0}
          className='StampButton'
          onClick={handleUndo}
        >
          undo
        </button>
        <button
          disabled={deleted.length === 0}
          className='StampButton'
          onClick={handleRedo}
        >
          redo
        </button>
        <button
          disabled={stamps.length === 0 && deleted.length === 0}
          className='StampButton'
          onClick={handleClearStamps}
        >
          clear
        </button>
        <button className='StampButton' onClick={handleDownload}>
          download
        </button>
        <button className='StampButton'>add to gallery</button>
        <button className='StampButton' onClick={handleRandomBgColor}>
          random bg color
        </button>
        <button className='StampButton'>save</button>
        <button className='StampButton'>load</button>
      </div>
      <div
        className='PokeStampCanvas'
        ref={captureRef}
        onClick={handlePlacePokeStamp}
        style={
          pokeData.length
            ? {
                cursor: `url(${pokeData[0].sprites.front_default}) 48 48, auto`,
                backgroundColor: canvasBackGroundColor,
              }
            : { cursor: "auto", backgroundColor: canvasBackGroundColor }
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
