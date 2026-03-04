import s from './Container.module.css'

type ContainerProps = {
  children: React.ReactNode
}
export const Container = ({ children }: ContainerProps) => {
  return <div className={s.container}>{children}</div>
}
