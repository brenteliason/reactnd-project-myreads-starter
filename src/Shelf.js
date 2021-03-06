import React, { Component } from 'react';
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
              <Book book={book} key={key} updateBook={this.props.updateBook} />
          ))}
        </ol>
      </div>
    </div>
  )
  }
}

export default Shelf
