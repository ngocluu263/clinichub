import React from 'react'
import ReactDOM from 'react-dom'
import { autorun, toJS } from 'mobx'
import { myFetch } from '../utils'

import SessionViewerStore from './stores/SessionViewerStore'
import SessionViewer from './components/SessionViewer'

let initialData = {
  page: 'message' 
}

myFetch('/api/get_session', { session_id: '5811a0955a95ef312c781cce' }).then(data => {
  Object.assign(initialData, data)
  init()
})

function init() {
  let store = SessionViewerStore.fromJS(initialData)
  window.store = store

  ReactDOM.render(<SessionViewer store={store} />, document.getElementById('session-viewer'))
}

