import React from 'react'
import { observer } from 'mobx-react'

@observer
export default class PaymentReview extends React.Component {
  render() {
    let { store } = this.props
    let { completedSession } = store 
    let { session_id, doctor, topic } = completedSession 
    return (
      <div>
        <h4>{topic}</h4>
        <p>
          Doctor: {doctor.name}<br />
          Field: {doctor.field}<br />
        </p>
        <button onClick={() => window.location = `/session/${session_id}` }>Go to session</button>
        <button onClick={() => this.props.store.step--}>Back</button>
      </div>
    )
  }
}
