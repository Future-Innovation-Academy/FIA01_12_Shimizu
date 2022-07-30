import "./App.css";
import Data from "./components/Data";
import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  // 1. useState
  //useStateでデータを受け取れる準備をする
  const [data, setData] = useState([{ id: "", apiKey: "" }]);
  //2. useEffect
  useEffect(() => {
    //2.1 query = コレクション(firebaseの箱のこと)の指定をする
    // firebaseで用意されたおまじない
    const q = query(collection(db, "config")); //データにアクセス
    //2.2
    const unsub = onSnapshot(q, (querySnapshot) => {
      setData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          apiKey: doc.data().apiKey,
        }))
      );
    });
    console.log({ data });
    return () => unsub();
  }, []);
  console.log({ data });
  console.log(data.at(0).apiKey);

  return (
    <div className="App">
      <Data />
    </div>
  );
}

export default App;
