// eslint-disable-next-line react/prop-types
const PokeCard = ({ name, url }) => {
  return (
    <>
      <div>
        <p>{name}</p>
        <p>{url}</p>
      </div>
    </>
  );
};

export default PokeCard;
