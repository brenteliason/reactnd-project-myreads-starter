import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';
import MainPage from './MainPage';
import SearchPage from './SearchPage';
import BookList from './BookList'
//import BookShelfChanger from './BookShelfChanger'
import Book from './Book'
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [
      {
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
        shelf: "current",
        width: 128,
        height: 188,
        backgroundImage: 'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")'
      },
      {
        title: "1776",
        authors: "David McCullough",
        shelf: "want",
        width: 128,
        height: 193,
        backgroundImage: 'url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")'
      },
      {
        title: "Harry Potter and the Sorcerer's Stone",
        authors: "J.K. Rowling",
        shelf: "want",
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
        shelf: "want",
        width: 128,
        height: 192,
        backgroundImage: 'url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")'
      }
    ]
  }

  //const static masterBookList = this.state.books;

  changeShelf(event) {

    console.log("Inside App, book shelf changer used")
    //console.log(event)
    //console.log(event.target)

    //console.log(event.target.value)
    let selectedBook = event.target.parentElement.parentElement.parentElement
    //console.log(selectedBook)
    let bookTitle = selectedBook.getElementsByClassName("book-title")[0].innerText
    console.log("Title of target book: " + bookTitle)
    //for (let i = 0; i < masterBookList.length; i++) {
      //console.log("Book title is: " + masterBookList[i].title);
    //}
    //console.log("This is: ")
    //console.log(this.state)
    if (event.target.value === "currentlyReading") {
      console.log("Current shelf selected")
      /*this.state.books.map((book) => (
        if (book.title === bookTitle) {
          console.log("Found a matching book title")
        }
      )*/
    }
    if (event.target.value === "wantToRead")
      console.log("want shelf selected")
    if (event.target.value === "read")
      console.log("read shelf selected")
    if (event.target.value === "none")
      console.log("no shelf selected")
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/search" component={SearchPage}/>
      </div>
    )
  }
}

export default BooksApp
