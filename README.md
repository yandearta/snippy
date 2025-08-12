# Snippy

A simple, clean, and modern code/text snippet manager built with React, Vite, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- ⚡ **Fast**: Instant load and update, powered by Vite and React
- 💾 **Persistent**: All snippets are saved in your browser's localStorage
- 📝 **CRUD**: Create, edit, delete, and copy snippets easily
- 🔗 **Clickable Links**: URLs in snippets are automatically clickable
- 📱 **Responsive**: Works great on desktop and mobile
- 🟰 **Drag & Drop**: Reorder snippets with drag handle (dnd-kit)
- 🧩 **Modern UI**: Uses shadcn/ui and Lucide icons

## Usage

1. **Add a snippet**: Fill the form and click "Save Snippet"
2. **Edit**: Click the edit button on a snippet
3. **Delete**: Click the delete button and confirm
4. **Copy**: Click the copy button to copy snippet content
5. **Reorder**: Drag the handle (⋮⋮) to reorder snippets

## Tech Stack

- React + Vite + TypeScript
- Tailwind CSS
- shadcn/ui (New York theme)
- dnd-kit (drag and drop)
- linkify-react (auto-link URLs)
- use-local-storage-state (localStorage hook)

## Development

```bash
pnpm install
pnpm dev
```
