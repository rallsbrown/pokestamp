import { useEffect, useState } from "react";
import "./PokeGallery.css";
import { usePokeContext } from "../../usePokeContext";

const PokeGallery = () => {
  //this could go into gallery component?
  const { fetching, setFetching } = usePokeContext();
  const [imgUrls, setImgUrls] = useState([]);
  //this could go into gallery component?
  //maybe this should go into context?
  // const [fetching, setFetching] = useState(false);
  //this could go into gallery component?
  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:8000/getImages");
      const data = await response.json();
      setImgUrls(data.imgUrls);
    } catch (err) {
      console.log("error fetching images", err);
    }
  };
  //this could go into gallery component?
  useEffect(() => {
    fetchImages();
    setFetching(false);
    console.log(imgUrls);
  }, [fetching]);

  return (
    <>
      <h1>g a l l e r y</h1>
      <div className='Gallery'>
        {imgUrls.map((imgUrl, idx) => (
          <div key={idx + 1} className='GaleryCell'>
            <a
              className='GalleryLink'
              key={idx + 1}
              href={`http://localhost:8000${imgUrl}`}
            >
              <p className='ImageLabel'>{idx + 1}</p>
              <img
                className='LoadedImgs'
                key={idx + 1}
                src={`http://localhost:8000${imgUrl}`}
                alt={`collage ${idx + 1}`}
              />
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default PokeGallery;
