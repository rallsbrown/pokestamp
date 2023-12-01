import "./App.css";
import Provider from "./PokeContext";
import TestList from "./components/TestList/TestList";

function App() {
  return (
    <>
      <h1>p o k e s t a m p</h1>
      <div>
        <Provider>
          <TestList />
        </Provider>
      </div>
    </>
  );
}

export default App;
