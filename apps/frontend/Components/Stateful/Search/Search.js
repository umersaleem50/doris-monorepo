'use client';
import React, { Component } from 'react';
import axios from 'axios';
import { BiSearch as BtnSearch } from 'react-icons/bi';
import { IoCloseOutline as BtnClose } from 'react-icons/io5';

import './Search.scss';
import SearchResult from './result/result';
import Error from '../../../Utils/Error/Error';
import { createRef } from 'react';
class Search extends Component {
  state = {
    isToggle: false,
    products: '',
    results: [],
    isError: false,
    errorMessage: '',
  };

  searchInputRef = createRef();

  async searchResults() {
    try {
      const results = await axios({
        method: 'GET',
        url: this.props.url || '/api/v1/products/',
        params: {
          product: this.state.products,
          select: 'name images stocks',
        },
      });
      // console.log(results.data.data[0]);
      this.setState({ results: results.data.data, isError: false });
      // return results;
    } catch (err) {
      console.log(err.response.status);
      if (err.response.status === 500) {
        this.setState({
          isError: true,
          errorMessage: 'Failed to connect to server. Try again later!',
        });
      }
    }
  }

  //   classes = ["search"].push(() => (this.state.isToggle ? "toggle" : ""));

  render() {
    return (
      <div className={`search`}>
        <BtnSearch
          size={'2rem'}
          color={'var(--color-primary)'}
          onClick={(e) => {
            this.setState({ isToggle: true });
            this.props.searchToggled(e);
          }}
          className="search__btn"
        />
        {this.state.isToggle && (
          <input
            type="text"
            className="search__input"
            placeholder="Search ie. dress, shoes"
            value={this.state.products}
            ref={this.props.innerRef}
            // onFocus={(e) => this.searchResults()}
            onChange={(e) => {
              // console.log(e);
              this.setState({ products: e.target.value });
              this.searchResults();
            }}
          />
        )}
        {this.state.isToggle && (
          <BtnClose
            size={'2rem'}
            style={{ opacity: 0.5 }}
            onClick={(e) => {
              this.setState({ isToggle: false });
              this.props.closeSearch(e);
            }}
          />
        )}
        {this.state.isToggle && (
          <div className="search__results">
            {this.state.results.map((el, i) => (
              <SearchResult
                name={el.name}
                stocks={el.stocks}
                image={el.images[0]}
                id={el.id}
                key={i}
              />
            ))}
            {this.state.isError && (
              <Error type="failed" message={this.state.errorMessage} />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <Search innerRef={ref} {...props} />
));
