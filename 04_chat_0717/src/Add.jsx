import React from "react";

const Add = ({ addData, handleInputChange, titleValue }) => {
  return (
    <div>
      <h2>登録処理</h2>
      {/* このあとuseStateを新しく記述します🤗 */}
      <p>{titleValue}</p>

      {/* 入力させるinputタグを記述 */}
      <input type="text" value={titleValue} onChange={handleInputChange} />

      {/* 送信のボタンを記述 */}
      <button onClick={addData}>送信</button>
    </div>
  );
};

export default Add;