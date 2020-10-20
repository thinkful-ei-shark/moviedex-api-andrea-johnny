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
      return movie.genre.toLowerCase() === genre.toLowerCase();
    });
  }

  res.json(movieList);

});

app.listen(8080, () => console.log('server started'));