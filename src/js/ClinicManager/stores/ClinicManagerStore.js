import { observable, computed, autorun } from 'mobx'
import { myFetch } from '../../utils'


export default class ClinicManagerStore {
  @observable page
  @observable pageReady
  @observable clinicId
  @observable doctorId
  @observable msg = ""

  showMessage(msg) {
    this.msg = msg
    setTimeout(() => {
      this.msg = ""
    }, 2000) 
  }

  editClinic(data) {
    myFetch.patch(`/rest/clinics/${this.clinicId}/`, data).then(data => {
        this.fetchClinic()
        this.showMessage("Edit clinic successfully")
    })
  }

  inviteDoctors(doctors) {
    let inviterPromises = doctors.map(doctor => {
      return myFetch.patch(`/rest/doctors/${doctor}/`, {clinic: this.clinicId})
    })

    Promise.all(inviterPromises).then(() => {
      this.fetchDoctors()
      this.showMessage("Invite doctors successfully")
    })
  }

  leaveClinic() {
    myFetch.patch(`/rest/doctors/${this.doctorId}/`, { clinic: null }).then(data => {
      if (!data.error_message) {
        this.showMessage("Leave clinic successfully")
        window.location = '/doctor/profile/clinic'
      }
    })
  }

  fetchClinic() {
    myFetch.get(`/rest/clinics/${this.clinicId}/`).then(data => {
      this.clinic = data
      this.pageReady = 'edit' 
    })
  }

  fetchDoctors() {
    myFetch.get('/rest/doctors/noclinic/').then(data => {
      this.doctors = data
      this.pageReady = 'invite' 
    })
  }

  static fromJS(data) {
    let store = new ClinicManagerStore()
    Object.assign(store, data)
    autorun(() => {
      switch (store.page) {
        case 'edit': {
          store.fetchClinic()
        }; break;
        case 'invite': {
          store.fetchDoctors()
        }; break;
        case 'leave': {
          store.pageReady = 'leave' 
        }; break;
      }
    })
    return store
  }
}
