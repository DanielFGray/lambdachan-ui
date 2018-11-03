import React from 'react'
import GetJson from './GetJson'
import Stringify from './Stringify'

const Board = props => (
  <GetJson url={`https://api.lambdachan.org/v1/boards/${props.match.params.board}`}>
    {({ loading, data, errors }) => {
      if (loading) return 'Loading...'
      if (errors) console.log(errors)
      return data && data.threads.map(e => <Stringify {...e} />)
    }}
  </GetJson>
)

export default Board
