import React from 'react'
import { observer } from 'mobx-react'
import RequestButton from './RequestButton'
import FieldSelector from './FieldSelector'
import ClinicSelector from './ClinicSelector'

@observer
export default class SessionCreator extends React.Component {
  render() {
    let { store } = this.props
    let { step, title, clinics } = store
    let innerComponent = (step => {
      switch (step) {
        case 1: return <RequestButton store={store} />
        case 2: return <FieldSelector store={store} fields={store.selectedFields} />
        case 3: return <ClinicSelector store={store} clinics={store.clinicsWithSelectedField} />
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
