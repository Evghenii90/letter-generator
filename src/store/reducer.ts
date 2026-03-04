import { type Action, type MessageItem } from './types'

export const initialState: MessageItem[] = []

export function reducer(state: MessageItem[], action: Action): MessageItem[] {
  switch (action.type) {
    case 'CREATE_MESSAGE':
      return [...state, action.payload]

    case 'DELETE_MESSAGE':
      return state.filter((msg) => msg.id !== action.payload)

    default:
      return state
  }
}
