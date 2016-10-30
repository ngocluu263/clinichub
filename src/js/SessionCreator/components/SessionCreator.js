import React from 'react'
import { observer } from 'mobx-react'
import RequestButton from './RequestButton'
import FieldSelector from './FieldSelector'
import ClinicSelector from './ClinicSelector'
import PaymentReview from './PaymentReview'
import SessionDetail from './SessionDetail'
import SessionReview from './SessionReview'

@observer
export default class SessionCreator extends React.Component {
  render() {
    let { store } = this.props
    let { step, title } = store
    let innerComponent = (step => {
      switch (step) {
        case 1: return <RequestButton store={store} />
        case 2: return <FieldSelector store={store} fields={store.selectedFields} />
        case 3: return <ClinicSelector store={store} clinics={store.clinicsWithSelectedField} />
        case 4: return <PaymentReview store={store} balance={store.balance}/>
        case 5: return <SessionDetail store={store} />
        case 6: return <SessionReview store={store} />
      }
    })(step)

    return (
      <div>
        <h3>{title}</h3>
        { innerComponent }
      </div>
    )
  }
}
