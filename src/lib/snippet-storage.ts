export interface Snippet {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export function generateId(): string {
  return `snippet-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

export function createSnippet(title: string, content: string): Snippet {
  const now = new Date()
  return {
    id: generateId(),
    title: title.trim() || 'Untitled Snippet',
    content: content.trim(),
    createdAt: now,
    updatedAt: now,
  }
}

export function updateSnippet(snippet: Snippet, updates: { title?: string, content?: string }): Snippet {
  return {
    ...snippet,
    ...updates,
    title: updates.title?.trim() ?? snippet.title,
    content: updates.content?.trim() ?? snippet.content,
    updatedAt: new Date(),
  }
}

export async function copyToClipboard(text: string): Promise<{ success: boolean, error?: string }> {
  try {
    await navigator.clipboard.writeText(text)
    return { success: true }
  }
  catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to copy to clipboard',
    }
  }
}

export function formatDate(date: Date): string {
  return `Updated ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`
}
