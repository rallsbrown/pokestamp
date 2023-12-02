import { usePokeContext } from "../../usePokeContext";

const TestList = () => {
  // eslint-disable-next-line no-unused-vars
  const { pokeList, setPokeList, loading } = usePokeContext();
  if (loading) {
    return <div>loading</div>;
  }
  if (!loading && !pokeList.length) {
    return <div>no pokemon</div>;
  }

  return (
    <div>
      <h2>t e s t l i s t.</h2>
      {pokeList.map((poke, i) => {
        return (
          <div key={i}>
            {i + 1}:: name: {poke.name}, url: {poke.url}
          </div>
        );
      })}
    </div>
  );
};

export default TestList;
