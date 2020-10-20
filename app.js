const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors');
const app = express();
const helmet= require('helmet');
app.use(morgan('common'));
app.use(cors());
app.use(helmet());

app.use(function validateBearerToken(req, res, next) {
  let token=process.env.API_TOKEN;
  let entToken=req.get('Authorization');
  if(!entToken || entToken.split(' ')[1] !== token) {
    return res.status(400).json({error:'invalid api token'});
  }
  next();
});
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