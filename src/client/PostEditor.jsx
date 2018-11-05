import React from 'react'
import { markdown } from './utils'

export default ({ onChange, value, children, ...props }) => {
  const content = value || children
  return (
    <div className="editor">
      <textarea onChange={onChange} value={content} {...props} />
      <div className="md_preview">{markdown(content)}</div>
    </div>
  )
}
