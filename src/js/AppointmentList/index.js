import React from 'react'
import ReactDOM from 'react-dom'
import { autorun } from 'mobx'

import { myFetch } from '../utils'
import AppointmentListStore from './stores/AppointmentListStore'
import AppointmentList from './components/AppointmentList'

let initialData = {
  page: 'active', // active, cancel, history
  me: window.me || 'patient'
}

let doctor = window.doctor || '582bc4ca5a95ef40981b50bc'
let patient = window.patient

if (patient) var filter = `?patient=${patient}`
else if (doctor) var filter = `?doctor=${doctor}`

myFetch.get(`/api/appointments/${filter}`).then((data) => {
  initialData.appointments = data
  init()
})

function init() {
  let store = AppointmentListStore.fromJS(initialData)
  window.store = store
  ReactDOM.render(<AppointmentList store={store} />, document.getElementById('appointment-list'))
}
