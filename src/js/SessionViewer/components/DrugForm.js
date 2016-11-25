import React, { Component } from 'react'

export default class DrugForm extends Component {
  constructor() {
    super()
    this.state = {
      timeType: 'time',
      time: {
        morning: false,
        afternoon: false,
        evening: false,
        night: false
      },
      interval: 6
    }
  }

  changeTimeType(timeType) {
    this.setState({ timeType }, () => {
      this.sendTimeAsString()
    })
  }

  changeInterval() {
    let interval = parseInt(this.refs.interval.value.trim())
    this.setState({ interval }, () => {
      this.sendTimeAsString()
    })
  }

  toggleTime(time) {
    let obj = {}
    obj[time] = !this.state.time[time]
    this.setState({ time: Object.assign(this.state.time, obj) }, () => {
      this.sendTimeAsString()
    })
  }

  sendTimeAsString() {
    let str = ""
    if (this.state.timeType == 'time') {
      let arr = []
      for (var t in this.state.time) {
        if (this.state.time[t]) arr.push(t)
      }
      str += "Eat at " + arr.join(', ')
    } else if (this.state.timeType == 'interval') {
      str += "Eat every "+ this.state.interval +" hours"
    }
    this.props.handleChange({ id: this.props.index, key: 'time', value: str })
  }

  render() {
    let { drug, index, handleChange, handleDelete } = this.props
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <h4>Drug#{index+1}:  {drug.name}</h4>
          <div className="form-group">
            <input type="text" className="form-control" value={drug.name || ""} placeholder="Drug name"
              onChange={e => handleChange({id: index, key: 'name', value: e.target.value})} />
          </div>
          <div className="form-group">
            <input type="number" className="form-control" min="0" value={drug.amount || 0}
              onChange={e => handleChange({id: index, key: 'amount', value: e.target.value})} />
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="time"
                checked={this.state.timeType == 'time'}
                onChange={this.changeTimeType.bind(this, 'time')} />
              Time
            </label>&nbsp;
            <label>
              <input type="radio" value="interval"
                checked={this.state.timeType == 'interval'}
                onChange={this.changeTimeType.bind(this, 'interval')} />
              Interval
            </label>
          </div>
          <div>
          {(() => {
            if (this.state.timeType == 'time') return (
              <div className="checkbox">
                <span>Eat at: </span>
                <label>
                  <input type="checkbox" value="morning"
                    checked={this.state.time.morning}
                    onChange={this.toggleTime.bind(this, 'morning')} /> Morning&nbsp;
                </label>
                <label>
                  <input type="checkbox" value="afternoon"
                    checked={this.state.time.afternoon}
                    onChange={this.toggleTime.bind(this, 'afternoon')}  /> Afternoon&nbsp;
                </label>
                <label>
                  <input type="checkbox" value="evening"
                    checked={this.state.time.evening}
                    onChange={this.toggleTime.bind(this, 'evening')}  /> Evening&nbsp;
                </label>
                <label>
                  <input type="checkbox" value="night"
                    checked={this.state.time.night}
                    onChange={this.toggleTime.bind(this, 'night')}  /> Night&nbsp;
                </label>
              </div>
            )
            else if (this.state.timeType == 'interval') return (
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">Eat every</span>
                  <input type="number" className="form-control" min="1" max="24" ref="interval"
                    value={this.state.interval || 6}
                    onChange={this.changeInterval.bind(this)} />
                  <span className="input-group-addon">hours</span>
                </div>
              </div>
            )
          })()}
          </div>
          <div className="form-group">
            <textarea className="form-control" value={drug.usage || ""} placeholder="Usage"
              onChange={e => handleChange({id: index, key: 'usage', value: e.target.value})} />
          </div>
          <button className="btn btn-default"
            onClick={() => handleDelete(drug.id)}>Delete</button>
        </div>
      </div>
    )
  }
}