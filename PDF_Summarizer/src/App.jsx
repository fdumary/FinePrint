import { useState } from 'react'
import './App.css'
import Frontpage from './Frontpage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Frontpage/>
    </>
  )
}

export default App
