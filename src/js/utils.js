import fetch from 'isomorphic-fetch'

export let myFetch = (() => {
  function myFetch(method, url, data) {
    return fetch((process.env.NODE_ENV == 'production'? '': `http://${window.location.hostname}:8000`) + url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method,
      body: JSON.stringify(data)
    }).then(res => {
      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }
      return res.json()
    })
  }

  myFetch.post = (url, data) => myFetch('POST', url, data)
  myFetch.get = (url, data) => myFetch('GET', url, data)
  myFetch.put = (url, data) => myFetch('PUT', url, data)
  myFetch.patch = (url, data) => myFetch('PATCH', url, data)
  myFetch.delete = (url, data) => myFetch('DELETE', url, data)

  return myFetch
})()
