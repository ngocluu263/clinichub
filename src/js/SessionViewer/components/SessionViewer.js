import React, { Component } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import Message from './Message'
import TranscriptCreator from './TranscriptCreator'
import AppointmentCreator from './AppointmentCreator'

@observer
export default class SessionViewer extends Component {
  sendMessage(msg) {
    if (msg) this.props.store.sendMessage(msg)
  }
  
  render() {
    let { store } = this.props

    let innerComponent = (page => {
      switch (page) {
        case 'message': return (
          <Message
            me={store.me}
            session={toJS(store.session)}
            sendMessage={this.sendMessage.bind(this)}
            changePage={store.changePage.bind(store)}
            deleteSession={store.deleteSession.bind(store)}
          />
        )
        case 'transcript': return (
          <TranscriptCreator
            doctor={store.session.doctor.fullname}
            patient={store.session.patient.fullname}
            submitTranscript={store.submitTranscript.bind(store)}
            changePage={store.changePage.bind(store)}
          />
        )
        case 'appointment': return (
          <AppointmentCreator
            doctor={store.session.doctor.fullname}
            patient={store.session.patient.fullname}
            submitAppointment={store.submitAppointment.bind(store)}
            changePage={store.changePage.bind(store)}
          />
        )
      }
    })(this.props.store.page)

    return (
      <div>
        { innerComponent }
      </div>
    )
  }
}
