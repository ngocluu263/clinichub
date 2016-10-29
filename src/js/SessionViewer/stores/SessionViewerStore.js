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
      sender: this.me == 'patient'? 'P': 'D'
    }).then(data => {
      this.fetchSession()
    })
  }

  fetchSession() {
    myFetch('/api/get_session', { session_id: this.session.id }).then(data => {
      Object.assign(this, data)
    })
    this.page = 'message'
  }

  submitTranscript(data) {
    myFetch('/api/create_transcript', {
      drugs: data.drugs, 
      note: data.note,
      patient: this.session.patient.id,
      doctor: this.session.doctor.id
    }).then(data => {
      this.sendMessage('/create-transcript '+ data.transcript.id)
    })
  }

  changePage(page) {
    this.page = page
  }

  static fromJS(data) {
    const store = new SessionViewerStore()   
    Object.assign(store, data)
    return store
  }
}
