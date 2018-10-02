import React from 'react'
 import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom';

import Book from './Book'


class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      results: [],
      query: ""
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then(resp => {
      this.setState([books : resp]);
    });
  }

  updateQuery = (query) => {
    this.setState({query : query}, this.submitSearch);
  }

  submitSearch() {
    console.log("Submit search function called on search page");
    /*if(this.state.query === '' || this.state.query === undefined) {
      return this.setState({ results: [] });
    }
    BooksAPI.search(this.state.query.trim()).then(res => (
      if (res.error) {
        return this.setState({ results: [] });
      }
      else {
        res.forEach(b => (
          let f = this.state.books.filter(b => b.id === f.id);
          if (f[0])
            b.shelf = f[0].shelf;
        ))
        return this.setState({ results: res});
      }
    ));*/
  }

  updateBook = (book, shelf) => (
    console.log("Update book called on search page")
    /*BooksAPI.update(book, shelf).then(resp => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(test => test.id !== book.id).concat([book])
      }));
    });*/
  )

  render() {
    return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={this.state.query}
                  onChange={(event) => this.updateQuery(event.target.value)} />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {
                  this.state.results.map((book, key) => <Book updateBook={this.updateBook} book={book} key={key} />)
                }
              </ol>
            </div>
          </div>
    )
  }
}

export default SearchPage
