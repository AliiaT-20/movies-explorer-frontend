class Api {
    constructor (options) {
        this.url = options.baseUrl;
        this.headers =  options.headers;
    }
    _check(res) {
        if (res.ok) {
            return res.json()
        }
           return Promise.reject(`Ошибка: ${res.status}`)
      }
    
    getCards() {
        return fetch(this.url, {
            headers: this.headers})
            .then(res => this._check(res))
    }
}

const moviesApi = new Api({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default moviesApi;