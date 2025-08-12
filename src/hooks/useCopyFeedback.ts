import { useEffect, useState } from 'react'
import { copyToClipboard } from '@/lib/snippet-storage'

export function useCopyFeedback() {
  const [copySuccess, setCopySuccess] = useState<string | null>(null)

  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => setCopySuccess(null), 2000)
      return () => clearTimeout(timer)
    }
  }, [copySuccess])

  async function handleCopy(content: string, id: string) {
    const success = await copyToClipboard(content)
    if (success) {
      setCopySuccess(id)
    }
  }

  return { copySuccess, handleCopy }
}
