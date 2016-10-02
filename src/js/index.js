import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'

import TodoStore from './TodoStore'

@observer
class Sample extends React.Component {
  filter(e) {
    this.props.store.filter = e.target.value
  }
  render() {

    const { filter, modifiedTodos } = this.props.store

    let todoListItem = modifiedTodos.map((todo, index) => {
      return (<li key={index}>{todo}</li>)
    })

    return (
      <div>
        <p>
          Filter: <input type="text" onChange={this.filter.bind(this)}/>
          {filter.toUpperCase()}
        </p>
        <p>Todos:</p>
        <ul>{todoListItem}</ul>
      </div>
    )
  }
}

ReactDOM.render(<Sample store={TodoStore} />, document.getElementById('app'))
