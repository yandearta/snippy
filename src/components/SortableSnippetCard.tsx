import type { Snippet } from '@/lib/snippet-storage'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { SnippetCard } from './SnippetCard'

interface SortableSnippetCardProps {
  snippet: Snippet
  copySuccess: string | null
  onCopy: (content: string, id: string) => void
  onEdit: () => void
  onDelete: () => void
  isDragging?: boolean
}

export function SortableSnippetCard({ snippet, isDragging, ...props }: SortableSnippetCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging: sortableIsDragging,
  } = useSortable({ id: snippet.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <SnippetCard
        snippet={snippet}
        isDragging={isDragging || sortableIsDragging}
        dragHandleRef={setActivatorNodeRef}
        dragListeners={listeners}
        {...props}
      />
    </div>
  )
}
