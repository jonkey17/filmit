const fetchData = (url, opt) => {
  return fetch(url).then(r => r.json());
}

const searchFilms = (searchText, opt) => {
  const url = opt.page ? `https://api.themoviedb.org/3/search/movie?api_key=${opt.key}&query=${searchText}&page=${opt.page}` : `https://api.themoviedb.org/3/search/movie?api_key=${opt.key}&query=${searchText}`;
  return fetchData(url);
}

const getConfiguration = (opt) => {
  const url = `https://api.themoviedb.org/3/configuration?api_key=${opt.key}`;
  return fetchData(url);
}

export default {
  searchFilms,
  getConfiguration
}