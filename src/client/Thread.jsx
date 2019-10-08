import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ago from 's-ago'
import useJson from './GetJson'
import { OP } from './Board'
import { markdown } from './utils'
import { UncontrolledEditor } from './PostEditor'

const NewComment = ({
  author,
  comment,
  inputChange,
  submitComment,
}) => (
  <form onSubmit={submitComment}>
    <input value={author} placeholder="author" onChange={inputChange('author')} />
    <div>
      <UncontrolledEditor value={comment} placeholder="comment" onChange={inputChange('comment')} />
    </div>
    <input type="submit" value="Send" />
  </form>
)

const Comment = ({
  post_num,
  board,
  thread,
  author,
  time,
  comment,
}) => {
  const date = new Date(time)
  return (
    <div className="thread_comment" key={post_num}>
      <div className="header">
        <Link to={`/${board.name}/${thread}/#${post_num}`}>{`#${post_num}`}</Link>
        {` by ${author} `}
        <a title={date.toLocaleString()} className="date">{ago(date)}</a>
      </div>
      <div className="body">{markdown(comment)}</div>
    </div>
  )
}

export default function CommentList(props) {
  const [state, setState] = useState({
    author: '',
    comment: '',
    error: null,
  })

  const change = k => e => {
    setState({ ...state, [k]: e.target.value })
  }

  const submitComment = refresh => e => {
    e.preventDefault()
    const { board, thread } = props.match.params
    const body = new FormData()
    body.set('name', state.author)
    body.set('comment', state.comment)
    fetch(`https://api.lambdachan.org/v1/boards/${board}/${thread}`, { method: 'post', body })
      .then(x => x.json())
      .then(x => {
        console.log({ x })
        if (x.error) {
          setState({ ...state, error: x.error })
        } else {
          setState({ ...state, comment: '' })
          refresh()
        }
      })
  }

  const { board, thread } = props.match.params
  const { comment, author, error } = state
  const [{ loading, data, errors }, refresh] = useJson({ url: `https://api.lambdachan.org/v1/boards/${board}/${thread}` })
  if (errors) {
    console.log(errors)
    return <p>an error happened fetching this thread :(</p>
  }
  if (! data && loading) return 'Loading...'
  return data && (
    <div className="thread">
      <OP {...{ board, ...data.op }} />
      {data.posts.map(e => <Comment key={e.post_num} {...{ ...e, board, thread }} />)}
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <NewComment {...{
        submitComment: submitComment(refresh),
        inputChange: change,
        comment,
        author,
      }}
      />
    </div>
  )
}
