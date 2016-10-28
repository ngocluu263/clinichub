import { observable, computed } from 'mobx'
import _ from 'lodash'
import { myFetch } from '../../utils'

export default class SessionViewerStore {
  @observable page
  @observable session

  sendMessage(msg) {
    myFetch('/api/send_message', {
      session_id: this.session.id,
      msg: msg,
      sender: this.session.me == 'patient'? 'P': 'D'
    }).then(data => {
      this.fetchSession()
    })
  }

  fetchSession() {
    myFetch('/api/get_session', { session_id: this.session.id }).then(data => {
      Object.assign(this, data)
    })
  }

  static fromJS(data) {
    const store = new SessionViewerStore()   
    Object.assign(store, data)
    return store
  }
}
