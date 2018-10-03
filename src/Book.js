import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

class Book extends Component {
  componentDidMount() {
      console.log(this);
  }

	render() {
      //console.log(this.props.title);
      //console.log(this.props.authors);
      //console.log(this.props.width);
      //console.log(this.props.height);
      //console.log(this.props.backgroundImage);
      //console.log(this.props.shelf);
      return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width:128, height:192, backgroundImage:`url("${this.props.book.imageLinks && this.props.book.imageLinks.thumbnail || ""}")` }}></div>
            <div className="book-shelf-changer">
              <select value={this.props.book.shelf || "none"} onChange={(e) => { this.props.updateBook(this.props.book, e.target.value) }}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{this.props.book.authors[0] || "No author"}</div>
        </div>
      )
    }
}

export default Book
