class MainApi {
    constructor(options) {
      this.url = options.baseUrl;
      this.headers =  options.headers;
    }
    _check(res) {
      if (res.ok) {
          return res.json()
      }
         return Promise.reject(`Ошибка: ${res.status}`)
    }
    getMovies(jwt) {
        return fetch(this.url + '/movies', {
            headers: {
                'authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            }})
            .then((res) => {
                return this._check(res)
            })
            .then((res) => {
                if (res) {
                    return res;
                }
            })
    }
    createMovie(movie, jwt) {
        return fetch(this.url + '/movies', {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: "https://api.nomoreparties.co" + movie.image.url,
                trailer: movie.trailerLink,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                thumbnail: "https://api.nomoreparties.co" + movie.thumbnail,
                movieId: movie.id,
            })
        })
        .then((res,req) => {
             return this._check(res);
        })
    }
    removeMovie(id, jwt) {
        return fetch(`${this.url + '/movies'}/${id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
        })
        .then((res) => {
            return this._check(res)
        })
    }
    register(email, password, name) {
        return fetch(this.url + '/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password, name})
        })
        .then(res => this._check(res))
        .then((res) => {
            return res;
        })
    }
    login(email, password) {
        return fetch(this.url + '/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        .then(res => this._check(res))
        .then((data) => {
            if (data.token){
              localStorage.setItem('jwt', data.token);
              return data;
            }
        })
    }
    getUserInfo(jwt) {
        return fetch(this.url + '/users/me', {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
        })
        .then((res) => {
            return this._check(res)
        })
        .then((data) => {
            return data
        })
    }
    updateProfileInfo(name, email) {
        return fetch(this.url + '/users/me', {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
              name: name,
              email: email
          })
        })
        .then(res => this._check(res))
    }
  }
  
  const mainApi = new MainApi({
      baseUrl: 'https://api.aliiat.diplom.nomoredomains.club',
      headers: {
          'authorization': `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
      }
  })
  
  export default mainApi;