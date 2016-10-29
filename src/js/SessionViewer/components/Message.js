import React, { Component } from 'react'
import moment from 'moment'

let modifyMessage = (msg, sender) => {
  if (sender == 'D') {
    if (msg.match(/^\/create-transcript/)) {
      return (
        <span>Create&nbsp; 
          <a href={"/transcript/"+ msg.split(' ')[1]}>Transcript</a>
        </span>
      )
    }
  }
  return msg
}

let MessageBox = ({msg, sender, sender_name, time, side}) => {
  return (
    <div style={ {'textAlign': side} }>
      <b>{sender_name}: </b>
      <span>{modifyMessage(msg, sender)} - </span>
      <i>[{time.format('ddd, DD MMM YYYY HH:mm')}]</i>
    </div>
  )
}

export default class Message extends Component {
  sendMessage() {
    this.props.sendMessage(this.refs.messageBox.value.trim())
  }

  render() {
    let { session, me } = this.props
    let MessageList = session.messages.map((item, index) => {
      let side = ((item.sender == 'P' && me == 'patient') ||
        (item.sender == 'D' && me == 'doctor'))? 'right': 'left'
      return (
        <MessageBox
          key={index}
          msg={item.msg}
          sender={item.sender}
          sender_name={item.sender=='P'? session.patient.name: session.doctor.name}
          side={side}
          time={moment.unix(item.time)}/>
      )
    })
    return (
      <div>
        <h2>Topic: {session.topic}</h2>
        <div>{ MessageList }</div>
        <div>
          <input type="text" ref="messageBox" /><br />
          <button onClick={this.sendMessage.bind(this)}>Send</button>
          <button onClick={this.props.fetchSession}>Refresh</button>
        </div>
        <div>
          <button onClick={this.props.changePage.bind(null, 'transcript')}>Create Transcript</button>
        </div>
      </div>
    )
  }
}
