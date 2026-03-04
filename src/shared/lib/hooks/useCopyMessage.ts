import { useEffect, useRef, useState } from 'react'

export function useCopyToClipboard(timeout = 2000) {
  const [isCopied, setIsCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const copy = async (value: string) => {
    if (!value) return

    try {
      await navigator.clipboard.writeText(value)
      setIsCopied(true)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setIsCopied(false), timeout)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return { isCopied, copy }
}
