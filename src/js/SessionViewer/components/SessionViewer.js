import React, { Component } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import Message from './Message'
import SessionList from './SessionList'
import TranscriptCreator from './TranscriptCreator'
import AppointmentCreator from './AppointmentCreator'
import UserInfo from './UserInfo'
import Appointments from './Appointments'

@observer
export default class SessionViewer extends Component {
  render() {
    let { store } = this.props

    let innerComponent = (page => {
      switch (page) {
        case 'message': return (
          <Message
            me={store.me}
            session={toJS(store.session)}
            sendMessage={store.sendMessage.bind(store)}
            changePage={store.changePage.bind(store)}
            deleteSession={store.deleteSession.bind(store)}
          />
        )
        case 'transcript': return (
          <TranscriptCreator
            doctor={store.session.doctor.fullname}
            patient={store.session.patient.fullname}
            submitTranscript={store.submitTranscript.bind(store)}
            changePage={store.changePage.bind(store)}
          />
        )
        case 'appointment': return (
          <AppointmentCreator
            doctor={store.session.doctor.fullname}
            patient={store.session.patient.fullname}
            submitAppointment={store.submitAppointment.bind(store)}
            changePage={store.changePage.bind(store)}
          />
        )
      }
    })(this.props.store.page)

    return (
      <div>

    <div className="container-fluid" style={{'width': '100%'}}>
        <div className="row" style={{'display': 'flex'}}>

            <div style={{'flex': '0 0 30%', 'minWidth': '20px'}}>
                <div className="col-md-2 col-xs-2" style={{'height': '85vh'}}>
                    <div className="NotiPane" style={{'width': '250px'}}>
                        <div className="Gapper_UltraSmall"></div>
                        <p className="NotiPane_HeaderText">Doctor Information</p>
                        <div className="NotiPane_Space" style={{'top': '50px'}}>
                            <div className="colorgray1 ExpandableList">
                                <div className="ButtonHeight_OneLineText_Large ExpandableList_listButton">Permanent Session</div>
                                <div className="ButtonHeight_OneLineText_Small ExpandableList_GapLeft ExpandableList_listButton ExpandableList_Selected">Dr. Rush, My Husband...</div>
                                <div className="ButtonHeight_OneLineText_Small ExpandableList_GapLeft ExpandableList_listButton">Moo Like Round Robin</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-7 col-xs-7" style={{'height': '85vh', 'boxSizing': 'border-box', 'width': '520px'}}>
                <div className="NotiPane" style={{'width': 'auto'}}>
                    <div className="Gapper_UltraSmall"></div>
                    <p className="NotiPane_HeaderText">Chat</p>
                    <div className="NotiPane_Space" style={{'top': '50px'}}>
                        <div className="NotiPane_Space" style={{'top': '0px', 'bottom': '40px'}}>
                            <div className="BigSpaceList" style={{'textAlign': 'right', 'border': 'none'}}>
                                <div className="Gapper_UltraSmall"></div>
                                <div className="MultiLineLabel LabelManual_Font_Medium" style={{'backgroundColor': 'lightblue', 'borderRadius': '10px'}}> <span>I wanna suck your cock today, I'm so hungry, very very hungry.<br />
                                Please come to fuck me rightnow!</span>
                                </div>
                                <img src="./DemoClinicHubHomePage/Bird.jpg" className="Square_Tiny RoundImage" style={{'display': 'inline-block', 'verticalAlign': 'top'}} />
                                <div className="Gapper_UltraSmall"></div>
                            </div>
                            <div className="BigSpaceList" style={{'textAlign': 'left', 'border': 'none'}}>
                                <div className="Gapper_UltraSmall"></div>
                                <img src="./DemoClinicHubHomePage/Bird.jpg" className="Square_Tiny RoundImage" style={{'display': 'inline-block', 'verticalAlign': 'top'}} />
                                <div className="MultiLineLabel LabelManual_Font_Medium" style={{'backgroundColor': 'pink', 'borderRadius': '10px'}}> <span>I wanna suck your cock today, I'm so hungry, very very hungry.<br />
                                Please come to fuck me rightnow!</span>
                                </div>
                                <div className="Gapper_UltraSmall"></div>
                            </div>
                            <div className="BigSpaceList" style={{'textAlign': 'right', 'border': 'none'}}>
                                <div className="Gapper_Gigantic"></div>
                            </div>
                        </div>
                        <div className="NotiPane_Space" style={{"backgroundColor": "rgba(255,255,255,0.8)", "top": "auto", "bottom": "0px", "height": "140px", "textAlign": "center"}}>
                            <textarea className="InputMultiline" style={{"height": "100px", "width": "100%", "borderRadius": "0px", "border": "1px solid #f2f2f2"}}></textarea>
                            <div className="ButtonStandard ButtonStandard_RoundCorner Button_NormalColor ButtonHeight_OneLineText_Smaller ButtonWidth_Medium" style={{"display": "inline-block"}}>Sent </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-5 col-xs-5" style={{"width": "350px"}}>
                
                <div className="row" >
                    <div className="col-md-12 col-xs-12" style={{"height": "42.5vh", "boxSizing": "border-box", "marginBottom": "auto"}}>
                        <div className="NotiPane" style={{"width": "100%"}}>
                            <div className="Gapper_UltraSmall"></div>
                            <p className="NotiPane_HeaderText">Doctor Information</p>
                            <div className="NotiPane_Space" style={{"top": "50px"}}>
                                <img src="./DemoClinicHubHomePage/Bird.jpg" className="Square_Small RoundImage" />
                                <div className="Gapper_Small"></div>
                                <div className="LabelManual LabelManual_Expand LabelManual_Font_MediumLarger">Dr. EkkBumYay&nbsp&nbsp&nbspLadyGaga</div>
                                <div className="MultiLineLabel LabelManual_Expand LabelManual_Font_MediumLarger" style={{"padding": "10px"}}>&nbsp&nbsp&nbsp&nbsp&nbsp&nbspTechnician of blowing In the Wind, find the path to agony all day</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 col-xs-12" style={{"height": "42.5vh", "boxSizing": "border-box"}}>
                        <div className="NotiPane" style={{"width": "100%"}}>
                            <div className="Gapper_UltraSmall"></div>
                            <p className="NotiPane_HeaderText">Appointment</p>
                            <div className="NotiPane_Space" style={{"top": "50px"}}>
                                <div className="BigSpaceList BigSpaceList_Grey BigSpaceList_GreyBorder1">
                                    <div className="MultiLineLabel LabelManual_Expand LabelManual_Font_Medium" style={{"lineHeight": "10px", "padding": "10px"}}>Appointment to Xray you eyes..<br />
                                        <span style={{"color": "red"}}>12:30 AM 15 Dec 2019</span>
                                    </div>
                                </div>
                                <div className="BigSpaceList BigSpaceList_Grey BigSpaceList_GreyBorder1">
                                    <div className="MultiLineLabel LabelManual_Expand LabelManual_Font_Medium" style={{"lineHeight": "10px", "padding": "10px"}}>Appointment to Xray you eyes..<br />
                                        <span style={{"color": "red"}}>12:30 AM 15 Dec 2019</span>
                                    </div>
                                </div>
                                <div className="BigSpaceList BigSpaceList_Grey BigSpaceList_GreyBorder1">
                                    <div className="MultiLineLabel LabelManual_Expand LabelManual_Font_Medium" style={{"lineHeight": "10px", "padding": "10px"}}>Appointment to Xray you eyes..<br />
                                        <span style={{"color": "red"}}>12:30 AM 15 Dec 2019</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>

        </div>
    </div>
      

      <div className="row">
        <div className="col-md-3">
          <SessionList title="My Session" sessions={store.sessionList} currentSession={store.session} />
          <SessionList title="Archive Session" sessions={store.sessionListArchive} currentSession={store.session} />
        </div>
        <div className="col-md-6">
          <div className="panel panel-default">
            <div className="panel-heading">{store.session.topic}</div>
            <div className="panel-body">
              { innerComponent }
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <UserInfo me={store.me == 'patient'? 'doctor': 'patient'}
            info={store.me == 'patient'? store.session.doctor: store.session.patient} />
          {(store.session.state == 'active')? (
            <Appointments list={store.appointmentList} />
          ): false }
        </div>
      </div>




      </div>
    )
  }
}
