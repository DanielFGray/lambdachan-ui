import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './Layout'
import Home from './Home'
import Board from './Board'
import Thread from './Thread'
import ctx from './ctx'
import 'normalize.css'
import './style.css'

export default class Init extends React.Component {
  state = {
    boards: [],
    author: '',
  }

  getBoards = () => {
    fetch('https://api.lambdachan.org/v1/boards')
      .then(x => x.json())
      .then(boards => this.setState({ boards }))
  }

  componentDidMount() {
    this.getBoards()
  }

  update = patch => { this.setState(patch) }

  render() {
    const { state, update } = this
    if (! state.boards.length) {
      return 'Loading...'
    }
    return (
      <ctx.Provider value={{ ...state, update }}>
        <HelmetProvider>
          <Router basename={__appBase}>
            <Layout>
              <Switch>
                <Route exact path={`/:board/:thread`} component={Thread} />)}
                <Route exact path={`/:board`} component={Board} />)}
                <Route exact path="/" component={Home} />
              </Switch>
            </Layout>
          </Router>
        </HelmetProvider>
      </ctx.Provider>
    )
  }
}

if (document) {
  document.addEventListener('DOMContentLoaded', () => {
    const initData = window.__INIT_DATA // eslint-disable-line no-underscore-dangle
    ReactDOM.render(<Init initData={initData} />, document.getElementById(__mount))
  })
}
