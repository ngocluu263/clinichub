import React, { Component } from 'react'
import moment from 'moment'

let modifyMessage = (msg, sender) => {
  if (sender == 'D') {
    if (msg.match(/^\/create-prescription/)) {
      return (
        <span><i>Create a prescription</i></span>
      )
    } else if (msg.match(/^\/create-appointment/)) {
      return (
        <span><i>Create an appointment</i></span>
      )
    }
  }
  return msg
}

export default class Message extends Component {
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
          sender_info={item.sender=='P'? session.patient: session.doctor}
          side={side}
          time={moment(item.time)}/>
      )
    })
    return (
      <div>
        <div id="message-list">{MessageList}</div>
        {(session.state == 'active')? (
          <div>
            <hr />
              <MessageForm sendMessage={this.props.sendMessage} />
            <hr />
            <div>
              {(shouldShow => {
                if (shouldShow) return (
                  <ToolsBox  changePage={this.props.changePage} deleteSession={this.props.deleteSession} />
                )
              })(me == 'doctor')}
            </div>
          </div>
        ): false}
      </div>
    )
  }
}

let MessageBox = ({msg, sender, sender_info, time, side}) => {
  let $img = (
    <div className={`media-${side}`}>
      <img className="media-object img-circle" src={sender_info.img_url} style={{'height': '40px'}} />
    </div>
  )

  let $sender = <b>{sender_info.fullname}</b>
  let $time = <small>{time.format('ddd, DD MMM YYYY HH:mm')}</small>

  return (
    <div className="media">
      {side == 'left'? $img: false}
      <div className="media-body" style={{'textAlign': side}}>
        <big>{modifyMessage(msg, sender)}</big><br />
        <span>
          {side == 'left'? $sender: $time}<span>&nbsp;-&nbsp;</span>
          {side == 'right'? $sender: $time}
        </span>
      </div>
      {side == 'right'? $img: false}
    </div>
  )
}

class MessageForm extends Component {
  sendMessage() {
    var msg = this.refs.messageBox.value.trim()
    if (msg) this.props.sendMessage(msg)
    this.refs.messageBox.value = ""
  }

  render() {
    return (
      <div className="form-inline" style={{'textAlign': 'center'}}>
        <div className="form-group" style={{'marginRight': '10px'}}>
          <input type="text" ref="messageBox" className="form-control" size="50" placeholder="Type a message..."
            onKeyPress={e => { if (e.charCode == 13) this.sendMessage()}}/>
        </div>
        <button className="btn btn-primary"
          onClick={this.sendMessage.bind(this)}>Send</button>
      </div>
    )
  }
}

let ToolsBox = ({changePage, deleteSession}) => {
  return (
    <div style={{'textAlign': 'center'}}>
      <button className="btn btn-default" style={{'marginRight': '10px'}}
        onClick={() => changePage('prescription')}>Create Prescription</button>
      <button className="btn btn-default" style={{'marginRight': '10px'}}
        onClick={() => changePage('appointment')}>Create Appointment</button>
      <button className="btn btn-danger"
        onClick={() => deleteSession()}>Delete Session</button>
    </div>
  )
}