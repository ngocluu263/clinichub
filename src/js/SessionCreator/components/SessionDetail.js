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
      <div>
        <div>
          <label htmlFor="session-topic">Topic</label>
          <input type="text" ref="topic" id="session-topic" placeholder="Topic" />
        </div>
        <div>
          <label htmlFor="session-description">Description</label>
          <textarea ref="description" id="session-description"></textarea>
        </div>
        <button onClick={this.submit}>Confirm</button>
        <button onClick={() => this.props.store.step--}>Back</button>
      </div>
    )
  }
}
