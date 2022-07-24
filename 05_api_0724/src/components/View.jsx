import { React } from "react";

const View = ({ pokemonItem, handleClick }) => {
  return (
    <div className="viewItem" onClick={() => handleClick(pokemonItem + 1)}>
      {/* display a image */}
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          pokemonItem + 1
        }.png`}
        alt={pokemonItem}
      />
    </div>
  );
};

export default View;
