import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './Layout'
import Home from './Home'
import Board from './Board'
import Thread from './Thread'
import ctx from './ctx'
import 'normalize.css'
import './style.css'
import useJson from './GetJson'

export default function Init() {
  const [author, setAuthor] = useState('')
  const [{ data: boards, loading, error }, getBoards] = useJson({ url: 'https://api.lambdachan.org/v1/boards', initData: [] })

  if (loading || ! boards.length) {
    return 'Loading...'
  }

  return (
    <ctx.Provider value={{
      boards, author, setAuthor, getBoards,
    }}
    >
      <HelmetProvider>
        <Router basename={__appBase}>
          <Layout>
            <Switch>
              <Route exact path="/:board/:thread" component={Thread} />
              <Route exact path="/:board" component={Board} />
              <Route exact path="/" component={Home} />
            </Switch>
          </Layout>
        </Router>
      </HelmetProvider>
    </ctx.Provider>
  )
}

if (document) {
  document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<Init />, document.getElementById(__mount))
  })
}
