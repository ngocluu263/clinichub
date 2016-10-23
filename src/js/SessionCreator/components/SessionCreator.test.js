import { shallow } from 'enzyme'
import React from 'react'

import SessionCreator from './SessionCreator'
import SessionCreatorStore from '../stores/SessionCreatorStore'

describe("SessionCreator", function() {
  beforeEach(function() {
    this.store = new SessionCreatorStore
  })

  it("should show initial title", function() {
    const wrapper = shallow(<SessionCreator store={this.store}/>)
    expect(wrapper.text()).toBe('Hello world 0')
  })
})
