import * as React from 'react'

export default class extends React.Component {
  state = { expanded: false }

  click = e => {
    e.preventDefault()
    this.setState(s => ({ expanded: ! s.expanded }))
  }

  render() {
    const { expanded } = this.state
    return expanded
      ? (
        <a href={this.props.src} onClick={this.click}>
          <img src={this.props.src} alt={this.props.alt} />
        </a>
      )
      : <a href={this.props.src} onClick={this.click}>{this.props.alt || this.props.src}</a>
  }
}
