import React, { Component } from 'react'
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

export default class Message extends Component {
  sendMessage() {
    this.props.sendMessage(this.refs.messageBox.value.trim())
  }

  render() {
    let { session } = this.props
    let MessageList = session.messages.map((item, index) => {
      let side = (item.sender == 'P' && session.me == 'patient')? 'right': 'left'
      return (
        <MessageBox
          key={index}
          msg={item.msg}
          sender={item.sender=='P'? session.patient.name: session.doctor.name}
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
