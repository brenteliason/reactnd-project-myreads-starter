import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

class Book extends Component {
  state = {
    shelf: this.props.shelf
  }

  changeShelf(event) {
    console.log("Inside book, shelf changer used")
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
            <div className="book-cover" style={{ width:this.props.width, height:this.props.height, backgroundImage:this.props.backgroundImage }}></div>
            <div className="book-shelf-changer">
              <select value={this.props.shelf || "none"} onChange={(e) => { this.props.updateBook(this.props.book, e.target.value) }}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.title}</div>
          <div className="book-authors">{this.props.authors && this.props.authors[0] || "No author"}</div>
        </div>
      )
    }
}

export default Book
