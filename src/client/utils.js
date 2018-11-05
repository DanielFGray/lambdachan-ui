import { createElement as h } from 'react'
import Markdown from 'react-markdown'
import Expando from './Expando'

const renderers = {
  image: props => h(Expando, props),
}

export const markdown = source => (
  h(Markdown, { source, renderers })
)
