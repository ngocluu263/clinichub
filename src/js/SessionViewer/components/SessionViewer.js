import React, { Component } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import Message from './Message'
import TranscriptCreator from './TranscriptCreator'

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
            fetchSession={store.fetchSession.bind(store)}
            changePage={store.changePage.bind(store)}
          />
        )
        case 'transcript': return (
          <TranscriptCreator
            doctor={store.session.doctor.name}
            patient={store.session.patient.name}
            submitTranscript={store.submitTranscript.bind(store)}
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
