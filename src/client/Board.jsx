import React from 'react'
import GetJson from './GetJson'
import Thread from './Thread'

const Board = props => (
  <GetJson url={`https://api.lambdachan.org/v1/boards/${props.match.params.board}`}>
    {({ loading, data, errors }) => {
      if (loading) return 'Loading...'
      if (errors) console.log(errors)
      return data && data.threads.map(e => <Thread key={e.post_num} board={props.match.params.board} {...e} />)
    }}
  </GetJson>
)

export default Board
