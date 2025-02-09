/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import "./PokeStamp.css";
import { usePokeContext } from "../../usePokeContext";
import html2Canvas from "html2canvas";
import { faker } from "@faker-js/faker";
import axios from "axios";

const PokeStamp = () => {
  const captureRef = useRef(null);
  const {
    pokeList,
    setPokeList,
    loading,
    randomPoke,
    setRandomPoke,
    pokeData,
    fetching,
    setFetching,
  } = usePokeContext();
  const [stamps, setStamps] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [canvasBackGroundColor, setcanvasBackGroundColor] = useState(
    randomColor()
  );
  const [isHovered, setIsHovered] = useState(false);

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
  //this uploads images that will be pulled into gallery component, but still needs to live here?
  const handleAddToGallery = async () => {
    if (captureRef.current) {
      const imgCap = captureRef.current;
      const canvas = html2Canvas(imgCap, {
        allowTaint: true,
        useCORS: true,
      });
      const dataURL = (await canvas).toDataURL("image/jpeg");

      try {
        await axios.post("http://localhost:8000/upload", { dataURL });
        console.log("Upload successful");
        setFetching(true);
      } catch (e) {
        console.error("error uploading image", e);
      }
    }
  };

  const handleRandomBgColor = () => {
    setcanvasBackGroundColor(randomColor());
  };
  const handleSave = () => {};
  const handleLoad = () => {};
  //this may not stay, was just to help troubleshoot, but could be useful to keep?
  //if kept, might be best to move to gallery component if they are siblings.
  //if gallery is child of stamp then could be passed down as prop?
  const handleFetchImages = () => {
    setFetching(true);
  };

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
        <button className='StampButton' onClick={handleAddToGallery}>
          add to gallery
        </button>
        <button className='StampButton' onClick={handleRandomBgColor}>
          random bg color
        </button>
        <button className='StampButton' disabled={true}>
          save
        </button>
        <button className='StampButton' disabled={true}>
          load
        </button>
        <button className='StampButton' onClick={handleFetchImages}>
          fetch
        </button>
      </div>
      <div
        className='PokeStampCanvas'
        ref={captureRef}
        onClick={handlePlacePokeStamp}
        style={
          pokeData.length
            ? {
                backgroundColor: canvasBackGroundColor,
              }
            : { backgroundColor: canvasBackGroundColor }
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
        <div
          className='PokeClickBox'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={
            pokeData.length && isHovered
              ? {
                  cursor: `url(${pokeData[0].sprites.front_default}) 48 48, auto`,
                }
              : { cursor: "auto" }
          }
        ></div>
      </div>
    </>
  );
};

export default PokeStamp;
