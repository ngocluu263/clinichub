import React, { Component } from 'react'

export default class ClinicEditor extends Component {
  submit() {
    this.props.submit({
      name: this.refs.name.value.trim(),
      description: this.refs.description.value.trim(),
      price: parseFloat(this.refs.price.value.trim()),
      img_url: this.refs.img_url.value.trim()
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
        <div className="form-group">
          <label htmlFor="clinic-price">Clinic rate</label>
          <input type="text" id="clinic-price" ref="price"
            defaultValue={this.props.clinic.price} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="clinic-img_url">Clinic avatar</label>
          <input type="text" id="clinic-img_url" ref="img_url"
            defaultValue={this.props.clinic.img_url} className="form-control" />
        </div>
        <button className="btn btn-success"
          onClick={this.submit.bind(this)}>Edit clinic</button>
      </div>
    )
  }
}
