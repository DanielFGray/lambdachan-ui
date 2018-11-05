import React from 'react'
import { Link } from 'react-router-dom'
import ago from 's-ago'
import GetJson from './GetJson'
import { OP } from './Board'

const NewComment = ({ author, comment, inputChange, submitComment }) => (
  <form onSubmit={submitComment}>
    <input value={author} placeholder="author" onChange={inputChange('author')} />
    <div>
      <textarea value={comment} placeholder="comment" onChange={inputChange('comment')} />
    </div>
    <input type="submit" value="Send" />
  </form>
)

const Comment = ({ post_num, board, thread, author, time, comment }) => {
  const time_ago = ago(new Date(time))
  return (
    <div className="thread_comment" key={post_num}>
      <div className="header"><Link to={`/${board}/${thread}/#${post_num}`}>#{post_num}</Link> {time_ago} {author}</div>
      <div className="body">{comment}</div>
    </div>
  )
}

export default class CommentList extends React.Component {
  state = {
    author: '',
    comment: '',
    error: null,
  }

  change = k => e => {
    this.setState({ [k]: e.target.value })
  }

  submitComment = refresh => e => {
    e.preventDefault()
    const { board, thread } = this.props.match.params
    const body = new FormData()
    body.set('name', this.state.author)
    body.set('comment', this.state.comment)
    fetch(`https://api.lambdachan.org/v1/boards/${board}/${thread}`, { method: 'post', body })
      .then(x => x.json())
      .then(x => {
        console.log({ x })
        if (x.error) {
          this.setState({ error: x.error })
        } else {
          this.setState({ comment: '' })
          refresh()
        }
      })
  }

  render() {
    const { board, thread } = this.props.match.params
    const { comment, author, error } = this.state
    return (
      <GetJson url={`https://api.lambdachan.org/v1/boards/${board}/${thread}`}>
        {({ loading, data, errors }, refresh) => {
          if (errors) {
            console.log(errors)
            return <p>an error happened fetching this thread :(</p>
          }
          if (! data && loading) return 'Loading...'
          return data && (
            <>
              {OP({ board, ...data.op })}
              {data.posts.map(e => <Comment key={e.post_num} {...{ ...e, board, thread }}/>)}
              {loading && <div>Loading...</div>}
              {error && <div>{error}</div>}
              {NewComment({
                submitComment: this.submitComment(refresh),
                inputChange: this.change,
                comment,
                author,
              })}
            </>
          )
        }}
      </GetJson>
    )
  }
}
