import React from 'react';
import {shallow} from 'enzyme';

import Film from './Film';

describe('Film', () => {

  let mockedFilm;
  let imageFormat;

  beforeEach(() => {
    mockedFilm = {
      "vote_count":611,
      "id":11474,
      "video":false,
      "vote_average":7.5,
      "title":"The Warriors",
      "popularity":10.730978,
      "poster_path":"\/ikwR74siRBhSdtAUMxNzUJvT59A.jpg",
      "original_language":"en",
      "original_title":"The Warriors",
      "genre_ids":[
         28,
         12,
         80,
         18,
         53
      ],
      "backdrop_path":"\/nK4qiKkZ6FqWyWG4Dzug2eMqYcx.jpg",
      "adult":false,
      "overview":"Prominent gang leader Cyrus calls a meeting of New York's gangs to set aside their turf wars and take over the city. At the meeting, a rival leader kills Cyrus, but a Coney Island gang called the Warriors is wrongly blamed for Cyrus' death. Before you know it, the cops and every gangbanger in town is hot on the Warriors' trail.",
      "release_date":"1979-02-08"
    }

    imageFormat = {"base_url":"http://image.tmdb.org/t/p/","secure_base_url":"https://image.tmdb.org/t/p/","backdrop_sizes":["w300","w780","w1280","original"],"logo_sizes":["w45","w92","w154","w185","w300","w500","original"],"poster_sizes":["w92","w154","w185","w342","w500","w780","original"],"profile_sizes":["w45","w185","h632","original"],"still_sizes":["w92","w185","w300","original"]};
  });


  it('renders without crashing', () => {
    shallow(<Film />);
  });

  it('renders null if no props', () => {
    const component = shallow(<Film />);
    expect(component.type()).toBeNull();
  });

  describe('When props are passed', () => {

    test('it renders', () => {
      const component = shallow(<Film film={mockedFilm} imageFormat={imageFormat} />);
      expect(component.type()).not.toBeNull();
    });

    test('Creates a img with the proper path', () => {
      const component = shallow(<Film film={mockedFilm} imageFormat={imageFormat} />);
      const image = component.find('img');
      expect(image.props().src).toBe('http://image.tmdb.org/t/p/w780/ikwR74siRBhSdtAUMxNzUJvT59A.jpg');
    });

    test('creates srcset attribute', () => {
      const srcsetValues = 'http://image.tmdb.org/t/p/w92/ikwR74siRBhSdtAUMxNzUJvT59A.jpg 92w,http://image.tmdb.org/t/p/w154/ikwR74siRBhSdtAUMxNzUJvT59A.jpg 154w,http://image.tmdb.org/t/p/w185/ikwR74siRBhSdtAUMxNzUJvT59A.jpg 185w,http://image.tmdb.org/t/p/w342/ikwR74siRBhSdtAUMxNzUJvT59A.jpg 342w,http://image.tmdb.org/t/p/w500/ikwR74siRBhSdtAUMxNzUJvT59A.jpg 500w,http://image.tmdb.org/t/p/w780/ikwR74siRBhSdtAUMxNzUJvT59A.jpg 780w';
      const component = shallow(<Film film={mockedFilm} imageFormat={imageFormat} />);
      const image = component.find('img');
      expect(image.props().srcSet).toEqual(srcsetValues);
    });

  });

});
