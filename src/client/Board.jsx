import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import ago from 's-ago'
import useJson from './GetJson'
import Stringify from './Stringify'
import { markdown } from './utils'
import { UncontrolledEditor } from './PostEditor'
import ctx from './ctx'

const sortBy = (key, data) => data.sort((a, b) => {
  const [aa, bb] = [a[key], b[key]]
  return aa < bb ? 1 : aa > bb ? -1 : 0
})

const NewPost = ({
  subject,
  author,
  comment,
  inputChange,
  submitThread,
}) => (
  <form onSubmit={submitThread} className="new_thread">
    <input value={subject} placeholder="subject" onChange={inputChange('subject')} />
    <input value={author} placeholder="author" onChange={inputChange('author')} />
    <UncontrolledEditor value={comment} placeholder="comment" onChange={inputChange('comment')} />
    <input type="submit" value="Send" />
  </form>
)

export const OP = ({
  post_num,
  subject,
  author,
  post_time,
  num_replies,
  comment,
  board,
}) => {
  const date = new Date(post_time)
  return (
    <div className="thread_op" key={post_num}>
      <div className="header">
        <Link to={`/${board.name}/${post_num}`}>{`#${post_num}`}</Link>
        {' '}
        <span className="subject">{subject}</span>
        {' by '}
        {author}
        {' '}
        <a title={date.toLocaleString()} className="date">{ago(date)}</a>
      </div>
      <div className="body">{markdown(comment)}</div>
      <div className="footer">{`${num_replies} replies`}</div>
    </div>
  )
}

const List = ({
  sortKey,
  data,
  board,
  showForm,
  ...props
}) => (
  <div className="board">
    <h3>{`/${board.name}/ - ${board.description}`}</h3>
    <div className="controls">
      <div className="sort">
        <label>sort threads: </label>
        <select onChange={props.inputChange('sortKey')} value={sortKey}>
          <option value="latest_reply_time">Last Reply</option>
          <option value="num_replies">Reply Count</option>
        </select>
      </div>
      <div className="formToggle">
        <button onClick={props.toggle('showForm')} children={showForm ? 'Close' : 'New Thread'} />
      </div>
    </div>
    {showForm && <NewPost {...props} />}
    <div className="threadlist">
      {data && sortBy(sortKey, data).map(e => (
        <Link to={`/${board.name}/${e.post_num}`}>
          <OP {...{ ...e, board }} />
        </Link>
      ))}
    </div>
  </div>
)

export default function ThreadList(props) {
  const [state, setState] = useState({
    sortKey: 'latest_reply_time',
    showForm: false,
    subject: '',
    author: '',
    comment: '',
  })

  const inputChange = k => e => {
    setState({ ...state, [k]: e.target.value })
  }

  const toggle = k => () => {
    setState({ ...state, [k]: ! state[k] })
  }

  const submitThread = e => {
    e.preventDefault()
    const { board } = props.match.params
    const body = new FormData()
    body.set('subject', state.subject)
    body.set('name', state.author)
    body.set('comment', state.comment)
    fetch(`https://api.lambdachan.org/v1/boards/${board}`, { method: 'post', body })
      .then(x => x.json())
      .then(({ post_num }) => props.history.push(`/${board}/${post_num}`))
  }

  const { boards } = useContext(ctx)
  const board = boards.find(({ name }) => name === props.match.params.board)
  const [{ loading, data, errors }] = useJson({ url: `https://api.lambdachan.org/v1/boards/${board.name}` })

  if (loading) return 'Loading...'
  if (errors) {
    console.log(errors)
    return 'an error happened'
  }
  return (
    <List {...{
      ...state,
      data: data.threads,
      inputChange,
      toggle,
      board,
      submitThread,
    }}
    />
  )
}
