import { createElement as h } from 'react'
import Markdown from 'react-markdown'

export const markdown = source => (
  h(Markdown, { source })
)
