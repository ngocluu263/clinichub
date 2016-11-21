import { observable, computed, autorun } from 'mobx'
import { myFetch } from '../../utils'
import { toJS } from 'mobx'
import moment from 'moment'

export default class AppointmentListStore {
  @observable page
  @observable appointments

  updateAppointment(data) {
    let app = this.appointments.filter(app => app.id == data.id)[0]
    Object.assign(app, data)
  }

  doneAppointment(id) {
    myFetch.patch(`/api/appointments/${id}/`, { state: 'history' }).then((data) => {
      this.updateAppointment(data)
    })
  }

  cancelAppointment(id) {
    myFetch.patch(`/api/appointments/${id}/`, { state: 'cancel' }).then((data) => {
      this.updateAppointment(data)
    })
  }

  static fromJS(data) {
    let store = new AppointmentListStore()
    let appointments = data.appointments.map(app => {
      let time = moment(app.time)
      let now = moment()
      if (time.isBefore(now)) {
        app.state = 'history'
      }
      return app
    })
    Object.assign(store, data)
    return store
  }
}
