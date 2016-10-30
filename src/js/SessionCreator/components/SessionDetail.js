import React from 'react'
import { observer } from 'mobx-react'

@observer
export default class SessionDetail extends React.Component {
  submit = () => {
    let { store } = this.props
    store.sessionTopic = this.refs.topic.value.trim()
    store.sessionDescription = this.refs.description.value.trim()
    store.submitSession()
  }

  render() {
    return (
      <div className="form">
        <div className="form-group">
          <label htmlFor="session-topic">Topic</label>
          <input className="form-control" type="text" ref="topic" id="session-topic" placeholder="Topic" />
        </div>
        <div>
          <label htmlFor="session-description">Description</label>
          <textarea className="form-control" ref="description" id="session-description"></textarea>
        </div>
        <button className="btn btn-success"
          onClick={this.submit}>Confirm</button>
      </div>
    )
  }
}
