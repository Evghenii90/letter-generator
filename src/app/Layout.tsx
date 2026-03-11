import { Outlet } from 'react-router-dom'
import { Header } from '@/widgets/Header/Header'
import styles from './Layout.module.scss'

export const Layout = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  )
}
