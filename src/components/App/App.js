import './App.css';
import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import NotFound from '../NotFound/NotFound';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import success from '../../images/success.svg';
import nonsuccess from '../../images/nonsuccess.svg';

function App() {
  const history = useHistory();
  const [moviesOnPage, setMoviesOnPage] = React.useState([]);
  const [isPreloader, setIsPreloader] = React.useState(false);
  const [haveFilms, setHaveFilms] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [moviesFromApi, setMoviesFromApi] = React.useState([]);
  const [apiError, setApiError] = React.useState(false);
  const [apiErrorText, setApiErrorText] = React.useState('');
  const [userData, setUserData] = React.useState({});
  const [isInfoTooltipOpen, setIsInfoTooltip] = React.useState(false);
  const [textInfoTooltip, setTextInfoTooltip] = React.useState('');
  const [imageInfoTooltip, setImageInfoTooltip] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [cardsOnLine, setCardsOnLine] = React.useState(0);
  const [cardsLength, setCardsLength] = React.useState(0);
  const [savedMovies, setSavedMovies] = React.useState([]);

  function handleChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage})
    setIsValid(target.closest('form').checkValidity());
  }

  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  )

  function handleLoggedIn() {
    setLoggedIn(true);
  }

  function tokenCheck () {
    // если у пользователя есть токен в localStorage, 
    // эта функция проверит, действующий он или нет
    if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      if (jwt){
        // проверим токен
        mainApi.getUserInfo()
          .then((res) => {
            if (res) {
              const userData = {
                email: res.data.email,
                name: res.data.name
              };
              setUserData(userData);
              setLoggedIn(true);
              history.push('/movies');
            }
          })
          .catch(err => console.log(err)); 
      }  
    }
  }

  function handleInfoToolTipOpen(text, image) {
    setIsInfoTooltip(true);
    setTextInfoTooltip(text);
    setImageInfoTooltip(image);
  }

  function handleInfoTooltipClose() {
    const check = imageInfoTooltip;
    setIsInfoTooltip(false);
    setTextInfoTooltip('');
    setImageInfoTooltip('');
    if (check === success) {
        history.push('/movies')
    };
  }

  function handleApiError(error) {
    setApiError(true);
    setApiErrorText(error)
  }

  function handleOnLogin(e) {
    e.preventDefault();
    if (isValid === true) {
      mainApi.login(values.email, values.password)
      .then((data) => {
        if (data.token){
          handleLoggedIn();
          history.push('/movies');
        }
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      setIsValid(false)
    }
  }

  function handleOnRegister(e) {
    e.preventDefault();
    if (isValid === true) {
      mainApi.register(values.email, values.password, values.name)
      .then((res) => {
        if(!res.error && !res.message){
          handleOnLogin(e);
        } else {
          handleInfoToolTipOpen("Что-то пошло не так! Попробуйте ещё раз.", nonsuccess)
        }
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      setIsValid(false)
    }
  }

  function handleUpdateProfile(e) {
    e.preventDefault();
    if (isValid === true) {
      mainApi.updateProfileInfo(values.name, values.email)
        .then((data) => {
          if(!data.error && !data.message){
            const userNewInfo = data;
            setCurrentUser(userNewInfo);
            handleInfoToolTipOpen("Ваши данные успешно изменены!", success)
          } else {
            handleInfoToolTipOpen("Что-то пошло не так! Попробуйте ещё раз.", nonsuccess)
          }
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      setIsValid(false);
    }
  }

  function handleSearchForm(e) {
    e.preventDefault();
    if (values.film === '' || values.film === undefined) {
      setIsValid(false);
      setErrors({...errors, film: "Нужно ввести ключевое слово"});
    } else {
      setIsValid(true);
    }
    if (isValid === true) {
      setIsPreloader(true);
      countCardsOnPage();
      const movies = [];
      const film = values.film;
      let result;
      if (/[а-я]/i.test(film)) {
        moviesFromApi.forEach((item) => {
          if (item.nameRU !== null || "") {
            if (item.nameRU.toLowerCase().includes(film.toLowerCase())) {
              movies.push(item)
            }
          }
        })
      } else if (/[а-я]/i.test(film) && /[a-z]/i.test(film)) {
        moviesFromApi.forEach((item) => {
          if (item.nameRU !== null || "") {
            if (item.nameRU.toLowerCase().includes(film.toLowerCase())) {
              movies.push(item)
            }
          }
        })
      } else {
        moviesFromApi.forEach((item) => {
          if (item.nameEN !== null || "") {
            if (item.nameEN.toLowerCase().includes(film.toLowerCase())) {
              movies.push(item)
            }
          }
        })
      }
      if (values.checkbox) {
        result = movies.filter((item) => {
          return item.duration <= '40'
        })
      } else {
        result = movies;
      }
      console.log(result)
      localStorage.setItem('filtred-films', JSON.stringify(result));
      if (result.length === 0) {
        setHaveFilms(false);
        setMoviesOnPage([]);
      } else {
        setMoviesOnPage(result);
      }
      setIsPreloader(false);
    } else {
      setIsValid(false)
    }
  }

  function handleSearchFormSaving(e) {
    e.preventDefault();
    if (values.film === '' || values.film === undefined) {
      setIsValid(false);
      setErrors({...errors, film: "Нужно ввести ключевое слово"});
    } else {
      setIsValid(true);
    }
    if (isValid === true) {
      countCardsOnPage();
      const movies = [];
      const film = values.film;
      let result;
      if (/[а-я]/i.test(film)) {
        savedMovies.forEach((item) => {
          if (item.nameRU !== null || "") {
            if (item.nameRU.toLowerCase().includes(film.toLowerCase())) {
              movies.push(item)
            }
          }
        })
      } else if (/[а-я]/i.test(film) && /[a-z]/i.test(film)) {
        savedMovies.forEach((item) => {
          if (item.nameRU !== null || "") {
            if (item.nameRU.toLowerCase().includes(film.toLowerCase())) {
              movies.push(item)
            }
          }
        })
      } else {
        savedMovies.forEach((item) => {
          if (item.nameEN !== null || "") {
            if (item.nameEN.toLowerCase().includes(film.toLowerCase())) {
              movies.push(item)
            }
          }
        })
      }
      if (values.checkbox) {
        result = movies.filter((item) => {
          return item.duration <= '40'
        })
      } else {
        result = movies;
      }
      if (result.length === 0) {
        setHaveFilms(false);
        setSavedMovies([]);
      } else {
        console.log('kkg')
        setSavedMovies(result);
      }
    } else {
      setIsValid(false)
    }
  }

  function countCardsOnPage() {
    const windowWidth = document.documentElement.clientWidth;
    if (windowWidth > 1239) {
      setCardsOnLine(4);
      setCardsLength(16);
    } else if (windowWidth > 923 && windowWidth <= 1239) {
      setCardsOnLine(3);
      setCardsLength(12)
    } else if (windowWidth > 626 && windowWidth <=923) {
      setCardsOnLine(2);
      setCardsLength(8);
    } else if (windowWidth <= 626) {
      setCardsOnLine(1);
      setCardsLength(5)
    }
  }
  function addCards() {
    const filmsForView = cardsLength + cardsOnLine;
    setCardsLength(filmsForView);
  }

  function handleSaveCard(film) {
    const isLike = savedMovies.some((item) => {
      return item.movieId === film.id
    });
    if (!isLike) {
      mainApi.createMovie(film)
        .then((res) => {
          mainApi.getMovies()
            .then((films) => {
              const movies = films.data;
              localStorage.setItem('saved-films', JSON.stringify(movies));
              const saveFilms = JSON.parse(localStorage.getItem('saved-films'));
              if (saveFilms) {
                setSavedMovies(saveFilms)
              } else {
                setSavedMovies([]);
              }
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => console.log(err))
    } else {
      savedMovies.forEach((item) => {
        if (item.movieId === film.id) {
          mainApi.removeMovie(item._id)
            .then((res) => {
              mainApi.getMovies()
              .then((films) => {
                const movies = films.data;
                localStorage.setItem('saved-films', JSON.stringify(movies));
                const saveFilms = JSON.parse(localStorage.getItem('saved-films'));
                if (saveFilms) {
                  setSavedMovies(saveFilms)
                } else {
                  setSavedMovies([]);
                }
              })
              .catch((err) => {
                console.log(err.message)
              })
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    }
  }

  function handleRemoveCard(film) {
    const isLike = savedMovies.some((item) => {
      return item.movieId === film.movieId
    });
    if (isLike) {
      savedMovies.forEach((item) => {
        if (item.movieId === film.movieId) {
          mainApi.removeMovie(item._id)
            .then((res) => {
              mainApi.getMovies()
              .then((films) => {
                const movies = films.data;
                localStorage.setItem('saved-films', JSON.stringify(movies));
                const saveFilms = JSON.parse(localStorage.getItem('saved-films'));
                if (saveFilms) {
                  setSavedMovies(saveFilms)
                } else {
                  setSavedMovies([]);
                }
              })
              .catch((err) => {
                console.log(err.message)
              })
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    }
  }

  React.useEffect(() => {
    countCardsOnPage();
    window.addEventListener('resize', countCardsOnPage);
    window.addEventListener('hashchange', resetForm);
    return () => {
      window.removeEventListener('resize', countCardsOnPage);
      window.removeEventListener('hashchange', resetForm);
    };
  }, []);

  React.useEffect(() => {
    tokenCheck();
  }, [])

  React.useEffect(() => {
    mainApi.getUserInfo()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((err) => console.log(err))
  }, [])

  React.useEffect(() => {
    moviesApi.getCards()
    .then((data) => {
      localStorage.setItem('films', JSON.stringify(data))
      const movies = JSON.parse(localStorage.getItem('films'))
      setMoviesFromApi(movies)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  React.useEffect(() => {
    const filtredFilms = JSON.parse(localStorage.getItem('filtred-films'));
    if (filtredFilms) {
      setMoviesOnPage(filtredFilms);
    } else {
      setMoviesOnPage([]);
    }
  }, [])

  React.useState(() => {
    const saveFilms = JSON.parse(localStorage.getItem('saved-films'));
    if (saveFilms) {
      setSavedMovies(saveFilms)
    } else {
      setSavedMovies([]);
    }
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <main className="cont">
          <Switch>
            <ProtectedRoute
              path="/movies"
              loggedIn={loggedIn}
              component={Movies}
              moviesOnPage = {moviesOnPage}
              isPreloader = {isPreloader}
              haveFilms = {haveFilms}
              cardsLength = {cardsLength}
              handleAddCards = {addCards}
              handleSearchForm = {handleSearchForm}
              isValid = {isValid}
              handleChange = {handleChange}
              errors = {errors}
              handleSaveCard = {handleSaveCard}
              savedMovies = {savedMovies}
            />
            <ProtectedRoute
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
              moviesOnPage = {savedMovies}
              handleSearchForm = {handleSearchFormSaving}
              handleChange = {handleChange}
              errors = {errors}
              ardsLength = {cardsLength}
              handleSaveCard = {handleRemoveCard}
              haveFilms = {haveFilms}
            />
            <ProtectedRoute
              path="/profile"
              loggedIn={loggedIn}
              component={Profile}
              name={userData.name}
              email={userData.email}
              handleUpdateProfile = {handleUpdateProfile}
              isValid = {isValid}
              handleChange = {handleChange}
              errors = {errors}
              isInfoTooltipOpen = {isInfoTooltipOpen}
              imageInfoTooltip = {imageInfoTooltip}
              textInfoTooltip = {textInfoTooltip}
              handleInfoTooltipClose = {handleInfoTooltipClose}
            />
            <Route exact path="/">
              <Main path="/" />
            </Route>
            <Route path="/signin">
              <Login
                onLogin = {handleOnLogin}
                isValid = {isValid}
                handleChange = {handleChange}
                errors = {errors}
                apiErrorVisible = {apiError}
                apiErrorText = {apiErrorText} 
              />
            </Route>
            <Route path="/signup">
              <Register
                onRegister = {handleOnRegister}
                isValid = {isValid}
                handleChange = {handleChange}
                errors = {errors}
                apiErrorVisible = {apiError}
                apiErrorText = {apiErrorText} 
              />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
          <InfoTooltip
            isOpen = {isInfoTooltipOpen}
            image = {imageInfoTooltip}
            text = {textInfoTooltip}
            onClose = {handleInfoTooltipClose} />
        </main>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
