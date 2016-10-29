import React, { Component } from 'react'
import _ from 'lodash'

class DrugForm extends Component {
  render() {
    let { index, drug, handleChange, handleDelete } = this.props
    return (
      <div>
        <label>
          <span>Name: </span>
          <input type="text" value={drug.name || ""}
            onChange={e => handleChange({id: index, key: 'name', value: e.target.value})} />
        </label>
        <label>
          <span>Amount: </span>
          <input type="number" min="0" value={drug.amount || 0}
            onChange={e => handleChange({id: index, key: 'amount', value: e.target.value})} />
        </label>
        <label>
          <span>Usage: </span>
          <input type="text" value={drug.usage || ""}
            onChange={e => handleChange({id: index, key: 'usage', value: e.target.value})} />
        </label>
        <button onClick={() => handleDelete(drug.id)}>Delete</button>
      </div>
    )
  }
}

export default class TranscriptCreator extends Component {
  constructor() {
    super()
    this.state = {
      drugs: [{ id: 0, name: 'Drug', amount: 1, usage: 'Eat' }, { id: 1, name: 'Duck', amount: 2, usage: 'Hit'}]
    }
  }

  handleChange(data) {
    this.state.drugs[data.id][data.key] = data.value.trim()
    this.setState(this.state)
  }

  handleDelete(index) {
    this.state.drugs = this.state.drugs.filter(item => item.id != index)
    this.setState(this.state)
  }

  addDrugForm() {
    let lastId = !this.state.drugs.length? 0: this.state.drugs[this.state.drugs.length-1].id
    this.state.drugs.push({ id: lastId+1, name: '', amount: 0, usage: ''})
    this.setState(this.state)
  }


  submit() {
    let drugs = _.cloneDeep(this.state.drugs)
      .filter(drug => drug.name != '' && drug.amount != "0")
      .map(drug => ({ name: drug.name, amount: parseInt(drug.amount), usage: drug.usage }))
    let data = { drugs, note: this.refs.note.value.trim() }
    this.props.submitTranscript(data)
  }

  render() {
    let drugList = this.state.drugs.map((item, index) => (
      <DrugForm key={item.id} drug={item} index={index}
        handleChange={this.handleChange.bind(this)}
        handleDelete={this.handleDelete.bind(this)} />
    ))
    return (
      <div>
        <p>
          <span>Doctor: {this.props.doctor}</span>
          <span>Patient: {this.props.patient}</span>
        </p>
        <label htmlFor="transcript-note">Note</label>
        <textarea ref="note" id="transcript-note"></textarea>
        <br />
        <label>Drugs</label>
        <button onClick={this.addDrugForm.bind(this)}>Add drug</button>
        <div>{drugList}</div>
        <button onClick={this.submit.bind(this)}>Submit</button>
      </div>
    )
  }
}
