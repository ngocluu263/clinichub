import { observable, computed } from 'mobx'
import _ from 'lodash'
import { myFetch } from '../../utils'

export default class SessionViewerStore {
  @observable page
  @observable session

  sendMessage(msg) {
    myFetch.post(`/api/sessions/${this.session.id}/push_message/`, {
      msg: msg,
      sender: this.me == 'patient'? 'P': 'D'
    }).then(data => {
      // console.log(data)
      this.socket.send(JSON.stringify(data))
    })
  }

  pushMessage(msg) {
    // console.log(msg)
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
    myFetch.delete(`/api/sessions/${this.session.id}/`).then(res => {
      if (res.status < 400) {
        if (this.me == 'patient') window.location = '/profile/sessions'
        else window.location = '/doctor/profile/sessions'
      } else {
        throw new Error("Bad response from server");
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
