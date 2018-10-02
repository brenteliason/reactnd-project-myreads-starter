import React, { Component } from 'react'
import Book from "./Book"
import BookShelfChanger from "./BookShelfChanger"
class BookList extends Component {

	state = {
		books: []
	}

	componentDidMount() {
      this.setState({ books: this.props.books })
  }

	render() {
		//this.setState({books: this.props.books})
		let readShelf, currentShelf, wantShelf;
		readShelf = this.props.books.filter((book) => book.shelf === "read")
		//console.log("Read shelf first book: " + readShelf[0].title)
		currentShelf = this.props.books.filter((book) => book.shelf === "current")
		//console.log("Current shelf first book: " + currentShelf[0].title)
		wantShelf = this.props.books.filter((book) => book.shelf === "want")
		//console.log("Want to read shelf first book: " + wantShelf[0].title)

      return (
				<div className="list-books">
					<div className="list-books-title">
						<h1>MyReads</h1>
					</div>
					<div className="list-books-content">
						<div>
							<div className="bookshelf">
								<h2 className="bookshelf-title">Currently Reading</h2>
								<div className="bookshelf-books">
									<ol className="books-grid">
										{readShelf.map((book) => (
											<li key={book.title}>
												<Book title={book.title} authors={book.authors} shelf={book.shelf} onShelfChange={this.props.onShelfChange} width={book.width} height={book.height} backgroundImage={book.backgroundImage} />
											</li>
										))}
									</ol>
								</div>
							</div>
							<div className="bookshelf">
								<h2 className="bookshelf-title">Want to Read</h2>
								<div className="bookshelf-books">
									<ol className="books-grid">
										{currentShelf.map((book) => (
											<li key={book.title}>
												<Book title={book.title} authors={book.authors} shelf={book.shelf} onShelfChange={this.props.onShelfChange} width={book.width} height={book.height} backgroundImage={book.backgroundImage} />
											</li>
										))}
									</ol>
								</div>
							</div>
							<div className="bookshelf">
								<h2 className="bookshelf-title">Read</h2>
								<div className="bookshelf-books">
									<ol className="books-grid">
										{wantShelf.map((book) => (
											<li key={book.title}>
												<Book title={book.title} authors={book.authors} shelf={book.shelf} onShelfChange={this.props.onShelfChange} width={book.width} height={book.height} backgroundImage={book.backgroundImage} />
											</li>
										))}
									</ol>
								</div>
							</div>
						</div>
					</div>
				</div>
      )
    }
}

export default BookList
