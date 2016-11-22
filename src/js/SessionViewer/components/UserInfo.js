import React, { Component } from 'react'

let DoctorInfo = ({info}) => {
  return (
    <div>{info.fullname}</div>
  )
}

export default function UserInfo({me, info}) {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">{me == 'patient'? 'Patient': 'Doctor'} Information</div>
      <div className="panel-body">
        <DoctorInfo info={info} />
      </div>
    </div>
  )
}