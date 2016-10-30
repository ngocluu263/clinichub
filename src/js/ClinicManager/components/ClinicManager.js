import React, { Component } from 'react'
import { observer } from 'mobx-react'
/*
  <div class="row">
    <div class="col-md-3">
      <div class="list-group">
        <a href="" class="list-group-item">Edit clinic</a>
        <a href="" class="list-group-item">Invite doctor</a>
        <a href="" class="list-group-item">Leave clinic</a>
      </div>
    </div>
    <div class="col-md-9">
      <div>
        <div class="form-group">
          <label for="clinic-name">Clinic name</label>
          <input type="text" id="clinic-name" class="form-control" />
        </div>
        <div class="form-group">
          <label for="clinic-description">Clinic description</label>
          <textarea id="clinic-description" class="form-control" rows="5"></textarea>
        </div>
        <button class="btn btn-success">Edit clinic</button>
      </div>
      <div>
        <input type="text" id="find-doctor" class="form-control" placeholder="Find doctor..." />
        <div class="list-group">
          <a href="" class="list-group-item">Doctor4</a>
          <a href="" class="list-group-item">Doctor5</a>
          <a href="" class="list-group-item">Doctor6</a>
        </div>
        <button class="btn btn-success">Add doctors</button>
      </div>
      <div>
        <button class="btn btn-danger">Leave clinic</button>
      </div>
    </div>
*/


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
    )  
  }
}
