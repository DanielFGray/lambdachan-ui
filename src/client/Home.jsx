import React from 'react'
import { Link } from 'react-router-dom'
import ctx from './ctx'

export default () => (
  <ctx.Consumer>
    {({ boards }) => (
      <ul>
        {boards.map(({ name, description }) => (
          <li key={name}>
            <Link to={`/${name}`}>{name}</Link>
            {` - ${description}`}
          </li>
        ))}
      </ul>
    )}
  </ctx.Consumer>
)
