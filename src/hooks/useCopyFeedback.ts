import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { copyToClipboard } from '@/lib/snippet-storage'

export function useCopyFeedback() {
  const [copySuccess, setCopySuccess] = useState<string | null>(null)

  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => setCopySuccess(null), 2000)
      return () => clearTimeout(timer)
    }
  }, [copySuccess])

  async function handleCopy(content: string, id: string, title: string) {
    const result = await copyToClipboard(content)
    if (result.success) {
      setCopySuccess(id)
      toast.success(`Snippet "${title}" copied to clipboard!`)
    }
    else {
      toast.error(`Copy failed: ${result.error}`)
    }
  }

  return { copySuccess, handleCopy }
}
