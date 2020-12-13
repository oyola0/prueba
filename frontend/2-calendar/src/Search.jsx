import React, { Component } from 'react';
import './App.css';

class Search extends Component {
  constructor() {
    super();
  }
  handleChange(e) {
    console.log("handling change",e.target.value)
    this.props.handleSearch(e.target.value);
  }
  render() {
    return (
      <div className="search-employee-wrapper">
        <i className="fa fa-search"/>
        <input type="text" className="search-employee"  value={this.props.searchText} onChange={this.handleChange.bind(this)}  placeholder="Buscar empleado"/>
      </div>
    );
  }
}

export default Search;
