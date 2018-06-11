import React from 'react';
import {shallow} from 'enzyme';
import FilmsMock from '../../api/FilmsMock';
import ConfigurationMock from '../../api/ConfigurationMock';

import FilmsList from './FilmsList';

describe('FilmsList', () => {

  let films;
  let conf;

  beforeEach(() => {
    films = FilmsMock.json().results;
    conf = ConfigurationMock.json().images;
  });


  it('renders component FilmsList', () => {
    shallow(<FilmsList />);
  });

  it('renders FilmsList content', () => {
    const component = shallow(<FilmsList films={films} imageFormat={conf}/>);
    expect(component.find('Film').length).toBe(20);
  });

});