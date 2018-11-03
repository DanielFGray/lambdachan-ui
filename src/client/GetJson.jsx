import React from 'react'
import PropTypes from 'prop-types'

export default class GetJson extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
  }

  state = {
    data: null,
    error: null,
    loading: true,
  }

  componentDidMount() {
    this.fetch(this.props.url)
  }

  componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      this.fetch(this.props.url)
    }
  }

  fetch = url => {
    this.setState({ loading: true })
    fetch(url)
      .then(x => x.json())
      .then(data => this.setState({ data, loading: false, error: null }))
      .catch(e => this.setState({ error: e, loading: false }))
  }

  render() {
    return this.props.children(this.state, this.fetch)
  }
}
