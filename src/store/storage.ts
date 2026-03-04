import { type MessageItem } from './types'

export const LS_KEY = 'messages-generate'

export function initFromLocalStorage(defaultState: MessageItem[]): MessageItem[] {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return defaultState

    const parsed = JSON.parse(raw) as MessageItem[]
    return [...parsed]
  } catch {
    return defaultState
  }
}
