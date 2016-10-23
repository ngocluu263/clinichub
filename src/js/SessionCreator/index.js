import React from 'react'
import ReactDOM from 'react-dom'
import { action } from 'mobx'

import SessionCreator from './components/SessionCreator'
import SessionCreatorStore from './stores/SessionCreatorStore'

let initialData = {
  step: 1,
  clinics: [
    {id: "1", name: "Clinic1", fields: ["Eye", "Dentist"]},
    {id: "2", name: "Clinic2", fields: ["Eye", "Bone", "Skin"]},
    {id: "3", name: "Clinic3", fields: ["Bone", "Skin"]},
  ]
}

let store = SessionCreatorStore.fromJS(initialData)

ReactDOM.render(<SessionCreator store={store} />, document.getElementById('session-creator'))

window.store = store
