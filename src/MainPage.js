import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom';
import BookList from './BookList'
//import BookShelfChanger from './BookShelfChanger'
import Book from './Book'
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then(resp => {
      this.setState([books : resp])
    });
  }
  //const static masterBookList = this.state.books;

  updateBook = (book, shelf) => {
    console.log("Update book called on main page for " + book + " on the " + shelf + " shelf");
    /*BooksAPI.update(book, shelf).then(resp => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(test => test.id !== book.id).concat([book])
      }));
    });*/
  }

  render() {
//create sublists from booklist filtered by book state shelf

    let currentShelf, wantShelf, readShelf;
    currentShelf = this.state.books.filter((book) => book.shelf === "current")
    //console.log("Current shelf first book: " + currentShelf[0].title)
    wantShelf = this.state.books.filter((book) => book.shelf === "want")
    //console.log("Want to read shelf first book: " + wantShelf[0].title)
    readShelf = this.state.books.filter((book) => book.shelf === "read")
    //console.log("Read shelf first book: " + readShelf[0].title)

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="book-page">
            <BookList books={this.state.books} updateBook={this.updateBook} />
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default MainPage
