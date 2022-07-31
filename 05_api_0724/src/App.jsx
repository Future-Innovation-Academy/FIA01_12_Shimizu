import "./App.css";
import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import postData from "./postData";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Input } from "@mui/material";
import axios from "axios";

function App() {
  const [open, setOpen] = React.useState(false);
  const [fileName, setFileName] = useState();
  const [formData, setFormData] = useState({
    apikey: "",
  });
  const fileInput = React.createRef();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const submitData = new FormData();
    setFormData({ apikey: data.at(0).apiKey });
    console.log(data.at(0).apiKey);
    submitData.append("apikey", data.at(0).apiKey);
    submitData.append("wav", blob, fileInput.current.files[0]);
    console.log({ submitData });

    const response = await axios
      .post(`https://api.webempath.net/v2/analyzeWav`, submitData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response.data); // レスポンスデータ
        console.log(response.status); // ステータスコード
        console.log(response.statusText); // ステータステキスト
        console.log(response.headers); // レスポンスヘッダ
        console.log(response.config); // コンフィグ;
      });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // 1. useState
  //useStateでデータを受け取れる準備をする
  const [data, setData] = useState([{ id: "", apiKey: "" }]);
  const [result, setResult] = useState({});
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
  // var fs = require("fs");
  // var request = require("request");
  // const API_ENDPOINT = "https://api.webempath.net/v2/analyzeWav";
  // const formData = {
  //   apikey: data.at(0).apiKey,
  //   wav: fs.createReadStream("/Users/shimizu3494/Downloads/20220730082246.wav"),
  // };
  // // 3.useEffectを用いて、pokemonAPIのデータを取得します🤗（欲しいデータに精査して）
  // useEffect(() => {
  //   // 3-1. fetchDataというおまじないを作成する
  //   const fetchData = async () => {
  //     // APIのデータを取得する
  //     const response = await fetch(API_ENDPOINT, {
  //       method: "POST", // *GET, POST, PUT, DELETE, etc.
  //       formData: formData,
  //     });
  //     console.log({ response });

  //     // jsonにしてjsで操作できるように変換する
  //     const data = await response.json();
  //     console.log({ data }); //jsonに変換されたデータ

  //     setResult(data);
  //   };
  //   fetchData();
  // }, []);
  const fetchData = async (fileName) => {
    console.log("fetchData", data.at(0).apiKey);
    console.log({ fileName });
    console.log(data.at(0).apiKey);
    // const form = { apikey: data.at(0).apiKey, wav: fileName };
    postData(data.at(0).apiKey, fileName);
    // formData.append("apikey", data.at(0).apiKey);
    // formData.append("wav", fileName);
    // console.log({ formData });

    // // APIのデータを取得する
    // const response = await fetch("https://api.webempath.net/v2/analyzeWav", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    //   body: formData,
    //   // formData: { apiKey: data.at(0).apiKey.toString(), wav: fileName },
    // });
    // console.log({ response });

    // // jsonにしてjsで操作できるように変換する
    // const _ = await response.json();
    // console.log({ _ }); //jsonに変換されたデータ
    // setResult(_);
    // console.log({ result });

    // const pokemonList = data.results;
    // console.log({ pokemonList });

    // setPokemon(pokemonList);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(data);
  //   console.log();
  //   console.log({ fileName });
  //   fetchData(fileName);
  // };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="soundFile"
          ref={fileInput}
          id="soundFile"
          accept="audio/*"
        ></input>
        <button type="submit">Submit</button>
      </form>
      {/* <form onSubmit={handleSubmit}>
        <label>
          Upload file:
          <input
            type="file"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form> */}
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <Input type="file"></Input>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
}

export default App;
