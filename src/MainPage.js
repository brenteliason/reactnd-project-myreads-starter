import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Shelf from './Shelf';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  //this method uses the BooksAPI getAll method to load all the selected books and add them to state
  componentDidMount() {
    BooksAPI.getAll().then(response => {
      //console.log(response);
      this.setState({ books : response})
    });
  }

  //this method uses the BooksAPI update method to change a book's shelf
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
    //creates lists of books based on shelf that can be passed into Shelf components
    let currentShelf, readShelf, wantShelf;
    currentShelf = this.state.books.filter((book) => book.shelf === "currentlyReading")
    //console.log("Current shelf first book: " + currentShelf[0].title)
    readShelf = this.state.books.filter((book) => book.shelf === "read")
    //console.log("Read shelf first book: " + readShelf[0].title)
    wantShelf = this.state.books.filter((book) => book.shelf === "wantToRead")
    //console.log("Want to read shelf first book: " + wantShelf[0].title)

    //returns all the currently shelved books organized by shelf as well as a link to the search page
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
