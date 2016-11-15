import React, { Component } from 'react'
import moment from 'moment'
import _ from 'lodash'

export default class AppointmentCreator extends Component {
  submit() {
    this.props.submitAppointment({
      date: moment(this.refs.date.value).format('YYYY-MM-DDTHH:mm:ss.SSS'),
      note: this.refs.note.value.trim()
    }) 
  }

  render() {
    let now = moment().format('YYYY-MM-DDTHH:mm')
    return (
      <div>
        <h4>Create Appointment</h4>
        <div className="form">
          <div className="form-group">
            <label>Doctor</label>
            <input type="text" className="form-control" value={this.props.doctor} disabled />
          </div>
          <div className="form-group">
            <label>Patient</label>
            <input type="text" className="form-control" value={this.props.patient} disabled/>
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="datetime-local" className="form-control" ref="date"
              defaultValue={now} min={now} />
          </div>
          <div className="form-group">
            <label>Note</label>
            <textarea ref="note" className="form-control" rows="5"></textarea>
          </div>
          <div className="form-group" style={{'textAlign': 'center'}}>
            <button className="btn btn-success"
              onClick={this.submit.bind(this)}>Create Appointment</button>
            <button className="btn btn-default"
              onClick={this.props.changePage.bind(null, 'message')}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }
}
