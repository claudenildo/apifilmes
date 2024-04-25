import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [sortType, setSortType] = useState('title-asc');

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=0cb3d24dec898e4edf519c356671f6a7');
      setMovies(response.data.results);
    };

    fetchMovies();
  }, []);

  const sortedMovies = [...movies];

  if (sortType === 'title-asc') {
    sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortType === 'title-desc') {
    sortedMovies.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortType === 'rating-asc') {
    sortedMovies.sort((a, b) => a.vote_average - b.vote_average);
  } else if (sortType === 'rating-desc') {
    sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
  }

  return (
    <div>
      <label>
        Sort by:
        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
          <option value="rating-asc">Rating (Lowest to Highest)</option>
          <option value="rating-desc">Rating (Highest to Lowest)</option>
        </select>
      </label>
      
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>IMDB Rating</th>
          </tr>
        </thead>
        <tbody>
          {sortedMovies.map((movie) => (
            <tr key={movie.id}>
              <td>
              <a href={`https://www.themoviedb.org/movie/${movie.id}`} target="_blank" rel="noopener noreferrer">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} style={{ width: '200px', height: '300px' }} />
                {movie.title}
              </a>
              </td>
              <td>{movie.vote_average}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieList;