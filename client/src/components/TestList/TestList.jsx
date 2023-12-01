import React from "react";
import axios from "axios";

const TestList = () => {
  const [results, setResults] = React.useState([]);

  const getList = () => {
    const options = {
      method: "GET",
      url: "http://localhost:8000/pokemon",
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setResults(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGetList = () => {
    console.log("getList");
    const list = results;
    getList();
    console.log("the list", list);
  };

  return (
    <div>
      <h2>t e s t l i s t.</h2>
      <button onClick={handleGetList}>get list</button>
      <p>{JSON.stringify(results)}</p>
    </div>
  );
};

export default TestList;