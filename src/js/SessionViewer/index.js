import React from 'react'
import ReactDOM from 'react-dom'
import path from 'path'
import { autorun, toJS } from 'mobx'

import { myFetch } from '../utils'
import SessionViewerStore from './stores/SessionViewerStore'
import SessionViewer from './components/SessionViewer'


let initialData = {
  page: 'message',
  me: window.me || 'doctor',
  session: {}
}

let session_id = '5814d04c5a95ef673f893b60'
if (process.env.NODE_ENV == 'production') session_id = path.basename(window.location)

myFetch('/api/get_session', { session_id }).then(data => {
  Object.assign(initialData, data)
  init()
})

function init() {
  let store = SessionViewerStore.fromJS(initialData)
  window.store = store

  ReactDOM.render(<SessionViewer store={store} />, document.getElementById('session-viewer'))
}
