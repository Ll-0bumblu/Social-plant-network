import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import DetectorPage from './pages/DetectorPage/DetectorPage'
import GardenPage from './pages/GardenPage/GardenPage'
import CalendarPage from './pages/CalendarPage/CalendarPage'

import './App.css'

function App() {
const queryClient = new QueryClient({})

  return (
    <QueryClientProvider client={queryClient}>
      <Header/>
      <Routes>
        <Route path='/' element={<GardenPage/>}/>
        <Route path='/detector' element={<DetectorPage/>}/>
        <Route path='kalendar' element={<CalendarPage/>}/>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  )
}

export default App
