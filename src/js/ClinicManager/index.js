import React from 'react'
import ReactDOM from 'react-dom'
import { autorun } from 'mobx'

import { myFetch } from '../utils'
import ClinicManagerStore from './stores/ClinicManagerStore'
import ClinicManager from './components/ClinicManager'

let initialData = {
  page: 'edit', // edit, invite, leave
  clinicId: window.clinicId || '58151bc65a95ef28bb6567f3',
  doctorId: window.doctorId || '5815bc1f5a95ef3b8dc28d95',
}

init()

function init() {
  let store = ClinicManagerStore.fromJS(initialData)
  window.store = store
  ReactDOM.render(<ClinicManager store={store} />, document.getElementById('clinic-manager'))
}
