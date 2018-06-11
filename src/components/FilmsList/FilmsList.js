import React, {Component} from 'react';

import Film from '../Film/Film'

import './FilmsList.css';

const FilmsList = ({films = [], imageFormat = {}}) => (
  <div className="FilmsList">
    {films.map((film) => (<Film film={film} key={film.id} imageFormat={imageFormat}/>))}
  </div>
);

export default FilmsList;