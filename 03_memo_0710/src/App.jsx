import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const getData = () => {
    const data = localStorage.getItem("test");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  }
  const [data, setData] = useState(getData);
  const [title, setTitle] = useState("");
  const handleAddSubmit = (e) => {
    e.preventDefault();
    let pushData = {
      title,
    };
    setData([...data, pushData]);
    setTitle("");
  }
  useEffect(() => { localStorage.setItem("test", JSON.stringify(data)); }, [data]);

  const [sessionData, setSessionData] = useState([]);
  const [sessionTitle, setSessionTitle] = useState("");
  const handleAddSubmit2Session = (e) => {
    e.preventDefault();
    let pushData = {
      sessionTitle,
    };
    setSessionData([...sessionData, pushData]);
    setSessionTitle("");
  }
  useEffect(() => { sessionStorage.setItem("sessionKey", JSON.stringify(sessionData)); }, [sessionData]);

  return (
    <div className="App">
      <h1>localStorage</h1>
      <form onSubmit={handleAddSubmit}>
        <input type="text"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title} />
        <button type='submit'>送信</button>
      </form>
      {data.map((item, index) => (
        <div key={index}>{item.title}</div>
      ))}
      <hr />

      <h1>sessionStorage</h1>
      <form onSubmit={handleAddSubmit2Session} id="t">
        <input type="text"
          required
          onChange={(e) => setSessionTitle(e.target.value)}
          value={sessionTitle} />
        <button type='submit'>送信</button>
      </form>
      {sessionData.map((item, index) => (
        <div key={index}>{item.sessionTitle}</div>
      ))}
    </div>
  )
}

export default App
