import React from 'react'
import Textarea from 'react-textarea-autosize'
import { markdown } from './utils'

export const UncontrolledEditor = ({
  onChange, value, children, ...props
}) => {
  const content = value || children
  return (
    <>
      <Textarea onChange={onChange} value={content} {...props} />
      <div className="body md_preview">{markdown(content)}</div>
    </>
  )
}
