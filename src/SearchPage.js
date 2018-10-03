import React from 'react';
import { Link } from 'react-router-dom';
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

  //after the search page is rendered, the BooksAPI getAll method is called to update the list of books held in state
  componentDidMount() {
    BooksAPI.getAll().then(response => {
      //console.log(response);
      this.setState({ books : response})
    });
  }

  //this method updates the query held in state with the latest contents of the search bar and then calls submitSearch
  updateQuery = (query) => {
    //console.log("Latest query: " + query);
    this.setState({query : query}, this.submitSearch);
  }

  //If the query is not empty or undefined, then this method uses the BooksAPI's search method to select books matching the query
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
      else {//if there are valid results, then we search for any books that are already shelved and update their shelf as rendered on the page
        res.forEach(b => {
          let f = this.state.books.filter(B => B.id === b.id);
          //console.log(f);
          if (f[0]) {
            //console.log("match\n\t" + f);
            b.shelf = f[0].shelf;
          }
          //console.log("INSIDE SUBMIT SEARCH ELSE BLOCK: about to set number of results to: " + res.length);
          return this.setState({ results: res});//after checking for any already shelved books, then we set the results of the search inquiry to state so that they can be rendered on the page
        });
      }
    });
  }

  //this method uses the BooksAPI update method to change a book's shelf, same one is used on main page
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

    //rends the search results in the form of Book components as well as a link back to the main page
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
                  this.state.results.map((book, key) => <Book book={book} key={key} updateBook={this.updateBook} />)
                }
              </ol>
            </div>
          </div>
    )
  }
}

export default SearchPage
