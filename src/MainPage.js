import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom';
//import BookList from './BookList'
import Shelf from './Shelf'
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
    BooksAPI.getAll().then(response => {
      //console.log(response);
      this.setState({ books : response})
    });
  }
  //const static masterBookList = this.state.books;

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(response => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }));
    });
  }
  /*updateShelf = (book, shelf) => {
    console.log("Update book called on main page for " + book + " on the " + shelf + " shelf");
    BooksAPI.update(book, shelf).then(resp => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(test => test.id !== book.id).concat([book])
      }));
    });
  }*/

  render() {
//create sublists from booklist filtered by book state shelf

    let currentShelf, favoriteShelf, favoritesShelf, noneShelf, readShelf, wantShelf;

    currentShelf = this.state.books.filter((book) => book.shelf === "currentlyReading")
    //console.log("Current shelf first book: " + currentShelf[0].title)
    readShelf = this.state.books.filter((book) => book.shelf === "read")
    //console.log("Read shelf first book: " + readShelf[0].title)
    wantShelf = this.state.books.filter((book) => book.shelf === "wantToRead")
    //console.log("Want to read shelf first book: " + wantShelf[0].title)

    return (
      <div className="book-page">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Shelf name="Read" contents={readShelf} updateBook={this.updateBook}/>
              <Shelf name="Currently Reading" contents={currentShelf} updateBook={this.updateBook}/>
              <Shelf name="Want To Read" contents={wantShelf} updateBook={this.updateBook}/>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }//end of render method
}//end of class

export default MainPage
