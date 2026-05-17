import './App.css'
import SearchAppBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
function App() {


  return (
    <>
      <SearchAppBar />

      <Routes>
        <Route path="/" element=<Home /> />
      </Routes>

    </>
  )
}

export default App
