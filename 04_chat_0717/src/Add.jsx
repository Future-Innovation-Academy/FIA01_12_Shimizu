import React from "react";
import { TextField, Button } from "@mui/material";

const Add = ({ addData, handleInputChange, titleValue }) => {
  return (
    <div>
      <h2>登録処理</h2>
      {/* このあとuseStateを新しく記述します🤗 */}
      {/* <p>{titleValue}</p> */}

      {/* 入力させるinputタグを記述 */}
      {/* <input type="text" value={titleValue} onChange={handleInputChange} /> */}
      <TextField
        id="standard-basic"
        label="追加したいテキスト"
        variant="standard"
        required
        onChange={handleInputChange}
        value={titleValue}
      />

      {/* 送信のボタンを記述 */}
      <Button variant="contained" onClick={addData}>
        送信
      </Button>
    </div>
  );
};

export default Add;
