import React, { Component } from 'react'
import moment from 'moment'

export default function Appointments({list}) {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">Appointments</div>
      <ul className="list-group">
        {(() => {
          return list.map(item => {
            return <li key={item.id} className="list-group-item">{moment(item.time).format('ddd, DD MMM YYYY HH:mm')}</li>
          })
        })()}
      </ul>
    </div>
  )
}