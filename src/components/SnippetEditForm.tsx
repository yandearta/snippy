import { Save, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface SnippetEditFormProps {
  title: string
  content: string
  onTitleChange: (title: string) => void
  onContentChange: (content: string) => void
  onSave: () => void
  onCancel: () => void
  saveDisabled?: boolean
}

export function SnippetEditForm({
  title,
  content,
  onTitleChange,
  onContentChange,
  onSave,
  onCancel,
  saveDisabled = false,
}: SnippetEditFormProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <Input
            value={title}
            onChange={e => onTitleChange(e.target.value)}
            placeholder="Snippet title"
          />
          <Textarea
            value={content}
            onChange={e => onContentChange(e.target.value)}
            rows={6}
          />
          <div className="flex gap-2">
            <Button
              onClick={onSave}
              size="sm"
              disabled={saveDisabled}
            >
              <Save />
              Save
            </Button>
            <Button
              onClick={onCancel}
              variant="outline"
              size="sm"
            >
              <X />
              Cancel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
