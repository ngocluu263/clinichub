import React from 'react'
import ReactDOM from 'react-dom'
import { autorun } from 'mobx'
import { myFetch } from '../utils'

import SessionCreator from './components/SessionCreator'
import SessionCreatorStore from './stores/SessionCreatorStore'

let initialData = {
  step: 1,
  clinics: [],
  balance: window.balance === undefined? 12345.67: window.balance
}

myFetch.get('/api/clinics/').then(data => {
  initialData.clinics = data
  init()
})

function init() {
  let store = SessionCreatorStore.fromJS(initialData)

  ReactDOM.render(<SessionCreator store={store} />, document.getElementById('session-creator'))
  window.store = store
}
