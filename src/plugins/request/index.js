import axios from 'axios'

const hostname = '';

const request = {
  get (url, params = {}) {
    return new Promise((resolve, reject) => {
      let str = ''

      if (Object.keys(params).length > 0) {
        str += '?'

        Object.keys(params).forEach(ele => {
          str += ele + '=' + params[ele] + '&'
        })
      }

      str = str.replace(/&$/, '')

      axios.get(hostname + url + str).then(data => {
        data = data.data

        if (data.code >= 0) {
          resolve(data.data)
        } else {
          reject(data.msg)
        }
      })
    })
  }
}

export default request
