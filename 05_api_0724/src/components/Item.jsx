import React from "react";

// 1.データを受け取りましょう🤗
const Item = ({
  id,
  height,
  pokemonName,
  weight,
  front,
  back,
  shiny,
  shinyBack,
}) => {
  return (
    <div className="pokemonItem">
      {/* ポケモンのデータが渡ってくるのでそれを表示します🤗 */}
      <div>図鑑番号: {id}</div>
      <div>ポケモン: {pokemonName}</div>
      <div>身長: {height}</div>
      <div>体重: {weight}</div>
      <img src={front} alt={pokemonName} />
      <img src={back} alt={pokemonName} />
      <img src={shiny} alt={pokemonName} />
      <img src={shinyBack} alt={pokemonName} />
    </div>
  );
};

export default Item;
