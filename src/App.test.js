import React from 'react';
import {shallow, mount} from 'enzyme';
import App from './App';

import FilmsService from './api';

import FilmsMock from './api/FilmsMock';
import ConfigurationMock from './api/ConfigurationMock';

const API_KEY = 'THE_KEY';

jest.mock('./api', () => {
  return {
    searchFilms: jest.fn(),
    getConfiguration: jest.fn(() => {return Promise.resolve(jest.fn());})
  }
});

describe('App', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('has a SearchBar', () => {
    const component = shallow(<App />);
    expect(component.find('SearchBar').length).toBe(1);
  });

  it('can receive searchs from SearchBar', () => {
    const component = shallow(<App />);
    const searchbar = component.find('SearchBar').getElement();
    expect(searchbar.props.onSearch).toBe(component.instance().onSearch);
  });

  describe('when searching', () => {

    beforeEach(() => {
      FilmsService.searchFilms.mockImplementation(() => Promise.resolve(FilmsMock.json()));
      FilmsService.getConfiguration.mockImplementation(() => Promise.resolve(ConfigurationMock.json()));
    });

    it('calls the API service with the search', () => {
      const search = 'warriors';
      const component = shallow(<App />);
      component.instance().onSearch(search);
      expect(FilmsService.searchFilms.mock.calls[0][0]).toBe(search);
    });

    it('updates state with API response', async() => {
      const search = 'warriors';
      const component = shallow(<App />);
      await component.instance().onSearch(search);
      const state = component.state();
      const result = FilmsMock.json();
      expect(state.films).toEqual(result.results);
      expect(state.totalPages).toEqual(result.total_pages);
      expect(state.page).toEqual(result.page);
      expect(state.searchText).toEqual(search);
    });

    it('renders spinner if loading', () => {
      const component = shallow(<App />);
      component.setState({isLoading: true});
      expect(component.find('Spinner').length).toBe(1);
      component.setState({isLoading: false});
      expect(component.find('Spinner').length).toBe(0);
    });

    it('loads more results if LOAD MORE is clicked', async () => {
      const search = 'warriors';
      const component = shallow(<App />);
      await component.instance().onSearch(search);
      let secondResponse = {...FilmsMock.json()};
      secondResponse.page = 2;
      secondResponse.total_pages = 2;
      component.update();
      expect(component.find('button').length).toBe(1);
      FilmsService.searchFilms.mockImplementation(() => Promise.resolve(secondResponse));
      await component.instance().loadMore();
      const state = component.state();
      expect(state.films.length).toBe(40);
      expect(state.totalPages).toEqual(2);
      expect(state.page).toEqual(2);
      component.update();
      expect(component.find('button').length).toBe(0);
    });


  });
});