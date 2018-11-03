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
  const postTime = ago(new Date(post_time))
  return (
    <div className="thread_op" key={post_num}>
      <div className="header"><Link to={`/${board}/${post_num}`}>#{post_num}</Link> {postTime} {author}</div>
      <div className="body">{comment}</div>
      <div className="footer">{num_replies} replies</div>
    </div>
  )
}

const List = ({ sort, data, board, sortChange }) => (
  <div>
    <div>
      <label>sort threads:</label>
      <select onChange={sortChange} value={sort}>
        <option value="latest_reply_time">Last Reply</option>
        <option value="num_replies">Reply Count</option>
      </select>
    </div>
    {sortBy(prop(sort), data).map(e => OP({ ...e, board }))}
  </div>
)

class ThreadList extends React.Component {
  state = {
    sort: 'latest_reply_time'
  }

  sortChange = e => {
    this.setState({ sort: e.target.value })
  }

  render() {
    const { board } = this.props.match.params
    return (
      <GetJson url={`https://api.lambdachan.org/v1/boards/${board}`}>
        {({ loading, data, errors }) => {
          if (loading) return 'Loading...'
          if (errors) {
            console.log(errors)
            return 'an error happened'
          }
          return data && List({
            data: data.threads,
            sort: this.state.sort,
            sortChange: this.sortChange,
            board,
          })
        }}
      </GetJson>
    )
  }
}

export default ThreadList
