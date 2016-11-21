import fetch from 'isomorphic-fetch'
import moment from 'moment'

export let myFetch = (() => {
  function myFetch(method, url, data) {
    let fetchObj = fetch((process.env.NODE_ENV == 'production'? '': `http://${window.location.hostname}:8000`) + url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method,
      body: JSON.stringify(data)
    })
    
    if (method == 'DELETE') return fetchObj
    else {
      return fetchObj.then(res => {
        if (res.status >= 400) {
          throw new Error("Bad response from server");
        }
        return res.json()
      })
    }
  }

  myFetch.post = (url, data) => myFetch('POST', url, data)
  myFetch.get = (url, data) => myFetch('GET', url, data)
  myFetch.put = (url, data) => myFetch('PUT', url, data)
  myFetch.patch = (url, data) => myFetch('PATCH', url, data)
  myFetch.delete = (url, data) => myFetch('DELETE', url, data)

  return myFetch
})()

export function getTimeDiff(time) {
  let now = moment()
  let timeDiff = moment.duration((time.unix() - now.unix()) * 1000, 'milliseconds')
  let str = ""
  if (timeDiff.years()) str += timeDiff.years() + " years "
  if (timeDiff.months()) str += timeDiff.months() + " months "
  if (timeDiff.days()) str += timeDiff.days() + " days "
  if (timeDiff.hours()) str += timeDiff.hours() + " hours "
  if (timeDiff.minutes()) str += timeDiff.minutes() + " minutes "
  return str
}