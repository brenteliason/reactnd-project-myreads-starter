import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Shelf extends Component {
  componentDidMount() {
    //console.log(this);
  }

	render() {
    return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{this.props.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {this.props.contents.map((book, key) => (
              <Book book={book} key={key} updateBook={this.props.updateBook} title={book.title} authors={book.authors} shelf={book.shelf} onShelfChange={this.props.onShelfChange} width={book.width} height={book.height} backgroundImage={book.backgroundImage} />
          ))}
        </ol>
      </div>
    </div>
  )
  }
}

export default Shelf
