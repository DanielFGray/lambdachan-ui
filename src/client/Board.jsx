import React from 'react'
import { prop, sortBy } from 'ramda'
import { Link } from 'react-router-dom'
import ago from 's-ago'
import GetJson from './GetJson'
import Stringify from './Stringify'

export const OP = ({
  post_num,
  subject,
  author,
  post_time,
  num_replies,
  latest_reply_time,
  comment,
  board,
}) => {
  const date = new Date(post_time)
  return (
    <div className="thread_op" key={post_num}>
      <div className="header">
        <Link to={`/${board}/${post_num}`}>#{post_num}</Link>
        {' '}
        <span className="subject">{subject}</span>
        {' by '}
        {author}
        {' '}
        <a title={date.toLocaleString()} className="date">{ago(date)}</a>
      </div>
      <div className="body">{comment}</div>
      <div className="footer">{num_replies} replies</div>
    </div>
  )
}

const List = ({ sort, data, board, showForm, ...props }) => (
  <div>
    <div>
      <label>sort threads:</label>
      <select onChange={props.inputChange('sort')} value={sort}>
        <option value="latest_reply_time">Last Reply</option>
        <option value="num_replies">Reply Count</option>
      </select>
    </div>
    <button onClick={props.toggle('showForm')} children={showForm ? 'Close' : 'New Thread'} />
    {showForm && <NewPost {...props} />}
    {data && sortBy(prop(sort), data).map(e => OP({ ...e, board }))}
  </div>
)

const NewPost = ({ subject, author, comment, inputChange, submitThread }) => (
  <form onSubmit={submitThread}>
    <div>
      <input value={subject} placeholder="subject" onChange={inputChange('subject')} />
      <input value={author} placeholder="author" onChange={inputChange('author')} />
    </div>
    <textarea value={comment} placeholder="comment" onChange={inputChange('comment')} />
    <input type="submit" value="Send" />
  </form>
)

class ThreadList extends React.Component {
  state = {
    sort: 'latest_reply_time',
    showForm: false,
    subject: '',
    author: '',
    comment: '',
  }

  change = k => e => {
    this.setState({ [k]: e.target.value })
  }

  toggle = k => e => {
    this.setState(s => ({ [k]: ! s[k] }))
  }

  submitThread = e => {
    e.preventDefault()
    const { board } = this.props.match.params
    const body = new FormData()
    body.set('subject', this.state.subject)
    body.set('name', this.state.author)
    body.set('comment', this.state.comment)
    fetch(`https://api.lambdachan.org/v1/boards/${board}`, { method: 'post', body })
      .then(x => x.json())
      .then(({ post_num }) => this.props.history.push(`/${board}/${post_num}`))
  }

  render() {
    const { board } = this.props.match.params
    const { subject, sort, comment, author, showForm } = this.state
    return (
      <GetJson url={`https://api.lambdachan.org/v1/boards/${board}`}>
        {({ loading, data, errors }) => {
          if (loading) return 'Loading...'
          if (errors) {
            console.log(errors)
            return 'an error happened'
          }
          return List({
            data: data.threads,
            inputChange: this.change,
            toggle: this.toggle,
            showForm,
            board,
            sort,
            subject,
            author,
            comment,
            submitThread: this.submitThread,
          })
        }}
      </GetJson>
    )
  }
}

export default ThreadList
