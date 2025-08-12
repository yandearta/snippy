import Linkify from 'linkify-react'

interface SnippetContentProps {
  content: string
  className?: string
}

export function SnippetContent({ content, className = '' }: SnippetContentProps) {
  return (
    <pre className={className}>
      <Linkify
        options={{
          target: '_blank',
          rel: 'noreferrer',
          className: 'text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline break-all',
        }}
      >
        {content}
      </Linkify>
    </pre>
  )
}
