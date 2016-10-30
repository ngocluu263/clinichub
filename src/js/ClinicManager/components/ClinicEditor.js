import React, { Component } from 'react'

export default class ClinicEditor extends Component {
  submit() {
    this.props.submit({
      name: this.refs.name.value.trim(),
      description: this.refs.description.value.trim()
    })
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="clinic-name">Clinic name</label>
          <input type="text" id="clinic-name" ref="name"
            defaultValue={this.props.clinic.name} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="clinic-description">Clinic description</label>
          <textarea id="clinic-description" ref="description" 
            defaultValue={this.props.clinic.description} className="form-control" rows="5"></textarea>
        </div>
        <button className="btn btn-success"
          onClick={this.submit.bind(this)}>Edit clinic</button>
      </div>
    )
  }
}
