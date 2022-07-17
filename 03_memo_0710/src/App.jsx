import { useState, useEffect } from "react";
import "./App.css";
import { TextField, Button } from "@mui/material";

function App() {
  const getData = () => {
    const data = localStorage.getItem("test");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };
  const [data, setData] = useState(getData);
  const [title, setTitle] = useState("");
  const [count, setCount] = useState(0);
  const countUp = () => {
    setCount(count + 1);
  };
  const handleAddSubmit = (e) => {
    e.preventDefault();
    let pushData = {
      title,
    };
    setData([...data, pushData]);
    setTitle("");
    setCount(count + 1);
  };
  useEffect(() => {
    localStorage.setItem("test" + JSON.stringify(count), JSON.stringify(data));
  }, [data]);
  const removeData = () => {
    localStorage.removeItem("test");
  };

  return (
    <div className="App">
      <h1>localStorage</h1>
      <form onSubmit={handleAddSubmit}>
        <TextField
          id="standard-basic"
          label="追加したいテキスト"
          variant="standard"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <Button variant="contained" type="submit">
          送信
        </Button>
      </form>
      <Button variant="contained" onClick={removeData}>
        削除
      </Button>
      {data.map((item, index) => (
        <div key={index}>{item.title}</div>
      ))}
    </div>
  );
}

export default App;
