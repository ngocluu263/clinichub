import React, { Component } from 'react'

export default class ClinicEditor extends Component {

  render() {
    return (
      <div style={{'textAlign': 'center'}}>
        <button className="btn btn-danger btn-lg"
          onClick={() => this.props.submit()}>Leave clinic</button>
      </div>
    )
  }
}
