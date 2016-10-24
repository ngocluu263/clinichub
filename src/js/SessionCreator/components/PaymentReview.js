import React from 'react'
import { observer } from 'mobx-react'

export default class PaymentReview extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.store.step++}>Confirm</button>
        <button onClick={() => this.props.store.step--}>Back</button>
      </div>
    )
  }
}
