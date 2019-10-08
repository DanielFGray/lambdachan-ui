import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import ctx from './ctx'

export default function Home() {
  const { boards } = useContext(ctx)
  return (
    <>
      <h1>Welcome!</h1>
      <ul>
        {boards.map(({ name, description }) => (
          <li key={name}>
            <Link to={`/${name}`}>{name}</Link>
            {` - ${description}`}
          </li>
        ))}
      </ul>
    </>
  )
}
