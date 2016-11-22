import React from 'react'
import ReactDOM from 'react-dom'
import path from 'path'
import { autorun } from 'mobx'

import { myFetch } from '../utils'
import SessionViewerStore from './stores/SessionViewerStore'
import SessionViewer from './components/SessionViewer'


let initialData = {
  page: 'message',
  me: window.me || 'doctor',
  session: {}
}

let session_id = '582bc58c5a95ef40981b50be'
if (process.env.NODE_ENV == 'production') session_id = path.basename(window.location)

myFetch.get(`/api/sessions/${session_id}/`).then(data => {
  Object.assign(initialData.session, data)

  let filterUrl = initialData.me == 'doctor'? 'doctor='+ data.doctor.id: 'patient='+ data.patient.id
  let sessionsUrl = '/api/sessions/?' + filterUrl
  let appointmentsUrl = '/api/appointments/?' + filterUrl

  let sessionsPromise = myFetch.get(sessionsUrl)
  let appointmentsPromise = myFetch.get(appointmentsUrl)

  Promise.all([sessionsPromise, appointmentsPromise]).then(data => {
    initialData.sessionList = data[0]
    initialData.appointmentList = data[1]
    init()
  })
})

function init() {
  let store = SessionViewerStore.fromJS(initialData)
  window.store = store

  initSocket(store)

  ReactDOM.render(<SessionViewer store={store} />, document.getElementById('session-viewer'))
}

function initSocket(store) {
  let socket = new WebSocket("ws://" + window.location.hostname + ":8000/chat/"+ session_id);

  store.socket = socket

  socket.onmessage = function(e) {
    store.pushMessage(JSON.parse(e.data))
  }

  socket.onopen = function() {

  }
  
  if (socket.readyState == WebSocket.OPEN) socket.onopen();
}
