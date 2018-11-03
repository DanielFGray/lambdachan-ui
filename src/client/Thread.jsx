import React from 'react'
import ago from 's-ago'
import GetJson from './GetJson'
import { OP } from './Board'

const Comment = ({ post_num, author, time, comment }) => {
  const time_ago = ago(new Date(time))
  return (
    <div className="thread_comment" key={post_num}>
      <div className="header">{time_ago} {author}</div>
      <div className="body">{comment}</div>
    </div>
  )
}

const Board = ({ match: { params } }) => (
  <GetJson url={`https://api.lambdachan.org/v1/boards/${params.board}/${params.id}`}>
    {({ loading, data, errors }) => {
      if (loading) return 'Loading...'
      if (errors) console.log(errors)
      return data && (
        <>
          {OP(data.op)}
          {data.posts.map(Comment)}
        </>
      )
    }}
  </GetJson>
)

export default Board
