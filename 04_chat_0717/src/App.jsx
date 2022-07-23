import "./App.css";
import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "./firebase";
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

function App() {
  const [open, setOpen] = useState(false);
  // 1. useState
  //useStateでデータを受け取れる準備をする
  const [data, setData] = useState([
    { id: "", date: "", time: "", temperature: "" },
  ]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // inputのonChangeのイベントを記述🤗
  const handleInputChangeTemperature = (e) => {
    setTemperature(e.target.value);
  };
  // inputのonChangeのイベントを記述🤗
  const handleInputChangeDate = (e) => {
    setDate(e.target.value);
  };
  // inputのonChangeのイベントを記述🤗
  const handleInputChangeTime = (e) => {
    setTime(e.target.value);
  };
  //3. 登録用のuseStateを準備します🤗
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [temperature, setTemperature] = useState();

  //2. useEffect
  useEffect(() => {
    //2.1 query = コレクション(firebaseの箱のこと)の指定をする
    // firebaseで用意されたおまじない
    const q = query(collection(db, "log")); //データにアクセス
    //2.2
    const unsub = onSnapshot(q, (querySnapshot) => {
      setData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          date: doc.data().date,
          time: doc.data().time,
          temperature: doc.data().temperature,
        }))
      );
    });
    return () => unsub();
  }, []);

  //送信の処理を記述＝送信のボタンが押されたら登録の処理を実行する🤗
  const addData = async () => {
    // 処理を記述していきます🤗
    // alert(1); 記述後、送信ボタンを押す→画面に変化があればコメントアウトしましょう🤗

    // firebaseへの登録の処理
    await addDoc(
      collection(db, "log"), //場所どこ？
      {
        date: date,
        time: time,
        temperature: temperature,
      }
    );
    // 文字を空にします🤗
    setDate();
    setTime();
    setTemperature();
    setOpen(false);
  };

  return (
    <div className="App">
      <Button variant="outlined" onClick={handleClickOpen}>
        データを追加
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>体温を記録</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="date"
            type="date"
            fullWidth
            variant="standard"
            onChange={handleInputChangeDate}
            value={date}
          />
          <TextField
            autoFocus
            margin="dense"
            id="time"
            type="time"
            fullWidth
            variant="standard"
            onChange={handleInputChangeTime}
            value={time}
          />
          <TextField
            autoFocus
            margin="dense"
            id="temperature"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleInputChangeTemperature}
            value={temperature}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={addData}>登録</Button>
        </DialogActions>
      </Dialog>
      <hr />
      {/* 表示のロジックを記述 */}
      <h2>体温</h2>

      {/* 表示のロジックを記述していきます🤗 */}
      {/* dataというuseStateで保持した箱の中にはfirebaseのデータが収納されています */}
      {/* 収納されているデータをES6のmapというおまじないを使ってぐるぐる表示させます */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">日付</TableCell>
              <TableCell align="right">時刻</TableCell>
              <TableCell align="right">体温（℃）</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{item.date}</TableCell>
                <TableCell align="right">{item.time}</TableCell>
                <TableCell align="right">{item.temperature}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
