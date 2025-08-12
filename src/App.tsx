import type { Snippet } from '@/lib/snippet-storage'

import { Plus, Save, X } from 'lucide-react'
import { useState } from 'react'

import { SortableSnippetList } from '@/components/SortableSnippetList'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useCopyFeedback } from '@/hooks/useCopyFeedback'
import { useSnippets } from '@/hooks/useSnippets'
import { createSnippet, updateSnippet } from '@/lib/snippet-storage'
import { Footer } from './components/Footer'

function App() {
  const [snippets, setSnippets] = useSnippets()
  const { copySuccess, handleCopy } = useCopyFeedback()

  // Create form state
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')

  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [snippetToDelete, setSnippetToDelete] = useState<string | null>(null)

  function resetCreateForm() {
    setNewTitle('')
    setNewContent('')
  }

  function resetEditForm() {
    setEditingId(null)
    setEditTitle('')
    setEditContent('')
  }

  function resetDeleteDialog() {
    setDeleteDialogOpen(false)
    setSnippetToDelete(null)
  }

  function handleCreateSnippet() {
    if (!newContent.trim())
      return

    const snippet = createSnippet(newTitle, newContent)
    setSnippets([snippet, ...snippets])
    resetCreateForm()
  }

  function handleStartEdit(snippet: Snippet) {
    setEditingId(snippet.id)
    setEditTitle(snippet.title)
    setEditContent(snippet.content)
  }

  function handleSaveEdit() {
    if (!editingId)
      return

    const original = snippets.find(s => s.id === editingId)!
    const updated = updateSnippet(original, {
      title: editTitle,
      content: editContent,
    })

    setSnippets(snippets.map(s => s.id === editingId ? updated : s))
    resetEditForm()
  }

  function handleDeleteClick(id: string) {
    setSnippetToDelete(id)
    setDeleteDialogOpen(true)
  }

  function handleConfirmDelete() {
    if (!snippetToDelete)
      return

    setSnippets(snippets.filter(s => s.id !== snippetToDelete))
    resetDeleteDialog()
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Snippy</h1>
          <p className="text-muted-foreground">
            Simple snippet manager for your code and text
          </p>
        </div>

        {/* Create New Snippet Form */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Plus className="size-5" />
              <h2 className="text-lg font-semibold">Create New Snippet</h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Snippet title (optional)"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
            />
            <Textarea
              placeholder="Enter your snippet content here..."
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
              rows={6}
            />
            <Button
              onClick={handleCreateSnippet}
              disabled={!newContent.trim()}
              className="w-full"
            >
              <Save />
              Save Snippet
            </Button>
          </CardContent>
        </Card>

        {/* Snippets List */}
        {snippets.length === 0
          ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No snippets yet. Create your first snippet above!
                </CardContent>
              </Card>
            )
          : (
              <SortableSnippetList
                snippets={snippets}
                onSnippetsChange={setSnippets}
                editingId={editingId}
                copySuccess={copySuccess}
                onCopy={handleCopy}
                onEdit={handleStartEdit}
                onDelete={handleDeleteClick}
                editForm={(
                  <Card key={editingId}>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <Input
                          value={editTitle}
                          onChange={e => setEditTitle(e.target.value)}
                          placeholder="Snippet title"
                        />
                        <Textarea
                          value={editContent}
                          onChange={e => setEditContent(e.target.value)}
                          rows={6}
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={handleSaveEdit}
                            size="sm"
                            disabled={!editContent.trim()}
                          >
                            <Save className="mr-2 size-4" />
                            Save
                          </Button>
                          <Button
                            onClick={resetEditForm}
                            variant="outline"
                            size="sm"
                          >
                            <X className="mr-2 size-4" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              />
            )}

        <Footer />
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Snippet</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this snippet? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={resetDeleteDialog}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App
