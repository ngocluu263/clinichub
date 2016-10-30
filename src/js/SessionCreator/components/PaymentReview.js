import React from 'react'
import { observer } from 'mobx-react'

export default class PaymentReview extends React.Component {
  render() {
    let { balance, selectedClinic } = this.props.store
    let remainder = balance - selectedClinic.price
    return (
      <div>
        <h3 style={{'textAlign': 'center'}}>
          <span>Your balance is {balance}</span><br />
          <span>The {selectedClinic.name} price is {selectedClinic.price}</span><br />
            {(remainder => {
              if (remainder < 0) {
                return (<span>You don't have enough money.</span>)
              } else {
                return (<span>Balance after : {remainder}</span>)
              }
            })(remainder)}
        </h3>
        <button className="btn btn-primary"
          onClick={() => this.props.store.step++} disabled={remainder < 0}>Confirm</button>
        <button className="btn btn-default"
          onClick={() => this.props.store.step--}>Back</button>
      </div>
    )
  }
}
