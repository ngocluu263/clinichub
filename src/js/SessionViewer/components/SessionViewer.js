import React, { Component } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import Message from './Message'

@observer
export default class SessionViwer extends Component {
  sendMessage(msg) {
    if (msg) this.props.store.sendMessage(msg)
  }
  
  render() {
    let { store } = this.props
    return (
      <div>
        <Message
          session={toJS(store.session)}
          sendMessage={this.sendMessage.bind(this)}
          fetchSession={store.fetchSession.bind(store)}/>
      </div>
    )
  }
}
