import React from 'react'
import { observer } from 'mobx-react'

const ClinicItem = ({id, name, selectClinic, isSelected}) => {
  return (
    <li className={isSelected? 'select': ''}>
      <a href="javascript:;" onClick={selectClinic}>{id}: {name}</a>
    </li>
  )
}

@observer
export default class ClinicSelector extends React.Component {
  selectClinic(clinic) {
    this.props.store.selectedClinic = clinic
  }

  render() {
    const clinicList = this.props.clinics.map(clinic => {
      return (
        <ClinicItem
          key={clinic.id}
          id={clinic.id}
          name={clinic.name}
          selectClinic={this.selectClinic.bind(this, clinic)}
          isSelected={clinic==this.props.store.selectedClinic} />
      )
    })
    return (
      <div>
        <p>Seleted field: {this.props.store.selectedField}</p>
        <ul>
          { clinicList }
        </ul>
        <button onClick={() => this.props.store.step++} disabled={!this.props.store.selectedClinic}>Confirm</button>
        <button onClick={() => this.props.store.step--}>Back</button>
      </div>
    )
  }
}
