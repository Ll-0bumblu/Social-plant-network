import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import DetectorPage from './pages/DetectorPage/DetectorPage'
import GardenPage from './pages/GardenPage/GardenPage'

import './App.css'

function App() {

  return (
    <>
    <Header/>
      <Routes>
        <Route path='/garden' element={<GardenPage/>}/>
        <Route path='/detector' element={<DetectorPage/>}/>
      </Routes>
    </>
  )
}

export default App
