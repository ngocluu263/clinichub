import { observable } from 'mobx' 
import { myFetch } from '../../utils'

export default class BalanceAdderStore {
  @observable patient
  
  updateBalance(topup, callback) {
    myFetch.patch(`/api/patients/${this.patient.id}/`, { balance: this.patient.balance + topup }).then(data => {
      this.patient.balance = data.balance
      callback()
    })
  }

  static fromJS(data) {
    let store = new BalanceAdderStore()
    Object.assign(store, data)
    return store
  }
}