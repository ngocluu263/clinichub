import React, { Component } from 'react'
import moment from 'moment'
import { getTimeDiff }  from '../../utils'

function durationToString(duration) {
  let str = ""
  if (duration.years()) str += duration.years() + " years "
  if (duration.months()) str += duration.months() + " months "
  if (duration.days()) str += duration.days() + " days "
  if (duration.hours()) str += duration.hours() + " hours "
  if (duration.minutes()) str += duration.minutes() + " minutes "
  return str
}

let Item = ({appointment, page, me, selected, toggleDetail, doneAppointment, cancelAppointment}) => {
  let time_ = moment(appointment.time)
  let timeStr = time_.format('ddd, DD MMM YYYY HH:mm')
  let userStr = (me == 'doctor')?
    `Patient: ${appointment.patient.fullname}`:
    `Doctor: ${appointment.doctor.fullname}`
  
  const active = selected == appointment.id
  switch (appointment.state) {
    case 'active': var title = durationToString(getTimeDiff(time_)); break;
    case 'cancel': var title = "Canceled"; break;
    case 'history': var title = "Completed"; break;
  }
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-sm-9">
          <h3 className="list-group-item-heading">
            <span>{title}</span>
          </h3>
          <h4 className="list-group-item-heading">
            <span>{timeStr}<br /></span>
            <span>Session: </span>
            <a href={'/session/'+ appointment.session.id}>{appointment.session.topic}</a>
          </h4>
          <p className="list-group-item-text">
            {(active & me == 'patient')?
              <span>Clinic: {appointment.doctor.clinic.name}<br /></span>: false}
            {(active)?
              <span>{userStr}<br /></span>: false}
            {(active)?
              <span>Adress: {appointment.location}<br /></span>: false}
          </p>
          <p>
            {(active)?
              <span>Note: {appointment.note}<br /></span>: false}
          </p>
          { (page == 'active' && active)?
            (<p>
              <button className="btn btn-danger" onClick={() => cancelAppointment(appointment.id)}>Discard</button>
            </p>): false
          }
        </div>
        <div className="col-sm-3" style={{'textAlign': 'right'}}>
          <button className="btn btn-default" onClick={() => toggleDetail(appointment.id)}>
            {(active)? 'Hide Detail': 'Show Detail'}</button>
        </div>
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