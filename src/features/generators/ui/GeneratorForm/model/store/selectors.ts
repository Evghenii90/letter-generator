import { type MessageItem } from './types.ts'
import { type StoreState } from './useStore.ts'

export const selectMessages = (s: StoreState): MessageItem[] => s.state
export const selectMessagesCount = (s: StoreState): number => s.state.length
export const selectCreateMessage = (s: StoreState): StoreState['createMessage'] => s.createMessage
export const selectUpdateMessage = (s: StoreState): StoreState['updateMessage'] => s.updateMessage
export const selectDeleteMessage = (s: StoreState): StoreState['deleteMessage'] => s.deleteMessage
export const selectGeneratedText = (s: StoreState): string => s.generatedText
export const selectHasGenerated = (s: StoreState): boolean => s.hasGenerated
export const selectCurrentMessageId = (s: StoreState): string | null => s.currentMessageId
export const selectTitle = (s: StoreState): string => s.title
export const selectLoading = (s: StoreState): boolean => s.loading
export const selectFormKey = (s: StoreState): number => s.formKey
export const selectSetTitle = (s: StoreState): StoreState['setTitle'] => s.setTitle
export const selectStartLoading = (s: StoreState): StoreState['startLoading'] => s.startLoading
export const selectFailGeneration = (s: StoreState): StoreState['failGeneration'] =>
  s.failGeneration
export const selectCompleteGeneration = (s: StoreState): StoreState['completeGeneration'] =>
  s.completeGeneration
export const selectResetForCreateNew = (s: StoreState): StoreState['resetForCreateNew'] =>
  s.resetForCreateNew
