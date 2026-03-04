export type MessageItem = {
  id: string
  text: string
}

export type CreateMessageAction = {
  type: 'CREATE_MESSAGE'
  payload: MessageItem
}

export type DeleteMessageAction = {
  type: 'DELETE_MESSAGE'
  payload: string
}

export type Action = CreateMessageAction | DeleteMessageAction
