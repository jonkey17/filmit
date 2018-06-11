import FilmsService from './';

import FilmsMock from './FilmsMock';

const TEST_KEY = 'TEST_KEY';

describe('FilmsService', () => {

  beforeEach(() => {
    jest.resetModules();
  });

  test('Api Service has getMovies function', () => {
    expect(FilmsService.searchFilms).toBeDefined();
  });

  test('get movies calls for API movies', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(FilmsMock));
    const response = await FilmsService.searchFilms('warrios', {
      key: TEST_KEY
    });
    const urlCalled = window.fetch.mock.calls[0][0];
    expect(urlCalled).toBe('https://api.themoviedb.org/3/search/movie?api_key=TEST_KEY&query=warrios')
    expect(response).toEqual(FilmsMock.json());
  });

  test('paginates', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(FilmsMock));
    const response = await FilmsService.searchFilms('warrios', {
      key: TEST_KEY,
      page: 2
    });
    const urlCalled = window.fetch.mock.calls[0][0];
    expect(urlCalled).toBe('https://api.themoviedb.org/3/search/movie?api_key=TEST_KEY&query=warrios&page=2')
    expect(response).toEqual(FilmsMock.json());
  });

  test('has a getConfiguration method', () => {
    expect(FilmsService.getConfiguration).toBeDefined();
  });

  test('getConfiguration', async () => {
    const configurationResponse = {
      json: () => {
        return {
          config: 1
        }
      }
    }
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(configurationResponse));
    const response = await FilmsService.getConfiguration({
      key: TEST_KEY,
    });
    expect(response).toEqual(configurationResponse.json());
  });


});
