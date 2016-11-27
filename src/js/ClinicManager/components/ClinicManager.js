import React, { Component } from 'react'
import { observer } from 'mobx-react'
import ClinicEditor from './ClinicEditor'
import DoctorInviter from './DoctorInviter'
import LeaveClinic from './LeaveClinic'

@observer
export default class ClinicManager extends Component {
  render() {
    let { store } = this.props
    let innerComponent = (page => {
      switch (page) {
        case 'edit': return (
          <ClinicEditor 
            clinic={store.clinic}
            submit={store.editClinic.bind(store)}
          />
        )
        case 'invite': return (
          <DoctorInviter
            doctors={store.doctors}
            submit={store.inviteDoctors.bind(store)}
          />
        )
        case 'leave': return (
          <LeaveClinic
            submit={store.leaveClinic.bind(store)}
          />
        )
      }
    })(store.pageReady)
    return (
      <div className="row">
        <div className="col-md-3">
          <div className="list-group">
            <a href="javascript:;" className={"list-group-item" + (store.page == 'edit'? ' active': '')}
              onClick={() => store.page = 'edit'}>Edit clinic</a>
            <a href="javascript:;" className={"list-group-item" + (store.page == 'invite'? ' active': '')}
              onClick={() => store.page = 'invite'}>Invite doctors</a>
            <a href="javascript:;" className={"list-group-item" + (store.page == 'leave'? ' active': '')}
              onClick={() => store.page = 'leave'}>Leave clinic</a>
          </div>
        </div>
        <div className="col-md-9">
          <div className="panel panel-default">
            <div className="panel-body">
            {innerComponent}
            {(() => {
              if (store.msg != "") {
                return (
                  <div className="alert alert-success">{store.msg}</div>
                )
              }
            })()} 
            </div>
          </div>
        </div>
      </div>
    )  
  }
}
