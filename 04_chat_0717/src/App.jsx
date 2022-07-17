import "./App.css";
import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";
import { db, auth } from "./firebase";
import Add from "./Add";

function App() {
  // 1. useState
  //useStateでデータを受け取れる準備をする
  const [data, setData] = useState([{ id: "", title: "" }]);
  console.log(data, "useStateの箱の方をみましょう！");

  //3. 登録用のuseStateを準備します🤗
  const [titleValue, setTitleValue] = useState("");

  //2. useEffect
  useEffect(() => {
    //2.1 query = コレクション(firebaseの箱のこと)の指定をする
    // firebaseで用意されたおまじない
    const q = query(collection(db, "group")); //データにアクセス

    //2.2
    const unsub = onSnapshot(q, (querySnapshot) => {
      setData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
        }))
      );
    });

    return () => unsub();
  }, []);

  // inputのonChangeのイベントを記述🤗
  const handleInputChange = (e) => {
    // console.log(e, "event");
    // console.log(e.target, "event target");
    setTitleValue(e.target.value);
  };

  //送信の処理を記述＝送信のボタンが押されたら登録の処理を実行する🤗
  const addData = async () => {
    // 処理を記述していきます🤗
    // alert(1); 記述後、送信ボタンを押す→画面に変化があればコメントアウトしましょう🤗

    // firebaseへの登録の処理
    await addDoc(
      collection(db, "group"), //場所どこ？
      {
        title: titleValue,
      }
    );

    // 文字を空にします🤗
    setTitleValue("");
  };

  return (
    <div className="App">
      <Add
        addData={addData}
        titleValue={titleValue}
        handleInputChange={handleInputChange}
      />
      <hr />
      {/* 表示のロジックを記述 */}
      <h2>データ表示</h2>

      {/* 表示のロジックを記述していきます🤗 */}
      {/* dataというuseStateで保持した箱の中にはfirebaseのデータが収納されています */}
      {/* 収納されているデータをES6のmapというおまじないを使ってぐるぐる表示させます */}
      <table>
        <thead>
          <tr>
            <th>index</th>
            <th>item.id</th>
            <th>item.title</th>
          </tr>
        </thead>

        {data.map((item, index) => (
          // mapを使うときは,keyという指定が必須です！忘れるとエラーが出ます🤗
          // Warning: Each child in a list should have a unique "key" prop.
          <tbody key={index}>
            <tr>
              <td>{index}</td>
              <td>{item.id}</td>
              <td>{item.title}</td>
            </tr>
          </tbody>
        ))}
      </table>

      {/* {data.map((item, index) => (
        // mapを使うときは,keyという指定が必須です！忘れるとエラーが出ます🤗
        // Warning: Each child in a list should have a unique "key" prop.
        <div key={index}>
          <div>{index}</div>
          <div>{item.id}</div>
          <div>{item.title}</div>
        </div>
      ))} */}

      {/* hrタグは線
      <hr />
      <h1>登録の処理</h1>
      {/* このあとuseStateを新しく記述します🤗 */}
      {/* <p>{titleValue}</p> */}

      {/* 入力させるinputタグを記述 */}
      {/* <input type="text" value={titleValue} onChange={handleInputChange} /> */}

      {/* 送信のボタンを記述 */}
      {/* <button onClick={addData}>送信</button> */}

      {/* 中身をAdd にお引越し */}
    </div>
  );
}

export default App;
