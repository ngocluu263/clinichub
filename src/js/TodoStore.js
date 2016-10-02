import { observable, autorun, computed } from 'mobx'

class TodoStore {
  @observable todos = ["Eat", "Sleep"]
  @observable filter = ""
  @computed get modifiedTodos() {
    return this.todos.filter(todo => todo.toLowerCase().match(this.filter.toLowerCase()))
  }

  addTodo(todo) {
    this.todos.push(todo)
  }
}

var store = window.store = new TodoStore

export default store
