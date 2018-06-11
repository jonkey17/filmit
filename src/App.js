import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SearchBar from './components/SearchBar/SearchBar';
import Filmslist from './components/FilmsList/FilmsList';
import Spinner from './components/Spinner/Spinner';

import FilmsService from './api';

const API_KEY = 'ab92603edf0dbc791ad9abc10281a70c';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      configuration: {},
      isLoading: false,
      searchText: ''
    };

    this.onSearch = this.onSearch.bind(this);
    this.loadMore = this.loadMore.bind(this);

  }

  componentDidMount() {
    FilmsService.getConfiguration({
      key: API_KEY
    }).then(res => {
      this.setState({configuration: res});
    });
  }

  onSearch(searchText) {
    this.setState({isLoading: true});
    this.search(searchText, {
      cleanLoad: true
    });
  }

  search(searchText, {cleanLoad, page}){
    this.setState({isLoading: true});
    FilmsService.searchFilms(searchText, {
      key: API_KEY,
      page
    }).then(res => {
      this.setState({isLoading: false});
      let films;
      if (cleanLoad) {
        films = res.results;
      } else {
        films = [...this.state.films, ...res.results];
      }
      this.setState({
        films: films,
        searchText: searchText,
        page: res.page,
        totalPages: res.total_pages,
      });
    });
  }

  loadMore() {
    this.search(this.state.searchText, {
      page: this.state.page + 1
    });
  }

  loadMoreButton() {
    if ((this.state.films.length) && (this.state.page !== this.state.totalPages)&&(!this.state.isLoading)) {
      return (
        <div className="LoadMore">
          <button onClick={this.loadMore}>LOAD MORE</button>
        </div>
      )
    } else if (this.state.isLoading) {
      return <Spinner />
    }
  }

  render() {
    return (
      <div className="App">
        <SearchBar onSearch={this.onSearch} />
        <Filmslist films={this.state.films} imageFormat={this.state.configuration.images}/>
        {this.loadMoreButton()}
      </div>
    );
  }
}

export default App;
