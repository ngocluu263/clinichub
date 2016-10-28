import React from 'react'
import ReactDOM from 'react-dom'
import { autorun } from 'mobx'
import { myFetch } from '../utils'

import SessionViewerStore from './stores/SessionViewerStore'
import SessionViewer from './components/SessionViewer'

let initialData = {
  page: 'session' 
}

myFetch('/api/get_session', { session_id: '5811a0955a95ef312c781cce' }).then(data => {
  console.log(data)
  Object.assign(initialData, data)
  init()
})

function init() {
  let store = SessionViewerStore.fromJS(initialData)
  console.log(store)
  window.store = store

  ReactDOM.render(<SessionViewer store={store} />, document.getElementById('session-viewer'))
}

