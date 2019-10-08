import { createElement as h } from 'react'
import Markdown from 'react-markdown'
import Expando from './Expando'

export const markdown = source => (
  h(Markdown, {
    source,
    renderers: {
      image: props => h(Expando, props),
    },
  })
)
