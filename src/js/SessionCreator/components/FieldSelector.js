import React from 'react'
import { observer } from 'mobx-react'

const FieldItem = ({name, selectField, isSelected}) => {
  return (
    <a className={"list-group-item"+ (isSelected? ' active': '')}
      href="javascript:;" onClick={selectField}>{name}</a>
  )
}

@observer
export default class FieldSelector extends React.Component {
  componentDidMount() {
    this.props.store.selectedField = ""
  }
  
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
        <input type="text" className="form-control" placeholder="Type field name..."
          onChange={this.filter.bind(this)} />
        <div className="list-group">{ fieldList }</div>
        <button className="btn btn-primary"
          onClick={() => this.props.store.step++}
          disabled={!this.props.store.selectedField}>Next</button>
        <button className="btn btn-default"
          onClick={() => this.props.store.step--}>Back</button>
      </div>
    )
  }
}
