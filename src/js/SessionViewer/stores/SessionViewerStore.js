import { observable, computed } from 'mobx'
import _ from 'lodash'
import { myFetch, getTimeDiff } from '../../utils'

export default class SessionViewerStore {
  @observable page
  @observable session

  sendMessage(msg) {
    myFetch.post(`/api/sessions/${this.session.id}/push_message/`, {
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
    myFetch.post('/api/transcripts/', {
      drugs: data.drugs, 
      note: data.note,
      patient: this.session.patient.id,
      doctor: this.session.doctor.id
    }).then(data => {
      this.sendMessage('/create-transcript '+ data.id)
      this.page = 'message'
    })
  }

  submitAppointment(data) {
    myFetch.post('/api/appointments/', {
      note: data.note,
      patient: this.session.patient.id,
      doctor: this.session.doctor.id,
      time: data.date,
      location: data.location,
      session: this.session.id
    }).then(data => {
      this.sendMessage('/create-appointment '+ data.id)
      this.page = 'message'
    })
  }

  deleteSession() {
    myFetch.patch(`/api/sessions/${this.session.id}/`, { state: 'archive' }).then(data => {
      if (data) {
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
    data.appointmentList = data.appointmentList.filter(app => {
      return app.state == 'active' && getTimeDiff(app.time).as('milliseconds') > 0
    })
    Object.assign(store, data)
    return store
  }
}
