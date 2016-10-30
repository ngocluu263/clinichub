import React from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'

const ClinicItem = ({clinic, selectClinic, isSelected}) => {
  return (
    <a className={"list-group-item"+ (isSelected? ' active': '')}
      href="javascript:;" onClick={selectClinic}>
      <h4 className="list-group-item-heading">{clinic.name}</h4>
      <p className="list-group-item-heading">
        {clinic.description}<br />
        Available fields: {clinic.fields.join(', ')}<br />
        Price: {clinic.price}
      </p>
    </a>
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
          clinic={clinic}
          key={clinic.id}
          selectClinic={this.selectClinic.bind(this, clinic)}
          isSelected={clinic==this.props.store.selectedClinic} />
      )
    })
    return (
      <div>
        <h4>Seleted field: {this.props.store.selectedField}</h4>
        <div className="list-group">
          { clinicList }
        </div>
        <button className="btn btn-primary"
          onClick={() => this.props.store.step++}
          disabled={!this.props.store.selectedClinic}>Next</button>
        <button className="btn btn-default"
          onClick={() => this.props.store.step--}>Back</button>
      </div>
    )
  }
}
