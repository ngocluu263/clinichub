import React, { Component } from 'react'
import _ from 'lodash'

export default ({handleSubmit, handleCancel}) => {
  return (
    <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div className="modal-dialog" role="document">
        <DrugForm handleSubmit={handleSubmit} handleCancel={handleCancel} />
      </div>
    </div>
  )
}

class DrugForm extends Component {
  constructor() {
    super()
    this.initialState = {
      drug: {
        name: '',
        amount: 1,
        note: '',
        usage: '',
        timeType: 'time',
        time: {
          morning: true,
          afternoon: false,
          evening: true,
          night: false
        },
        interval: 6
      },
      msg: ''
    }
    this.state = _.cloneDeep(this.initialState)
  }

  changeTimeType(timeType) {
    this.setState({ drug: Object.assign(this.state.drug, { timeType }) })
  }

  changeInterval() {
    let interval = parseInt(this.refs.interval.value.trim())
    this.setState({ drug: Object.assign(this.state.drug, { interval }) })
  }

  toggleTime(time) {
    let obj = {}
    obj[time] = !this.state.drug.time[time]
    this.state.drug.time = Object.assign(this.state.drug.time, obj)
    this.setState(this.state)
  }

  submit() {
    let drug = this.state.drug
    if (drug.name.trim() == '') {
      this.setState({ msg: 'Name mustn\'t be empty' })
    } else if (drug.amount == 0) {
      this.setState({ msg: 'Amount mustn\'t be zero' })
    } else if (this.state.drug.timeType == 'time' && !(() => {
      let check = false
      for (var time in drug.time) if (drug.time[time]) check = true
      return check
    })()) {
      this.setState({ msg: 'Please select at least one time' })
    } else {
      drug = Object.assign(drug, { name: drug.name.trim(), usage: drug.usage.trim() })
      this.props.handleSubmit(drug)
      this.reset()
    }
  }

  reset() {
    $('#myModal').modal('hide')
    this.setState(_.cloneDeep(this.initialState))
  }

  render() {
    let { drug } = this.state
    return (
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 className="modal-title" id="myModalLabel">{drug.name.trim() || 'Unnamed drug'}</h4>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <input type="text" className="form-control" value={drug.name || ""} placeholder="Drug name"
              onChange={e => this.setState({ drug: Object.assign(drug, { name: e.target.value }) })} />
          </div>
          <div className="form-group">
            <input type="number" className="form-control" min="0" value={drug.amount || 0}
              onChange={e => this.setState({ drug: Object.assign(drug, { amount: parseInt(e.target.value) }) })} />
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="time"
                checked={drug.timeType == 'time'}
                onChange={this.changeTimeType.bind(this, 'time')} />
              Time
            </label>&nbsp;
            <label>
              <input type="radio" value="interval"
                checked={drug.timeType == 'interval'}
                onChange={this.changeTimeType.bind(this, 'interval')} />
              Interval
            </label>&nbsp;
            <label>
              <input type="radio" value="other"
                checked={drug.timeType == 'other'}
                onChange={this.changeTimeType.bind(this, 'other')} />
              Other
            </label>
          </div>
          <div>
          {(() => {
            if (drug.timeType == 'time') return (
              <div className="checkbox">
                <span>Eat at: </span>
                <label>
                  <input type="checkbox" value="morning"
                    checked={drug.time.morning}
                    onChange={this.toggleTime.bind(this, 'morning')} /> Morning&nbsp;
                </label>
                <label>
                  <input type="checkbox" value="afternoon"
                    checked={drug.time.afternoon}
                    onChange={this.toggleTime.bind(this, 'afternoon')}  /> Afternoon&nbsp;
                </label>
                <label>
                  <input type="checkbox" value="evening"
                    checked={drug.time.evening}
                    onChange={this.toggleTime.bind(this, 'evening')}  /> Evening&nbsp;
                </label>
                <label>
                  <input type="checkbox" value="night"
                    checked={drug.time.night}
                    onChange={this.toggleTime.bind(this, 'night')}  /> Night&nbsp;
                </label>
              </div>
            )
            else if (drug.timeType == 'interval') return (
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">Eat every</span>
                  <input type="number" className="form-control" min="1" max="24" ref="interval"
                    value={drug.interval || 6}
                    onChange={this.changeInterval.bind(this)} />
                  <span className="input-group-addon">hours</span>
                </div>
              </div>
            )
          })()}
          </div>
          <div className="form-group">
            <textarea className="form-control" value={drug.usage || ""} placeholder="Usage"
              onChange={e => this.setState({ drug: Object.assign(drug, { usage: e.target.value }) })} />
          </div>
          <div className="modal-footer">
            <button className="btn btn-default"
              onClick={() => this.reset()}>Cancel</button>&nbsp;
            <button className="btn btn-success"
              onClick={this.submit.bind(this)}>Add</button>
            {(this.state.msg)? <div className="alert alert-danger" style={{'textAlign': 'left'}}>{this.state.msg}</div>: false}
          </div>
        </div>
      </div>
    )
  }
}