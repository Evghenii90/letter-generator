import { useEffect, useRef, useState } from 'react'

import copyToClipboard from 'copy-to-clipboard'

export function useCopyToClipboard(timeout = 2000) {
  const [isCopied, setIsCopied] = useState(false)
  const timerReference = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timerReference.current) clearTimeout(timerReference.current)
    }
  }, [])

  const copy = (value: string) => {
    if (!value) return

    const success = copyToClipboard(value)
    if (!success) return

    setIsCopied(true)
    if (timerReference.current) clearTimeout(timerReference.current)
    timerReference.current = setTimeout(() => setIsCopied(false), timeout)
  }

  return { isCopied, copy }
}
