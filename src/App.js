import Header from './Header';
import './App.css';
import React, {useState, useEffect} from 'react';
import Search from './Search';
import Movies from './Movies';

function App() {

  const [movies, setMovies] = useState([])
  // const [roles, setRoles] = useState([])

  useEffect(() => {
    fetch('http://localhost:9292/movies')
    .then(r => r.json())
    .then(movies => setMovies(movies))
  }, [])

  // useEffect(() => {
  //   fetch('http://localhost:9292/roles')
  //   .then(r => r.json())
  //   .then(roles => setRoles(roles))
  // }, [])



  return (
    <div className="App">
      <Header/>
      <Search/>
      <Movies
        setMovies={setMovies} 
        movies={movies}
        // roles={roles}
      />
    </div>
  );
}

export default App;
