import React, { Component } from 'react'

export default class ClinicEditor extends Component {
  constructor() {
    super()
    this.state = {
      doctors: []
    }
  }

  componentDidMount() {
    this.setState({
      doctors: this.props.doctors.map(item => Object.assign(item, { selected: false}))
    })
  }

  toggleDoctor(i) {
    let doctors = this.state.doctors
    doctors[i].selected = !doctors[i].selected
    this.setState({
      doctors
    })
  }

  shouldEnableButton() {
    return this.state.doctors.filter(doctor => doctor.selected == true).length > 0
  }

  submit() {
    let doctors = this.state.doctors.filter(doctor => doctor.selected == true)
      .map(doctor => doctor.id)
    this.props.submit(doctors)
  }

  render() {
    return (
      <div>
        <div className="list-group">
        {
          this.props.doctors.map((item, index) => {
            return (
              <a href="javascript:;" key={item.id}
                onClick={this.toggleDoctor.bind(this, index)}
                className={"list-group-item" + (item.selected? ' active': '')}
              >
                <h4 className="list-group-item-heading">{item.name}</h4>
                <p className="list-group-item-text">Field: {item.field}</p>
              </a>
            )
          })
        }
        </div>
        <button disabled={!this.shouldEnableButton()}
          onClick={this.submit.bind(this)}
          className="btn btn-success">Invite doctors</button>
      </div>
    )
  }
}
