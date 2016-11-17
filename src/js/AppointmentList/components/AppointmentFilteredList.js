import React, { Component } from 'react'
import moment from 'moment'

let Item = ({appointment}) => {
  let timeStr = moment(appointment.time).format('ddd, DD MMM YYYY HH:mm')
  return (
    <li className="list-group-item row">
      <div className="col-sm-8">
        <h4 className="list-group-item-heading">{timeStr}</h4>
        <p className="list-group-item-text">
          <span>Patient: {appointment.patient.fullname}</span><br />
          <span>Doctor: {appointment.doctor.fullname}</span><br />
          <span>Clinic: {appointment.doctor.clinic.name}</span><br />
          <span>Location: {appointment.location}</span><br />
        </p>
      </div>
      <div className="col-sm-4">
        <button className="btn btn-primary">Detail</button>
        <button className="btn btn-default">Cancel</button>
      </div>
    </li>
  )
}

let ItemSelected = ({}) => {
  return (<div>item selected</div>)
}

export default class AppointmentFilteredList extends Component {
  render() {
    let { list } = this.props
    let ItemList = list.map(item => {
      return <Item key={item.id} appointment={item} />
    })
    
    return (
      <ul className="list-group">
        {ItemList}
      </ul>
    )
  }
}