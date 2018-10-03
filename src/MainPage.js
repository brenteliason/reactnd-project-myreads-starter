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
      books: [
        /*{
          title: "To Kill A Mockingbird",
          authors: "Harper Lee",
          shelf: "read",
          width: 128,
          height: 193,
          backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")'
        },
        {
          title: "Ender's Game",
          authors: "Orson Scott Card",
          shelf: "currentlyReading",
          width: 128,
          height: 188,
          backgroundImage: 'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")'
        },
        {
          title: "1776",
          authors: "David McCullough",
          shelf: "favorite",
          width: 128,
          height: 193,
          backgroundImage: 'url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")'
        },
        {
          title: "Harry Potter and the Sorcerer's Stone",
          authors: "J.K. Rowling",
          shelf: "read",
          width: 128,
          height: 192,
          backgroundImage: 'url("http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api")'
        },
        {
          title: "The Hobbit",
          authors: "J.R.R. Tolkien",
          shelf: "read",
          width: 128,
          height: 192,
          backgroundImage: 'url("http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api")'
        },
        {
          title: "Oh, the Places You'll Go!",
          authors: "Seuss",
          shelf: "read",
          width: 128,
          height: 174,
          backgroundImage: 'url("http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api")'
        },
        {
          title: "The Adventures of Tom Sawyer",
          authors: "Mark Twain",
          shelf: "wantToRead",
          width: 128,
          height: 192,
          backgroundImage: 'url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")'
        }*/
      ]
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then(response => {
      console.log(response);
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
