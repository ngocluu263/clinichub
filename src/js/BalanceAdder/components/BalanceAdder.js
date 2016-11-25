import React, { Component } from 'react'
import { observer } from 'mobx-react'

@observer
export default class BalanceAdder extends Component {
  constructor() {
    super()
    this.state = { topup: 0, msg: '' }
  }

  componentWillMount() {
    this.setState({ topup: this.props.store.topupList[0] })
  }

  updateTopup(topup) {  
    this.setState({ topup })
  }

  submit() {
    let invalid = []
    for (var field in this.refs) {
      let check = this.refs[field].value.match(pattern[field])? true: false
      if (!check) invalid.push(field)
    }
    if (!invalid.length) {
      this.setState({ msg: "" })
      this.props.store.updateBalance(this.state.topup, () => {
        for (var field in this.refs) {
          this.refs[field].value = ""
        }
      })
    } else this.setState({ msg: invalid.join(', ') + " are invalid" })
  }

  render() {
    let { patient, topupList } = this.props.store
    return (
      <div>
        <div id="balance-big">
          <span><small>Your balance is<br /></small>{patient.balance}</span>
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="card-number">Card Number</label>
            <input type="text" id="card-number" ref="cardNumber" size="20" maxLength="19" className="form-control" placeholder="xxxx-xxxx-xxxx-xxxx" />
          </div>
          <div className="form-group">
            <label htmlFor="card-cvv">CVV</label>
            <input type="text" id="card-cvv" ref="cardCVV" size="3" maxLength="3" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="card-expired">Expired Month</label>
            <input type="text" id="card-expired" ref="cardExpired" size="7" maxLength="7" className="form-control" placeholder="mm/yyyy" />
          </div>
          <div className="form-group">
            <label htmlFor="topup">Select topup</label>
            <TopupSelector topupList={topupList} updateTopup={this.updateTopup.bind(this)} />
          </div>
          <button className="btn btn-success" onClick={this.submit.bind(this)}>Add topup</button>
          {(this.state.msg != '')? (
            <div className="alert alert-danger" role="alert">{this.state.msg}</div>
          ): false}
        </div>
      </div>
    )
  }
}

let pattern = {
  cardNumber: /\d{4}-\d{4}-\d{4}-\d{4}/,
  cardCVV: /\d{3}/,
  cardExpired: /\d{2}\/\d{4}/
}

let TopupSelector = ({topupList, updateTopup}) => {
  return (
    <select id="topup" className="form-control" onChange={e => updateTopup(parseInt(e.target.value))}>
    {(() => topupList.map((item, index) => (
      <option key={index} value={item}>{item}</option>
    )))()}
    </select>
  )
}