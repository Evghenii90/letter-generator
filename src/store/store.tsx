import React, { useEffect, useReducer } from 'react'

import { StoreContext } from './context'
import { initialState, reducer } from './reducer'
import { LS_KEY, initFromLocalStorage } from './storage'

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, initFromLocalStorage)

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(state))
  }, [state])

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
}
