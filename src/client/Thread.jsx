import React from 'react'
import GetJson from './GetJson'
import Stringify from './Stringify'

const Board = props => (
  <GetJson url={`https://api.lambdachan.org/v1/boards/${props.board}/${props.post_num}`}>
    {({ loading, data, errors }) => {
      if (loading) return 'Loading...'
      if (errors) console.log(errors)
      return data && Stringify(data)
    }}
  </GetJson>
)

export default Board
