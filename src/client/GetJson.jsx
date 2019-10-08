import { useState, useEffect } from 'react'

export default function useJson({ autoFetch = true, ...props }) {
  const [state, _setState] = useState({
    data: props.initData || null,
    error: null,
    loading: true,
  })

  const setState = patch => _setState({ ...state, ...patch })

  const refetch = (url = props.url, { ...opts }) => {
    if (! url) throw new Error('refetch needs a url')

    setState({ loading: true })
    fetch(url, { ...props, ...opts })
      .then(x => x.json())
      .then(data => setState({ data, error: null, loading: false }))
      .catch(e => setState({ error: e.message, loading: false }))
  }

  useEffect(() => {
    if (props.url && autoFetch) {
      refetch()
    }
  }, [props.url])

  return [state, refetch]
}
