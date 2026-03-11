import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { DEFAULT_GENERATOR_TITLE } from '@/shared/constants'
import { type MessageItem } from './types.ts'

export type StoreState = {
  state: MessageItem[]
  createMessage: (item: MessageItem) => void
  updateMessage: (id: string, text: string) => void
  deleteMessage: (id: string) => void
  generatedText: string
  hasGenerated: boolean
  currentMessageId: string | null
  title: string
  loading: boolean
  formKey: number
  setTitle: (title: string) => void
  startLoading: () => void
  failGeneration: (message: string) => void
  completeGeneration: (text: string, messageId: string) => void
  resetForCreateNew: () => void
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      state: [],
      createMessage: (item) =>
        set((current) => ({
          state: [...current.state, item],
        })),
      updateMessage: (id, text) =>
        set((current) => ({
          state: current.state.map((message) =>
            message.id === id ? { ...message, text } : message,
          ),
        })),
      deleteMessage: (id) =>
        set((current) => ({
          state: current.state.filter((message) => message.id !== id),
        })),
      generatedText: '',
      hasGenerated: false,
      currentMessageId: null,
      title: DEFAULT_GENERATOR_TITLE,
      loading: false,
      formKey: 0,
      setTitle: (title) => set({ title }),
      startLoading: () => set({ loading: true }),
      failGeneration: (message) => set({ generatedText: message, loading: false }),
      completeGeneration: (text, messageId) =>
        set({
          generatedText: text,
          hasGenerated: true,
          currentMessageId: messageId,
          title: DEFAULT_GENERATOR_TITLE,
          loading: false,
        }),
      resetForCreateNew: () =>
        set((current) => ({
          generatedText: '',
          hasGenerated: false,
          currentMessageId: null,
          title: DEFAULT_GENERATOR_TITLE,
          loading: false,
          formKey: current.formKey + 1,
        })),
    }),
    {
      name: 'messages-generate',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
