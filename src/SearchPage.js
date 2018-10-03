import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import './App.css';

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
    BooksAPI.getAll().then(response => {
      //console.log(response);
      this.updateQuery(this.state.query);
      this.setState({ books : response})
    });
  }

  updateQuery = (query) => {
    //console.log("Latest query: " + query);
    this.setState({query : query}, this.submitSearch);
  }

  submitSearch() {
    //console.log("submit search called with " + this.state.query + " as query");
    if(this.state.query === '' || this.state.query === undefined) {
      //console.log("EMPTY OR UNDEFINED QUERY: Number of results equals " + this.state.results.length + " before being reset to zero");
      return this.setState({ results: [] });
    }
    BooksAPI.search(this.state.query.trim()).then(res => {
      //console.log(res);
      if (res.error) {
        //console.log("ERROR CAUGHT: Number of results equals " + this.state.results.length + " before being reset to zero");
        return this.setState({ results: [] });
      }
      else {
        res.forEach(b => {
          let f = this.state.books.filter(B => B.id === b.id);
          //console.log(f);
          if (f[0]) {
            //console.log("match\n\t" + f);
            b.shelf = f[0].shelf;
          }
          //console.log("INSIDE SUBMIT SEARCH ELSE BLOCK: about to set number of results to: " + res.length);
          return this.setState({ results: res});
        });
      }
    });
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(response => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }));
    });
  }

  render() {
    //console.log("Rendering search page with " + this.state.results.length + " results");
    /*if (this.state.query === "") {
        this.updateQuery("");
    }*/

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
