import { useState, useEffect } from "react";
import "./App.css";
import { TextField, Button } from "@mui/material";

function App() {
  const getData = () => {
    const data = localStorage.getItem("test");
    const length = localStorage.length;
    console.log(length);
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };
  const [data, setData] = useState(getData);
  const [title, setTitle] = useState("");
  const [key, setKey]=useState("");
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
  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    // let pushData = {
    //   title,
    // };
    // setData([...data, pushData]);
    removeData(key)
    setKey("");
    // setCount(count + 1);
  };
  useEffect(() => {
    localStorage.setItem("test" + JSON.stringify(count), JSON.stringify(data));
  }, [data]);
  const removeData = (key) => {
    localStorage.removeItem(key);
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
      <form onSubmit={handleDeleteSubmit}>
        <TextField
          id="standard-basic"
          label="削除したいkey"
          variant="standard"
          required
          onChange={(e) => setKey(e.target.value)}
          value={key}
        />
        <Button variant="contained" type="submit">
          削除
        </Button>
      </form>
      {data.map((item, index) => (
        <div key={index}>{item.title}</div>
      ))}
    </div>
  );
}

export default App;
