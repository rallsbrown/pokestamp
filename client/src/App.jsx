import "./App.css";
import Provider from "./PokeContext";
import TestList from "./components/TestList/TestList";
import PokeList from "./components/TestList/PokeList/PokeList";

function App() {
  return (
    <>
      <h1>p o k e s t a m p</h1>
      <div>
        <Provider>
          <PokeList />
          <TestList />
        </Provider>
      </div>
    </>
  );
}

export default App;
