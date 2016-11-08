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
      this.socket.send(JSON.stringify(data))
    })
  }

  pushMessage(msg) {
    this.session.messages.push(msg)
  }

  submitTranscript(data) {
    myFetch('/api/create_transcript', {
      drugs: data.drugs, 
      note: data.note,
      patient: this.session.patient.id,
      doctor: this.session.doctor.id
    }).then(data => {
      this.sendMessage('/create-transcript '+ data.transcript.id)
      this.page = 'message'
    })
  }

  submitAppointment(data) {
    myFetch('/api/create_appointment', {
      note: data.note,
      patient: this.session.patient.id,
      doctor: this.session.doctor.id,
      time: data.date
    }).then(data => {
      this.sendMessage('/create-appointment '+ data.appointment.id)
      this.page = 'message'
    })
  }

  deleteSession() {
    myFetch('/api/delete_session', { session_id: this.session.id}).then(data => {
      if (!data.error_message) {
        if (this.me == 'patient') window.location = '/profile/sessions'
        else window.location = '/doctor/profile/sessions'
      }
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
