import "./App.css";
import Provider from "./PokeContext";
import PokeStamp from "./components/PokeStamp/PokeStamp";
// import TestList from "./components/TestList/TestList";
import PokeList from "./components/PokeList/PokeList";

function App() {
  return (
    <>
      <div className='App'>
        {/* <h1>p o k e s t a m p</h1> */}
        <Provider>
          <PokeList />
          {/* <TestList /> */}
          <PokeStamp />
        </Provider>
      </div>
    </>
  );
}

export default App;
