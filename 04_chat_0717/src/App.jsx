import "./App.css";
import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";
import { db, auth } from "./firebase";
import Add from "./Add";
import cv from "@techstark/opencv-js";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function App() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const handleImage = (event) => {
    const image = event.target.files[0];
    setImage(image);
  };

  // const onSubmit = (event) => {
  //   event.preventDefault();
  //   if (image === "") {
  //     console.log("ファイルが選択されていません");
  //   }
  //   // アップロード処理
  //   console.log({ image });
  //   console.log(image.name);
  //   const uploadTask = storage
  //     .ref("新型コロナウイルス対策マニュアル.jpg")
  //     .put(image);
  //   uploadTask.on(
  //     firebase.storage.TaskEvent.STATE_CHANGED,
  //     next,
  //     error,
  //     complete
  //   );
  // };
  // const next = (snapshot) => {
  //   // 進行中のsnapshotを得る
  //   // アップロードの進行度を表示
  //   const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //   console.log(percent + "% done");
  //   console.log(snapshot);
  // };
  // const error = (error) => {
  //   // エラーハンドリング
  //   console.log(error);
  // };
  // const complete = () => {
  //   // 完了後の処理
  //   // 画像表示のため、アップロードした画像のURLを取得
  //   storage
  //     .ref("images")
  //     .child(image.name)
  //     .getDownloadURL()
  //     .then((fireBaseUrl) => {
  //       setImageUrl(fireBaseUrl);
  //     });
  // };
  // const [modelLoaded, setModelLoaded] = React.useState(false);

  // React.useEffect(() => {
  //   loadHaarFaceModels().then(() => {
  //     setModelLoaded(true);
  //   });
  // }, []);

  // const webcamRef = React.useRef(null);
  // const imgRef = React.useRef(null);
  // const faceImgRef = React.useRef(null);

  // React.useEffect(() => {
  //   if (!modelLoaded) return;

  //   const detectFace = async () => {
  //     const imageSrc = webcamRef.current.getScreenshot();
  //     if (!imageSrc) return;

  //     return new Promise((resolve) => {
  //       imgRef.current.src = imageSrc;
  //       imgRef.current.onload = () => {
  //         try {
  //           const img = cv.imread(imgRef.current);
  //           detectHaarFace(img);
  //           cv.imshow(faceImgRef.current, img);

  //           img.delete();
  //           resolve();
  //         } catch (error) {
  //           console.log(error);
  //           resolve();
  //         }
  //       };
  //     });
  //   };

  //   let handle;
  //   const nextTick = () => {
  //     handle = requestAnimationFrame(async () => {
  //       await detectFace();
  //       nextTick();
  //     });
  //   };
  //   nextTick();
  //   return () => {
  //     cancelAnimationFrame(handle);
  //   };
  // }, [modelLoaded]);
  // 1. useState
  //useStateでデータを受け取れる準備をする
  const [data, setData] = useState([{ id: "", temperature: 0 }]);
  console.log(data, "useStateの箱の方をみましょう！");

  //3. 登録用のuseStateを準備します🤗
  const [temperature, setTemperature] = useState();

  //2. useEffect
  useEffect(() => {
    //2.1 query = コレクション(firebaseの箱のこと)の指定をする
    // firebaseで用意されたおまじない
    const q = query(collection(db, "temperature")); //データにアクセス

    //2.2
    const unsub = onSnapshot(q, (querySnapshot) => {
      setData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          temperature: doc.data().temperature,
        }))
      );
    });

    return () => unsub();
  }, []);

  // inputのonChangeのイベントを記述🤗
  const handleInputChange = (e) => {
    // console.log(e, "event");
    // console.log(e.target, "event target");
    setTemperature(e.target.value);
  };

  //送信の処理を記述＝送信のボタンが押されたら登録の処理を実行する🤗
  const addData = async () => {
    // 処理を記述していきます🤗
    // alert(1); 記述後、送信ボタンを押す→画面に変化があればコメントアウトしましょう🤗

    // firebaseへの登録の処理
    await addDoc(
      collection(db, "temperature"), //場所どこ？
      {
        temperature: temperature,
      }
    );

    // 文字を空にします🤗
    setTemperature(null);
  };

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  return (
    <div className="App">
      {/* <h1>画像アップロード</h1>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={handleImage} />
        <button>Upload</button>
      </form>
      <img src={imageUrl} alt="uploaded" />
      <h2>Real-time Face Detection</h2>
      <Webcam
        ref={webcamRef}
        className="webcam"
        mirrored
        screenshotFormat="image/jpeg"
      />
      <img className="inputImage" alt="input" ref={imgRef} />
      <canvas className="outputImage" ref={faceImgRef} />
      {!modelLoaded && <div>Loading Haar-cascade face model...</div>} */}
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          {/* <TextField
            autoFocus
            margin="dense"
            id="date"
            // label="Date"
            type="date"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="time"
            // label="Time"
            type="time"
            fullWidth
            variant="standard"
          /> */}
          <TextField
            autoFocus
            margin="dense"
            id="temperature"
            // label="Time"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            value={temperature}
            // InputLabelProps={{
            //   shrink: true,
            // }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(handleClose, addData)}>Subscribe</Button>
        </DialogActions>
      </Dialog>
      <Add
        addData={addData}
        temperature={temperature}
        handleInputChange={handleInputChange}
      />
      <hr />
      {/* 表示のロジックを記述 */}
      <h2>データ表示</h2>

      {/* 表示のロジックを記述していきます🤗 */}
      {/* dataというuseStateで保持した箱の中にはfirebaseのデータが収納されています */}
      {/* 収納されているデータをES6のmapというおまじないを使ってぐるぐる表示させます */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>index</TableCell>
              <TableCell align="right">item.id</TableCell>
              <TableCell align="right">item.temperature</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index}
                </TableCell>
                <TableCell align="right">{item.id}</TableCell>
                <TableCell align="right">{item.temperature}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
      {/* <p>{temperature}</p> */}

      {/* 入力させるinputタグを記述 */}
      {/* <input type="text" value={temperature} onChange={handleInputChange} /> */}

      {/* 送信のボタンを記述 */}
      {/* <button onClick={addData}>送信</button> */}

      {/* 中身をAdd にお引越し */}
    </div>
  );
}

export default App;
