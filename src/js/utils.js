import fetch from 'isomorphic-fetch'

export function myFetch(url, data) {
  return fetch((process.env.NODE_ENV == 'production'? '': `http://${window.location.hostname}:8000`) + url, {
    header: {
      'content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  }).then(res => {
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    return res.json()
  })
}
