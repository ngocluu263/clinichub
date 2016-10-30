import React, { Component } from 'react'

export default class ClinicEditor extends Component {

  render() {
    return (
      <div>
        <button className="btn btn-danger"
          onClick={() => this.props.submit()}>Leave clinic</button>
      </div>
    )
  }
}
