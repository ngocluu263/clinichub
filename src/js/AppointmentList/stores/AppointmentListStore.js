import { observable, computed, autorun } from 'mobx'
import { myFetch } from '../../utils'

export default class AppointmentListStore {
  @observable page
  @observable appointments

  static fromJS(data) {
    let store = new AppointmentListStore()
    Object.assign(store, data)
    return store
  }
}
