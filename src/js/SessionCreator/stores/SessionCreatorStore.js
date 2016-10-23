import { observable, computed, action } from 'mobx'
import _ from 'lodash'

export default class SessionCreatorStore {
  @observable step = 1
  @observable fieldFilter = ""
  @observable selectedField = "Eye"
  @observable selectedClinic
  clinics = []
  fields = []

  @computed get selectedFields() {
    return this.fields.filter(item => item.toLowerCase().match(this.fieldFilter.toLowerCase()))
  }

  @computed get title() {
    switch (this.step) {
      case 1: return "Step 1: Press the request button"  
      case 2: return "Step 2: Select field"  
      case 3: return "Step 3: Select clinic"  
      case 4: return "Step 4: Review payment method"  
      case 5: return "Step 5: Detail session"  
      case 6: return "Step 6: Finish!"  
    }
  }

  @computed get clinicsWithSelectedField() {
    return this.clinics.filter(item => _.includes(item.fields, this.selectedField))
  }

  deriveFields() {
    this.fields = _.uniq(this.clinics.reduce((prev, curr) => _.union(prev, curr.fields), [])).sort()
  }

  static fromJS(data) {
    const store = new SessionCreatorStore()
    store.step = data.step
    store.clinics = data.clinics
    store.deriveFields()
    return store
  }
}
