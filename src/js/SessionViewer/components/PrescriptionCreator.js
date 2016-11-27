import React, { Component } from 'react'
import _ from 'lodash'
import DrugForm from './DrugForm' 

function deriveTimeString(drug) {
  let str = ""
  if (drug.timeType == 'time') {
    let arr = []
    for (var t in drug.time) {
      if (drug.time[t]) arr.push(t)
    }
    str += "Eat at " + arr.join(', ')
  } else if (drug.timeType == 'interval') {
    str += "Eat every "+ drug.interval +" hours"
  }
  return str
}

export default class PrescriptionCreator extends Component {
  constructor() {
    super()
    this.state = {
      drugs: [],
      currentId: 0
    }
    window.obj = this
  }

  handleDelete(id) {
    this.state.drugs = this.state.drugs.filter(item => item.id != id)
    this.setState(this.state)
  }
  
  submit() {
    let drugs = _.cloneDeep(this.state.drugs)
      .filter(drug => drug.name != '' && drug.amount != "0")
      .map(drug => ({
        name: drug.name.trim(),
        amount: parseInt(drug.amount),
        time: deriveTimeString(drug),
        usage: drug.usage.trim()
      }))
    let data = { drugs, note: this.refs.note.value.trim() }
    this.props.submitPrescription(data)
  }

  handleSubmitDrug(data) {
    this.setState({
      drugs: [...this.state.drugs, Object.assign(data, { id: this.state.currentId })],
      currentId: this.state.currentId+1
    })
  }

  render() {
    return (
      <div>
        <h4>Create Prescription</h4>
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
            <textarea ref="note" id="prescription-note" className="form-control" rows="5"></textarea>
          </div>
          <div className="form-group">
            <label>Drugs</label>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Usage</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
              {((list) => list.map((item, index) => (
                <tr key={item.id}>
                  <td>{index+1}</td>
                  <td>{item.name}</td>
                  <td>{item.amount}</td>
                  <td>{deriveTimeString(item)}<br />{item.usage}</td>
                  <td><button className="btn btn-default"
                    onClick={this.handleDelete.bind(this, item.id)}>Delete</button></td>
                </tr>
              )))(this.state.drugs)}
              </tbody>
            </table>
            <div style={{'textAlign': 'center'}}>
              <button type="button" className="btn btn-default" data-toggle="modal" data-target="#myModal">
                Add drug
              </button>
            </div>
          </div>
          <div className="form-group" style={{'textAlign': 'center'}}>
            <button className="btn btn-success" style={{'marginRight': '10px'}}
              onClick={this.submit.bind(this)}>Create Prescription</button>
            <button className="btn btn-default"
              onClick={this.props.changePage.bind(null, 'message')}>Cancel</button>
          </div>
        </div>
        <DrugForm
          handleSubmit={this.handleSubmitDrug.bind(this)}
          handleCancel={() => console.log('cancel')} />
      </div>
    )
  }
}
