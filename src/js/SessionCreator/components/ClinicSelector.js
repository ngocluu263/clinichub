import React from 'react'
import { observer } from 'mobx-react'

let FieldItem = ({name, selectField, isSelected}) => {
  return (
    <li className={isSelected? 'select': ''}>
      <a href="javascript:;" onClick={selectField}>{name}</a>
    </li>
  )
}

@observer
export default class ClinicSelector extends React.Component {
  filter(e) {
    this.props.store.fieldFilter = e.target.value.trim()
  }

  selectField(field) {
    this.props.store.selectedField = field
  }

  render() {
    const fieldList = this.props.fields.map(field => {
      return (
        <FieldItem
          key={field}
          name={field}
          selectField={this.selectField.bind(this, field)}
          isSelected={field==this.props.store.selectedField} />
      )
    })
    return (
      <div>
        <input type="text" onChange={this.filter.bind(this)} />
        <ul>{ fieldList }</ul>
        <button onClick={() => this.props.store.step++} disabled={!this.props.store.selectedField}>Confirm</button>
        <button onClick={() => this.props.store.step--}>Back</button>
      </div>
    )
  }
}
