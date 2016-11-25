import React from 'react'
import ReactDOM from 'react-dom'
import { autorun } from 'mobx'
import { myFetch } from '../utils'
import BalanceAdder from './components/BalanceAdder'
import BalanceAdderStore from './stores/BalanceAdderStore'

let patient = window.patient || '582bc44f5a95ef40981b50bb'

let initialData = {
  topupList: [5, 10, 15, 20, 25, 30]
}

myFetch.get(`/api/patients/${patient}/`).then((data) => {
  initialData.patient = data
  init()
})

function init() {
  let store = BalanceAdderStore.fromJS(initialData)
  window.store = store
  ReactDOM.render(<BalanceAdder store={store} />, document.getElementById('balance-adder'))
}