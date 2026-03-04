import { type Dispatch, createContext } from 'react'

import { type Action, type MessageItem } from './types'

export type StoreValue = {
  state: MessageItem[]
  dispatch: Dispatch<Action>
}

export const StoreContext = createContext<StoreValue | null>(null)
