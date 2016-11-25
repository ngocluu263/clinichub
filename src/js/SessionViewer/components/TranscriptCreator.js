import React, { Component } from 'react'
import _ from 'lodash'
import DrugForm from './DrugForm' 

export default class TranscriptCreator extends Component {
  constructor() {
    super()
    this.state = {
      drugs: []
    }
  }

  handleChange(data) {
    this.state.drugs[data.id][data.key] = data.value
    this.setState(this.state)
  }

  handleDelete(index) {
    this.state.drugs = this.state.drugs.filter(item => item.id != index)
    console.log(this.state.drugs)
    this.setState(this.state)
  }

  addDrugForm() {
    let lastId = !this.state.drugs.length? 0: this.state.drugs[this.state.drugs.length-1].id
    this.state.drugs.push({ id: lastId+1, name: '', amount: 0, usage: '', time: ''})
    this.setState(this.state)
  }

  submit() {
    let drugs = _.cloneDeep(this.state.drugs)
      .filter(drug => drug.name != '' && drug.amount != "0")
      .map(drug => ({
        name: drug.name.trim(),
        amount: parseInt(drug.amount),
        time: drug.time,
        usage: drug.usage.trim()
      }))
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
        <h4>Create Transcript</h4>
        <div className="form">
          <div className="form-group">
            <label>Doctor</label>
            <input type="text" className="form-control" value={this.props.doctor} disabled />
          </div>
          <div className="form-group">
            <label>Patient</label>
            <input type="text" className="form-control" value={this.props.patient} disabled/>
          </div>
          <div className="form-group">
            <label>Note</label>
            <textarea ref="note" id="transcript-note" className="form-control" rows="5"></textarea>
          </div>
          <div className="form-group">
            <label>Drugs</label>
            {drugList}
          </div> 
          <div className="form-group" style={{'textAlign': 'center'}}>
            <button className="btn btn-default"
              onClick={this.addDrugForm.bind(this)}>Add drug</button>
          </div>
          <div className="form-group" style={{'textAlign': 'center'}}>
            <button className="btn btn-success"
              onClick={this.submit.bind(this)}>Create Transcript</button>
            <button className="btn btn-default"
              onClick={this.props.changePage.bind(null, 'message')}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }
}
