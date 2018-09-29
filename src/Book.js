import React, { Component } from 'react'
import BookShelfChanger from './BookShelfChanger'

class Book extends Component {
  state = {
    shelf: this.props.shelf
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
            <BookShelfChanger/>
          </div>
          <div className="book-title">{this.props.title}</div>
          <div className="book-authors">{this.props.authors}</div>
        </div>
      )
    }
}

export default Book
