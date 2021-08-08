import './App.css';
import { Route, Switch } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

function App() {
  return (
    <div className="page">
      <main className="cont">
        <Switch>
          <Route exact path="/">
            <Main path="/" />
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/profile">
            <Profile name="Алия" email="troitskayaalia@ya.ru" />
          </Route>
          <Route path="/movies">
            <Movies path="/movies" />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies path="/saved-movies" />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
