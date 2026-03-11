import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Applications } from '@/features/applications/Applications.tsx'
import { Generators } from '@/features/generators/ui/Generators.tsx'
import { ROUTES_PATHS } from '@/shared/routes'

import './App.css'
import { Layout } from './Layout'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES_PATHS.MAIN} element={<Layout />}>
          <Route index element={<Applications />} />
          <Route path={ROUTES_PATHS.GENERATION} element={<Generators />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
