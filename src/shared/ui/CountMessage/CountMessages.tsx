import { useStore } from '../../../store/useStore'
import Succes from '../../assets/icons/succes.svg?react'
import s from './CountMessages.module.css'
import { type CountMessagesProps } from './type'

const maxCountMessages = 5

export const CountMessages = ({ type }: CountMessagesProps) => {
  const { state } = useStore()
  const value = maxCountMessages - state.length
  return (
    <>
      {state && state.length >= maxCountMessages && (
        <>
          <span className={s.status}>{state.length}/5 applications generated</span>
          <div className={s.backgroundSuccess}>
            <Succes className={s.successIcon} />
          </div>
        </>
      )}
      {state && state.length >= 0 && state.length < maxCountMessages && (
        <>
          {type === 'header' && (
            <span className={s.status}>
              {state.length}/5 <span className={s.textStatus}>applications generated</span>
            </span>
          )}
          <div className={type === 'header' ? s.dotsHeader : s.dotsBanner}>
            {state.length > 0 &&
              state.map((item) => (
                <span
                  key={item.id}
                  className={type === 'header' ? s.dotHeaderFill : s.dotBannerFill}
                ></span>
              ))}
            {value > 0 &&
              Array.from({ length: value }).map((_, index) => (
                <span key={index} className={type === 'header' ? s.dotHeader : s.dotBanner}></span>
              ))}
          </div>
          {type === 'banner' && <span className={s.status}>{state.length} out of 5</span>}
        </>
      )}
    </>
  )
}
