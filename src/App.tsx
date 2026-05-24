import './App.css'
import SearchAppBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import GotoTopBtn from './components/GoToTopBtn'
function App() {


  return (
    <>
      <SearchAppBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
      <GotoTopBtn />
    </>
  )
}

export default App
