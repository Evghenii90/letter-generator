export type TextareaProps = {
  value: string
  onChange: (value: string) => void
  maxLength?: number
  label?: string
  placeholder?: string
}
