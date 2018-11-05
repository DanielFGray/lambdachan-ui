import React from 'react'
import { NavLink as Link } from 'react-router-dom'
import ctx from './ctx'

export default () => (
  <ctx.Consumer>
    {({ boards }) => (
      <ul className="nav">
        {boards.map(({ name, description }) => (
          <li key={name}>
            <Link to={`/${name}`} title={description}>{name}</Link>
          </li>
        ))}
      </ul>
    )}
  </ctx.Consumer>
)
