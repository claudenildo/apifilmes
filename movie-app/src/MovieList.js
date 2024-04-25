import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=0cb3d24dec898e4edf519c356671f6a7');
      setMovies(response.data.results);
    };

    fetchMovies();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>IMDB Rating</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr key={movie.id}>
            <td>{movie.title}</td>
            <td>{movie.vote_average}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MovieList;