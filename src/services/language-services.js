import config from '../config'
import TokenService from './token-service'


const LanguageService = {
    getLanguage() {
        return fetch(`${config.REACT_APP_API_BASE}/language`, {
          headers: {
              'authorization' : `bearer ${TokenService.getAuthToken()}`
          },
        })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
      },
      getLanguageHead() {
        return fetch(`${config.REACT_APP_API_BASE}/language/head`, {
          headers : {
            'authorization' : `bearer ${TokenService.getAuthToken()}`
          },
        })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
      },
      postGuess() {
        return fetch(`${config.REACT_APP_API_BASE}/language/guess`, {
          method : "POST",
          headers : {
            'authorization' : `bearer ${TokenService.getAuthToken()}`,
            'content-type' : 'application/json'
          },
          body: JSON.stringify({
            guess : this.state.guess
          })
        })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
          )
      }
}

export default LanguageService;