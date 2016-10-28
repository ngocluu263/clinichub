import React from 'react'
import { observer } from 'mobx-react'
import moment from 'moment'

let MessageBox = ({msg, sender, time, side}) => {
  return (
    <div style={ {'textAlign': side} }>
      <b>{sender}: </b>
      <span>{msg} - </span>
      <i>[{time.format('ddd, DD MMM YYYY HH:mm')}]</i>
    </div>
  )
}

@observer
export default class SessionViwer extends React.Component {
  sendMessage(e) {
    let msg = this.refs.messageBox.value.trim()
    if (msg) this.props.store.sendMessage(msg)
  }

  render() {
    let { store } = this.props
    let { session } = store

    let MessageList = session.messages.map((item, index) => {
      let side = (item.sender == 'P' && session.me == 'patient')? 'right': 'left'
      return (
        <MessageBox
          key={index}
          msg={item.msg}
          sender={item.sender=='P'? session.patient: session.doctor}
          side={side}
          time={moment.unix(item.time)}/>
      )
    })
    return (
      <div>
        <h1>{session.topic}</h1>
        <div>{ MessageList }</div>
        <div>
          <input type="text" ref="messageBox" /><br />
          <button onClick={this.sendMessage.bind(this)}>Send</button>
          <button onClick={() => store.fetchSession()}>Refresh</button>
        </div>
      </div>
    )
  }
}
