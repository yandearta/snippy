import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'

import type { Snippet } from '@/lib/snippet-storage'
import {
  closestCenter,
  DndContext,

  DragOverlay,

  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useState } from 'react'
import { SortableSnippetCard } from './SortableSnippetCard'

interface SortableSnippetListProps {
  snippets: Snippet[]
  onSnippetsChange: (snippets: Snippet[]) => void
  editingId: string | null
  copySuccess: string | null
  onCopy: (content: string, id: string) => void
  onEdit: (snippet: Snippet) => void
  onDelete: (id: string) => void
  editForm: React.ReactNode
}

export function SortableSnippetList({
  snippets,
  onSnippetsChange,
  editingId,
  copySuccess,
  onCopy,
  onEdit,
  onDelete,
  editForm,
}: SortableSnippetListProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    }),
  )

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = snippets.findIndex(snippet => snippet.id === active.id)
      const newIndex = snippets.findIndex(snippet => snippet.id === over?.id)

      onSnippetsChange(arrayMove(snippets, oldIndex, newIndex))
    }

    setActiveId(null)
  }

  const activeSnippet = snippets.find(snippet => snippet.id === activeId)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={snippets.map(s => s.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {snippets.map(snippet => (
            editingId === snippet.id
              ? editForm
              : (
                  <SortableSnippetCard
                    key={snippet.id}
                    snippet={snippet}
                    copySuccess={copySuccess}
                    onCopy={onCopy}
                    onEdit={() => onEdit(snippet)}
                    onDelete={() => onDelete(snippet.id)}
                  />
                )
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeSnippet
          ? (
              <SortableSnippetCard
                snippet={activeSnippet}
                copySuccess={copySuccess}
                onCopy={onCopy}
                onEdit={() => {}}
                onDelete={() => {}}
                isDragging
              />
            )
          : null}
      </DragOverlay>
    </DndContext>
  )
}
