import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import type { Snippet } from '@/lib/snippet-storage'

import { Copy, Edit3, GripVertical, MoreVertical, Trash2 } from 'lucide-react'
import { forwardRef } from 'react'

import { SnippetContent } from '@/components/SnippetContent'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatDate } from '@/lib/snippet-storage'

interface SnippetCardProps {
  snippet: Snippet
  copySuccess: string | null
  onCopy: (content: string, id: string) => void
  onEdit: () => void
  onDelete: () => void
  isDragging?: boolean
  dragHandleRef?: (element: HTMLElement | null) => void
  dragListeners?: SyntheticListenerMap
}

export const SnippetCard = forwardRef<HTMLDivElement, SnippetCardProps>(
  ({ snippet, copySuccess, onCopy, onEdit, onDelete, isDragging, dragHandleRef, dragListeners, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={`transition-all ${isDragging ? 'rotate-3 shadow-lg' : ''}`}
        {...props}
      >
        <CardContent className="pt-4">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              {/* Drag handle - always visible but styled differently */}
              <div
                ref={dragHandleRef}
                className="flex items-center justify-center size-6 cursor-grab active:cursor-grabbing touch-none sm:opacity-100 opacity-30"
                {...dragListeners}
              >
                <GripVertical className="size-4 text-muted-foreground" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-foreground break-words">
                  {snippet.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {formatDate(snippet.updatedAt)}
                </p>
              </div>

              {/* Desktop buttons */}
              <div className="hidden sm:flex gap-2">
                <Button
                  onClick={() => onCopy(snippet.content, snippet.id)}
                  variant="outline"
                  size="sm"
                >
                  <Copy />
                  {copySuccess === snippet.id ? 'Copied!' : 'Copy'}
                </Button>
                <Button
                  onClick={onEdit}
                  variant="outline"
                  size="sm"
                >
                  <Edit3 />
                  Edit
                </Button>
                <Button
                  onClick={onDelete}
                  variant="outline"
                  size="sm"
                >
                  <Trash2 />
                  Delete
                </Button>
              </div>

              {/* Mobile dropdown menu */}
              <div className="sm:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onCopy(snippet.content, snippet.id)}>
                      <Copy />
                      {copySuccess === snippet.id ? 'Copied!' : 'Copy'}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onEdit}>
                      <Edit3 />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onDelete} className="text-destructive">
                      <Trash2 />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="rounded border bg-muted/30 p-3">
              <SnippetContent
                content={snippet.content}
                className="whitespace-pre-wrap text-sm font-mono text-foreground break-words"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  },
)

SnippetCard.displayName = 'SnippetCard'
