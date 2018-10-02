import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';
import MainPage from './MainPage';
import SearchPage from './SearchPage';

class BooksApp extends React.Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/search" component={SearchPage}/>
      </div>
    );
  }
}

export default BooksApp
