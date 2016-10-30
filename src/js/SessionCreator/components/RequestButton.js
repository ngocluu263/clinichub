import React from 'react'

export default class RequestButton extends React.Component {
  handleRequest = () => {
    this.props.store.start()
  }
  render() {
    return (
      <div>
        <button className="btn btn-primary"
          onClick={() => this.props.store.step++}>Request</button>
      </div>
    )
  }
}
