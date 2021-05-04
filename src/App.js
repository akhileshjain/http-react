import React, { useEffect, useState, useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {

  const [movies, setMovies] = useState([]);
  const [userError, setUserError]  = useState('');

  const movieFetchedHandler = useCallback(async () => {
    let url = 'https://newton-test-516f4-default-rtdb.firebaseio.com/movies.json';

    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    let results = [];
    for(let key in data) {
      let obj = {};
      obj.title = data[key].title;
      obj.opening_crawl = data[key].openingText;
      obj.release_date = data[key].releaseDate;
      obj.episode_id = key;
      results.push(obj);
    }
    setMovies(results);
    // .then(response => response.json())
    // .then(data => {
    //   console.log(data.results);
    //   setMovies(data.results);
    // })
  }, []);

  const addMovieHandler = async (movie) => {
      console.log(movie);
      try {

        const response = await fetch('https://newton-test-516f4-default-rtdb.firebasei.com/movie.json', {
                    method: 'PUT',
                    body: JSON.stringify(movie),
                    headers : {
                      'Content-Type': 'application/json'
                    }
                  });
  
        const data = await response.json();
  
        console.log(data);
      } catch {
        setUserError('Something went wrong!');
      }
  }

  useEffect(() => {
    movieFetchedHandler();
  }, [movieFetchedHandler]);

  return (
    <React.Fragment>
      {/* <section>
        <button onClick={movieFetchedHandler}>Fetch Movies</button>
      </section> */}
      <section>
        <AddMovie onAddMovie={addMovieHandler}></AddMovie>
      </section>
      {userError}
      <section>
        <MoviesList pictures={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
