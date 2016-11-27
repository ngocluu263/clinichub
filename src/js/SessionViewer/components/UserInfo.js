import React, { Component } from 'react'
import { toJS } from 'mobx'

let DoctorInfo = ({info, me}) => {
  return (
    <div id="user-info">
      <img src={info.img_url} className="img-responsive img-circle" />
      <p>{info.fullname} ({info.username})</p>
      {me == 'patient'? (
        <p>Tel. {info.phone_no}</p>
      ): (
        <p>Field: {info.field}, Clinic: {info.clinic.name}</p>
      )}
    </div>
  )
}

export default function UserInfo({me, info}) {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">{me == 'patient'? 'Patient': 'Doctor'} Information</div>
      <div className="panel-body">
        <DoctorInfo info={info} me={me} />
      </div>
    </div>
  )
}