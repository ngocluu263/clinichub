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
    data.clinic_id = this.clinicId
    myFetch('/api/set_clinic', data).then(data => {
        this.fetchClinic()
        this.showMessage("Edit clinic successfully")
    })
  }

  inviteDoctors(doctors) {
    myFetch('/api/set_clinic_to_doctors', {clinic_id: this.clinicId, doctors}).then(data => {
      if (!data.error_message) {
        this.fetchDoctors()
        this.showMessage("Invite doctors successfully")
      }
    })
  }

  leaveClinic() {
    myFetch('/api/leave_clinic', { doctor_id: this.doctorId}).then(data => {
      if (!data.error_message) {
        this.showMessage("Leave clinic successfully")
        window.location = '/doctor/profile/clinic'
      }
    })
  }

  fetchClinic() {
    myFetch('/api/get_clinic', { clinic_id: this.clinicId }).then(data => {
      this.clinic = data.clinic
      this.pageReady = 'edit' 
    })
  }

  fetchDoctors() {
    myFetch('/api/get_available_doctors').then(data => {
      this.doctors = data.doctors
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
