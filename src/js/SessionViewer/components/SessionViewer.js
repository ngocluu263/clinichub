import React, { Component } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import Message from './Message'
import SessionList from './SessionList'
import TranscriptCreator from './TranscriptCreator'
import AppointmentCreator from './AppointmentCreator'
import UserInfo from './UserInfo'
import Appointments from './Appointments'

@observer
export default class SessionViewer extends Component {
  render() {
    let { store } = this.props

    let innerComponent = (page => {
      switch (page) {
        case 'message': return (
          <Message
            me={store.me}
            session={toJS(store.session)}
            sendMessage={store.sendMessage.bind(store)}
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
      <div className="row">
        <div className="col-md-3">
          <SessionList title="My Session" sessions={store.sessionList} currentSession={store.session} />
          <SessionList title="Archive Session" sessions={store.sessionListArchive} currentSession={store.session} />
        </div>
        <div className="col-md-6">
          <div className="panel panel-default">
            <div className="panel-heading">{store.session.topic}</div>
            <div className="panel-body">
              { innerComponent }
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <UserInfo me={store.me == 'patient'? 'doctor': 'patient'}
            info={store.me == 'patient'? store.session.doctor: store.session.patient} />
          {(store.session.state == 'active')? (
            <Appointments list={store.appointmentList} />
          ): false }
        </div>
      </div>
    )
  }
}
