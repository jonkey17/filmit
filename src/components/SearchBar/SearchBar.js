import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    }

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event){
    this.setState({searchText: event.target.value});
  }

  render() {
    return (
      <div className="SearchBar">
        <form onSubmit={(event) => {
            event.preventDefault();
            if (this.state.searchText) {
              this.props.onSearch(this.state.searchText);
            }
          }}>
          <input
            className=""
            type="text"
            value={this.state.searchText}
            onChange={this.onInputChange}
            placeholder="search some film"
          />
        </form>
      </div>
    )
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired
}

export default SearchBar;