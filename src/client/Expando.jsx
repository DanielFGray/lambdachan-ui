import React, { useState } from 'react'

export default function Expando(props) {
  const [expanded, setExpanded] = useState(false)

  const click = e => {
    e.preventDefault()
    setExpanded(! expanded)
  }

  return expanded
    ? (
      <a href={props.src} onClick={click}>
        <img src={props.src} alt={props.alt} />
      </a>
    ) : (
      <a href={props.src} onClick={click}>
        {props.alt || props.src}
      </a>
    )
}
