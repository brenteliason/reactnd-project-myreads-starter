import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Shelf extends Component {

	render() {
    <div className="bookshelf">
      <h2 className="bookshelf-title">{this.props.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            this.props.books.map((book, key) => <Book book={book} key={key} updateBook={this.props.updateBook} />)
          }
        </ol>
      </div>
    </div>
  }
}

export default Shelf
