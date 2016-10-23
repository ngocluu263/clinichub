import SessionCreatorStore from './SessionCreatorStore'

describe("SessionCreatorStore", () => {
  it("Should return valid step", () => {
    let store = new SessionCreatorStore
    expect(store.step).toBe(0)
    store.step = 1
    expect(store.step).toBe(1)
  })
  it("Should return valid twice step", () => {
    let store = new SessionCreatorStore
    store.step = 3
    expect(store.twiceStep).toBe(6)
  })
})
