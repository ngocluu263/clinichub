import React, { Component } from 'react'
import moment from 'moment'

let Item = ({appointment, page, me, selected, toggleDetail, doneAppointment, cancelAppointment}) => {
  let time_ = moment(appointment.time)
  let timeStr = time_.format('ddd, DD MMM YYYY HH:mm')
  let userStr = (me == 'doctor')?
    `Patient: ${appointment.patient.fullname}`:
    `Doctor: ${appointment.doctor.fullname}`
  let now = moment()
  
  const active = selected == appointment.id
  const isTimeUp = time_.isBefore(now)
  return (
    <li className="list-group-item row">
      <div className="col-sm-9">
        <h4 className="list-group-item-heading">
          <span>{timeStr}</span>
          <small>&nbsp;&nbsp;{appointment.session.topic} Session</small>
        </h4>
        <p className="list-group-item-text">
          <span>{userStr}<br /></span>
          {(active & me == 'patient')?
            <span>Clinic: {appointment.doctor.clinic.name}<br /></span>: false}
          {(active)?
            <span>Location: {appointment.location}<br /></span>: false}
          {(active)?
            <span>Note: {appointment.note}<br /></span>: false}
        </p>
        { (page == 'active')?
          (<p>
            {(active && isTimeUp)?
              <button className="btn btn-success" onClick={() => doneAppointment(appointment.id)}>Done</button>: false}
            {(active)?
              <button className="btn btn-danger" onClick={() => cancelAppointment(appointment.id)}>Discard</button>: false}
          </p>): false
        }
      </div>
      <div className="col-sm-3" style={{'textAlign': 'right'}}>
        <button className="btn btn-default" onClick={() => toggleDetail(appointment.id)}>
          {(active)? 'Hide Detail': 'Show Detail'}</button>
      </div>
    </li>
  )
}

export default class AppointmentFilteredList extends Component {
  constructor() {
    super()
    this.state = {
      selected: ''
    }
  }

  componentWillReceiveProps() {
    this.setState({
      selected: ''
    })
  }

  toggleDetail(id) {
    this.setState({
      selected: (this.state.selected == id)? '': id
    })
  }

  render() {
    let { list } = this.props
    let ItemList = list.map(item => {
      return <Item
        key={item.id}
        appointment={item}
        me={this.props.me}
        selected={this.state.selected}
        toggleDetail={this.toggleDetail.bind(this)}
        page={this.props.page}
        doneAppointment={this.props.doneAppointment}
        cancelAppointment={this.props.cancelAppointment}
        />
    })
    
    return (
      <ul className="list-group">
        {ItemList}
      </ul>
    )
  }
}