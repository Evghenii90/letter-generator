import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Applications } from '../features/applications/Applications'
import { Generators } from '../features/generators/Generators'
import { StoreProvider } from '../store/store'
import './App.css'
import { Layout } from './Layout'

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Applications />} />
            <Route path={'generations'} element={<Generators />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App
