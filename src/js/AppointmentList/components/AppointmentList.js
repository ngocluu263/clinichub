import React, { Component } from 'react'
import { observer } from 'mobx-react'
import AppointmentFilteredList from './AppointmentFilteredList'

let SubMenuList = ({page, changePage}) => {
  return (
    <div className="list-group">
      <a href="javascript:;"
        className={`list-group-item${page == 'active'? ' active': ''}`}
        onClick={() => changePage('active')}>Active</a>
      <a href="javascript:;"
        className={`list-group-item${page == 'history'? ' active': ''}`}
        onClick={() => changePage('history')}>History</a>
    </div>
  )
}

@observer
export default class AppointmentList extends Component {
  render() {
    let { store } = this.props
    let { page, appointments } = store
    switch (page) {
      case 'active': var list = appointments.filter(item => item.state == 'active'); break
      case 'history': var list = appointments.filter(item => item.state == 'history' || item.state == 'cancel'); break
    }
    
    return (
      <div className="row">
        <div className="col-md-3">
          <SubMenuList page={page} changePage={(page) => store.page = page} />
        </div>
        <div className="col-md-9">
          <AppointmentFilteredList
            page={page} list={list} me={store.me}
            changePage={(page) => this.props.store.page = page}
            doneAppointment={store.doneAppointment.bind(store)}
            cancelAppointment={store.cancelAppointment.bind(store)} />
        </div>
      </div>
    )
  }
}