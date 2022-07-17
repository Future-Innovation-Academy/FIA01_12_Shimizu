import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
// import gu from 'https://2.bp.blogspot.com/-VhlO-Yfjy_E/Uab3z3RNJQI/AAAAAAAAUVg/fX8VnSVDlWs/s800/janken_gu.png'

const gu = 'https://2.bp.blogspot.com/-VhlO-Yfjy_E/Uab3z3RNJQI/AAAAAAAAUVg/fX8VnSVDlWs/s800/janken_gu.png';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function App() {
  const [count, setCount] = useState(0)
  const [choice, setChoice] = useState()
  const [hand, setHand] = useState()
  const [result, setResult] = useState()

  function janken(hand) {
    const enemyHand = getRandomInt(3)
    const gap = hand - enemyHand
    if (gap === 0) {
      setResult("DRAW")
    } else if (gap == -1 | gap == 2) {
      setResult("You WIN")
    } else {
      setResult("You LOSE")
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <button type="button" onClick={() => { setChoice(getRandomInt(3)), setHand(0), janken(0) }}>
            gu
          </button>
          <button type="button" onClick={() => { setChoice(getRandomInt(3)), setHand(1), janken(1) }}>
            choki
          </button>
          <button type="button" onClick={() => { setChoice(getRandomInt(3)), setHand(2), janken(2) }}>
            pa
          </button>
        </p>
        {/* <p>
          <img src={gu} alt="gu"/>
        </p> */}
        <h3>{result}</h3>
      </header>
    </div>
  )
}

export default App
