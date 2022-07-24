// rafce を入力後 tabキーを押す
import React from "react";

import { useState, useEffect } from "react";
import View from "./View";
import Item from "./Item";

const Data = () => {
  const [pokemon, setPokemon] = useState([]);
  const [data, setData] = useState([]);
  // 3.useEffectを用いて、pokemonAPIのデータを取得します🤗（欲しいデータに精査して）
  useEffect(() => {
    // 3-1. fetchDataというおまじないを作成する
    const fetchData = async () => {
      // APIのデータを取得する
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      console.log({ response });

      // jsonにしてjsで操作できるように変換する
      const data = await response.json();
      console.log({ data }); //jsonに変換されたデータ

      const pokemonList = data.results;
      console.log({ pokemonList });

      setPokemon(pokemonList);
    };
    fetchData();
  }, []);
  // handleClickの処理を記述
  const handleClick = async (num) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${num}/`
    ).then((res) => res.json());
    setData(response);
  };
  return (
    <div>
      <div className="viewBox">
        {pokemon.map((item, index) => (
          <View
            key={index}
            pokemonItem={index}
            handleClick={handleClick}
          ></View>
        ))}
      </div>
      <Item
        id={data.id}
        height={data.height}
        pokemonName={data.name}
        weight={data.weight}
        front={data.sprites && data.sprites.front_default}
        back={data.sprites && data.sprites.back_default}
        shiny={data.sprites && data.sprites.front_shiny}
        shinyBack={data.sprites && data.sprites.back_shiny}
      ></Item>
    </div>
  );
};

export default Data;
