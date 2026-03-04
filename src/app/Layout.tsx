import { Outlet } from 'react-router-dom'

import { Header } from '../shared/ui/Header/Header'

export const Layout = () => {
  return (
    <>
      <Header />
      <main style={{ flex: '1' }}>
        <Outlet />
      </main>
    </>
  )
}
