import './App.css';
import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { AppContext } from '../../contexts/AppContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import NotFound from '../NotFound/NotFound';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import success from '../../images/success.svg';
import nonsuccess from '../../images/nonsuccess.svg';
import constants from '../../utils/constants';

function App() {
  const history = useHistory();
  const [moviesOnPage, setMoviesOnPage] = React.useState([]);
  const [isPreloader, setIsPreloader] = React.useState(false);
  const [haveFilms, setHaveFilms] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [moviesFromApi, setMoviesFromApi] = React.useState([]);
  const [apiError, setApiError] = React.useState(false);
  const [apiErrorText, setApiErrorText] = React.useState('');
  const [userData, setUserData] = React.useState({});
  const [isInfoTooltipOpen, setIsInfoTooltip] = React.useState(false);
  const [textInfoTooltip, setTextInfoTooltip] = React.useState('');
  const [imageInfoTooltip, setImageInfoTooltip] = React.useState('');
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [cardsOnLine, setCardsOnLine] = React.useState(0);
  const [cardsLength, setCardsLength] = React.useState(0);
  const [savedMovies, setSavedMovies] = React.useState([]);

  function handleChange(e) {
    const target = e.target;
    const value = target.value;
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

  function handleOnLogin(e) {
    e.preventDefault();
    if (isValid === true) {
      setIsPreloader(true);
      mainApi.login(values.email, values.password)
        .then((data) => {
          if (data.token){
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          setIsPreloader(false);
          handleInfoToolTipOpen(err, nonsuccess)
          console.log(err);
        })
        .finally(() => {
          if (!localStorage.getItem('jwt')) {
            setLoggedIn(false);
          } else {
            const jwt = localStorage.getItem('jwt');
            if (jwt) {
              let userDataApi;
              mainApi.getUserInfo(jwt)
                .then((res) => {
                  if (res) {
                    userDataApi = {
                      email: res.data.email,
                      name: res.data.name
                    };
                  setUserData(userDataApi);
                  history.push('/movies');
                  resetForm();
                  setIsPreloader(false);   
                  }
                })
                .catch(err => console.log(err));
            }  
          }
        })
    } else {
      setIsValid(false)
      setLoggedIn(false)
    }
  }

  function handleOnRegister(e) {
    e.preventDefault();
    if (isValid === true) {
      setIsPreloader(true);
      mainApi.register(values.email, values.password, values.name)
      .then((res) => {
        if(!res.error && !res.message){
          handleOnLogin(e);
        } else {
          handleInfoToolTipOpen("??????-???? ?????????? ???? ??????! ???????????????????? ?????? ??????.", nonsuccess)
        }
      })
      .catch((err) => {
        handleInfoToolTipOpen(err, nonsuccess)
        console.log(err);
      })
      .finally(() => {
        setIsPreloader(false);
      })
    } else {
      setIsValid(false)
    }
  }

  function handleUpdateProfile(e) {
    e.preventDefault();
    if (isValid === true) {
      setIsPreloader(true);
      mainApi.updateProfileInfo(values.name, values.email)
        .then((data) => {
          if(!data.error && !data.message){
            const userNewInfo = {
              email: data.email,
              name: data.name
            };
            setUserData(userNewInfo)
            handleInfoToolTipOpen("???????? ???????????? ?????????????? ????????????????!", success)
          } else {
            handleInfoToolTipOpen("??????-???? ?????????? ???? ??????! ???????????????????? ?????? ??????.", nonsuccess)
          }
        })
        .catch((err) => {
          handleInfoToolTipOpen(err, nonsuccess)
          console.log(err);
        })
        .finally(() => {
          setIsPreloader(false);
        })
    } else {
      setIsValid(false);
    }
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/');
  }

  function handleSearchForm(e) {
    e.preventDefault();
    if (values.film === '' || values.film === undefined) {
      setIsValid(false);
      setErrors({...errors, film: "?????????? ???????????? ???????????????? ??????????"});
    } else {
      setIsValid(true);
    }
    if (isValid === true) {
      setIsPreloader(true);
      countCardsOnPage();
      const movies = [];
      const film = values.film;
      if (/[??-??]/i.test(film)) {
        moviesFromApi.forEach((item) => {
          if (item.nameRU !== null || "") {
            if (item.nameRU.toLowerCase().includes(film.toLowerCase())) {
              movies.push(item)
            }
          }
        })
      } else if (/[??-??]/i.test(film) && /[a-z]/i.test(film)) {
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
      localStorage.setItem('filtred-films', JSON.stringify(movies));
      if (movies.length === 0) {
        setHaveFilms(false);
        setMoviesOnPage([]);
      } else {
        setMoviesOnPage(movies);
        setHaveFilms(true);
      }
      setIsPreloader(false);
    } else {
      setIsValid(false)
    }
  }

  function handleFiltredMovies(e) {
    const value = e.target.checked;
    let result;
    if (value) {
      result = moviesOnPage.filter((item) => {
        return item.duration <= constants.durationMini
      })
      localStorage.setItem('filtred-duration-films', JSON.stringify(result))
      setMoviesOnPage(result)
    } else {
      result = JSON.parse(localStorage.getItem('filtred-films'));
      setMoviesOnPage(result);
    }
  }

  function handleSearchFormSaving(e) {
    e.preventDefault();
    if (values.film === '' || values.film === undefined) {
      setIsValid(false);
      setErrors({...errors, film: "?????????? ???????????? ???????????????? ??????????"});
    } else {
      setIsValid(true);
    }
    if (isValid === true) {
      countCardsOnPage();
      const movies = [];
      const film = values.film;
      if (/[??-??]/i.test(film)) {
        savedMovies.forEach((item) => {
          if (item.nameRU !== null || "") {
            if (item.nameRU.toLowerCase().includes(film.toLowerCase())) {
              movies.push(item)
            }
          }
        })
      } else if (/[??-??]/i.test(film) && /[a-z]/i.test(film)) {
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
      if (movies.length === 0) {
        setHaveFilms(false);
        setSavedMovies([]);
      } else {
        setSavedMovies(movies);
      }
    } else {
      setIsValid(false)
    }
  }

  function countCardsOnPage() {
    const windowWidth = document.documentElement.clientWidth;
    if (windowWidth > 1239) {
      setCardsOnLine(constants.cardsOnLineXL);
      setCardsLength(constants.cardsLengthXL);
    } else if (windowWidth > 923 && windowWidth <= 1239) {
      setCardsOnLine(constants.cardsOnLineL);
      setCardsLength(constants.cardsLengthL)
    } else if (windowWidth > 626 && windowWidth <=923) {
      setCardsOnLine(constants.cardsOnLineM);
      setCardsLength(constants.cardsLengthM);
    } else if (windowWidth <= 626) {
      setCardsOnLine(constants.cardsOnLineS);
      setCardsLength(constants.cardsLengthS)
    }
  }
  function addCards() {
    const filmsForView = cardsLength + cardsOnLine;
    setCardsLength(filmsForView);
  }

  function getMovies(jwt) {
    mainApi.getMovies(jwt)
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
        handleInfoToolTipOpen(err, nonsuccess)
        console.log(err)
      })
  }

  function handleSaveCard(film) {
    const isLike = savedMovies.some((item) => {
      return item.movieId === film.id
    });
    if (!isLike) {
      const jwt = localStorage.getItem('jwt');
      console.log(jwt)
      mainApi.createMovie(film, jwt)
        .then((res) => {
          getMovies(jwt)
        })
        .catch((err) => {
          handleInfoToolTipOpen(err, nonsuccess)
          console.log(err)
        });
    } else {
      const jwt = localStorage.getItem('jwt');
      savedMovies.some((item) => {
        if (item.movieId === film.id) {
          mainApi.removeMovie(item._id, jwt)
            .then((res) => {
              getMovies(jwt);
            })
            .catch((err) => {
              handleInfoToolTipOpen(err, nonsuccess);
              console.log(err);
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
      const jwt = localStorage.getItem('jwt');
      savedMovies.some((item) => {
        if (item.movieId === film.movieId) {
          mainApi.removeMovie(item._id, jwt)
            .then((res) => {
              getMovies(jwt);
            })
            .catch((err) => {
              handleInfoToolTipOpen(err, nonsuccess);
              console.log(err);
            })
        }
      })
    }
  }

  function goBack() {
    history.goBack();
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
    if (!localStorage.getItem('jwt')) {
      setLoggedIn(false);
    } else {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        let userDataApi;
        mainApi.getUserInfo(jwt)
          .then((res) => {
            if (res) {
              userDataApi = {
                email: res.data.email,
                name: res.data.name
              };
            setUserData(userDataApi);
            }
          })
          .catch((err) => {
            handleInfoToolTipOpen(err, nonsuccess);
            console.log(err);
          });
      }  
    }
  }, [loggedIn])

  React.useEffect(() => {
    if (localStorage.getItem('films')) {
      const movies = JSON.parse(localStorage.getItem('films'))
      setMoviesFromApi(movies)
    } else {
      moviesApi.getCards()
        .then((data) => {
          localStorage.setItem('films', JSON.stringify(data))
          const movies = JSON.parse(localStorage.getItem('films'))
          setMoviesFromApi(movies)
        })
        .catch((err) => {
          handleInfoToolTipOpen(err, nonsuccess);
          console.log(err);
        })
    }
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
    const savedFilms = JSON.parse(localStorage.getItem('saved-films'));
    if (savedFilms) {
      setSavedMovies(savedFilms);
    } else {
      setSavedMovies([])
    }
  }, [])

  return (
    <AppContext.Provider value={loggedIn}>
      <CurrentUserContext.Provider value={userData}>
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
                handleFiltredMovies = {handleFiltredMovies}
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
                values = {values}
                isInfoTooltipOpen = {isInfoTooltipOpen}
                imageInfoTooltip = {imageInfoTooltip}
                textInfoTooltip = {textInfoTooltip}
                handleInfoTooltipClose = {handleInfoTooltipClose}
                onPreloader = {isPreloader}
                signOut =  {handleSignOut}
              />
              <Route exact path="/">
                <Main path="/" loggedIn={loggedIn} />
              </Route>
              <Route path="/signin">
                {loggedIn ? <Redirect to="/" /> : <Login
                  onLogin = {handleOnLogin}
                  isValid = {isValid}
                  handleChange = {handleChange}
                  errors = {errors}
                  apiErrorVisible = {apiError}
                  apiErrorText = {apiErrorText}
                  onPreloader = {isPreloader}
                />}
              </Route>
              <Route path="/signup">
                <Register
                  onRegister = {handleOnRegister}
                  isValid = {isValid}
                  handleChange = {handleChange}
                  errors = {errors}
                  apiErrorVisible = {apiError}
                  apiErrorText = {apiErrorText}
                  onPreloader = {isPreloader} 
                />
              </Route>
              <Route path="/not-found">
                <NotFound goBack = {goBack} />
              </Route>
              <Route path="*">
                <Redirect to ="/not-found" />
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
    </AppContext.Provider>
  );
}

export default App;
