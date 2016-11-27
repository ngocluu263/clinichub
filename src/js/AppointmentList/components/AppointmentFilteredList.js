import React, { Component } from 'react'
import moment from 'moment'
import { getTimeDiff }  from '../../utils'

function durationToString(duration) {
  let str = ""
  if (duration.years()) str += duration.years() + " years "
  if (duration.months()) str += duration.months() + " months "
  if (duration.days()) str += duration.days() + " days "
  if (duration.hours()) str += duration.hours() + " hours "
  if (duration.minutes()) str += duration.minutes() + " minutes "
  return str
}

let Item = ({appointment, page, me, selected, toggleDetail, doneAppointment, cancelAppointment}) => {
  let time_ = moment(appointment.time)
  let timeStr = time_.format('ddd, DD MMM YYYY HH:mm')
  let userStr = (me == 'doctor')?
    `Patient: ${appointment.patient.fullname}`:
    `Clinic: ${appointment.doctor.clinic.name}`
  
  const active = selected == appointment.id
  switch (appointment.state) {
    case 'active': var title = durationToString(getTimeDiff(time_)); break;
    case 'cancel': var title = "Canceled"; break;
    case 'history': var title = "Completed"; break;
  }

  return (
    <div className="BigSpaceList" style={{'minHeight': '200px'}}>
      <div className="Gapper_Small"></div>
      <span className="BigSpaceList_RedTopSection">{title}<br /></span>
      <span className="colorgrayDark BigSpaceList_UnderTopSection1">{timeStr}</span><br />
      <div className="Gapper"></div>
      <div className="colorgray1 BigSpaceList_AddressSection">
      {active? (
        <div>
          <p>{appointment.note}</p>
          <p>Address: {appointment.location}</p>
          <p>
            {(page == 'active')? <div className="ButtonStandard_RoundCorner ButtonStandard ButtonHeight_OneLineText_Small ButtonWidth_BiggerMedium Button_NormalColor" style={{'display': 'inline-block', 'marginRight': '10px'}}
              onClick={() => cancelAppointment(appointment.id)}>Discard</div>: false}
          </p>
        </div>
      ): false} 
      </div>
      <div className="colorgray1 BigSpaceList_RightSection">
        <div style={{'position': 'relative', 'height': '25px'}}> </div>
        <span style={{'position': 'relative', 'paddingRight': '10px', 'fontSize': '20px', 'lineHeight': '3px', 'fontWeight': 'bold'}}>{userStr}</span> <br />
        <div style={{'position': 'relative', 'height': '5px'}}></div>
        <span style={{'position': 'relative', 'paddingRight': '10px', 'fontSize': '18px', 'lineHeight': '3px'}}> Session: {appointment.session.topic}</span> <br /><br />
        <div style={{'position': 'relative', 'height': '3px'}}></div>
        <div className="ButtonStandard_RoundCorner ButtonStandard ButtonHeight_OneLineText_Small ButtonWidth_BiggerMedium Button_NormalColor" style={{'display': 'inline-block', 'marginRight': '10px'}}
          onClick={() => toggleDetail(appointment.id)}>{(active)? 'Hide Detail': 'Show Detail'}</div><br />
        <div className="ButtonStandard_RoundCorner ButtonStandard ButtonHeight_OneLineText_Small ButtonWidth_BiggerMedium Button_NormalColor" style={{'display': 'inline-block', 'marginRight': '10px'}}
          onClick={() => window.location = '/session/'+ appointment.session.id}>View session</div>
      </div>
    </div>
  )
}

export default class AppointmentFilteredList extends Component {
  constructor() {
    super()
    this.state = {
      selected: ''
    }
  }

  componentWillReceiveProps() {
    this.setState({
      selected: ''
    })
  }

  toggleDetail(id) {
    this.setState({
      selected: (this.state.selected == id)? '': id
    })
  }

  render() {
    let { list } = this.props
    let ItemList = list.map(item => {
      return <Item
        key={item.id}
        appointment={item}
        me={this.props.me}
        selected={this.state.selected}
        toggleDetail={this.toggleDetail.bind(this)}
        page={this.props.page}
        doneAppointment={this.props.doneAppointment}
        cancelAppointment={this.props.cancelAppointment}
        />
    })
    return (
      <ul className="list-group">
        {ItemList}
      </ul>
    )
  }
}