import type { Snippet } from '@/lib/snippet-storage'

import useLocalStorageState from 'use-local-storage-state'

export function useSnippets() {
  return useLocalStorageState<Snippet[]>('snippets', {
    defaultValue: [],
    serializer: {
      stringify: value => JSON.stringify(value, (key, val) => {
        if (key === 'createdAt' || key === 'updatedAt') {
          return val instanceof Date ? val.toISOString() : val
        }
        return val
      }),
      parse: value => JSON.parse(value, (key, val) => {
        if (key === 'createdAt' || key === 'updatedAt') {
          return typeof val === 'string' ? new Date(val) : val
        }
        return val
      }),
    },
  })
}
