import React, { Component } from 'react'
import { observer } from 'mobx-react'
import AppointmentFilteredList from './AppointmentFilteredList'

let TabLink = ({enable, pageName, changePage}) => {
  return (enable)?
    <a href="javascript:;" onClick={() => changePage()}>{pageName}</a>:
    <span>{pageName}</span>
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
      <div className="panel panel-default">
        <div className="panel-heading">
          <span>Appointment: &nbsp;</span>
          <span style={{'position': 'absolute', 'float': 'right'}}>
            <TabLink enable={store.page != 'active'} pageName="Active" changePage={() => store.page = 'active'} />  | &nbsp;
            <TabLink enable={store.page != 'history'} pageName="History" changePage={() => store.page = 'history'} />  
          </span>
        </div>
        <AppointmentFilteredList
          page={page} list={list} me={store.me}
          changePage={(page) => this.props.store.page = page}
          doneAppointment={store.doneAppointment.bind(store)}
          cancelAppointment={store.cancelAppointment.bind(store)} />
      </div>
    )
  }
}