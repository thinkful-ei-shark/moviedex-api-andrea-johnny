const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

const movies = require('./movies-data-small');

app.get('/movie', (req, res, next) => {
  const {genre, country, avg_vote} = req.query;

  let movieList = [...movies];

  if(genre) {
    movieList = movieList.filter(movie => {
      return movie.genre.toLowerCase().includes(genre.toLowerCase());
    });
  }

  if(country) {
    movieList = movieList.filter(movie => {
      return movie.country.toLowerCase().includes(country.toLowerCase());
    });
  }

  if(avg_vote) {
    movieList = movieList.filter(movie => {
      return Number(movie.avg_vote) >= Number(avg_vote);
    });
  }

  res.json(movieList);

});

app.listen(8080, () => console.log('server started'));