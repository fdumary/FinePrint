
import './App.css'
import { HashRouter as Router,Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Genpage from './Pages/Genpage'



function App() {
return(
<Router>
  <Routes>
    <Route path="/"element={<Home/>}/>
    <Route path="/gen"element={<Genpage/>}/>
  </Routes>
</Router>
)
}

export default App
