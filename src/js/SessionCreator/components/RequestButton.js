import React from 'react'

export default class RequestButton extends React.Component {
  handleRequest = () => {
    this.props.store.start()
  }
  render() {
    return (
      <div>
        <button onClick={() => this.props.store.step++}>Request</button>
      </div>
    )
  }
}
