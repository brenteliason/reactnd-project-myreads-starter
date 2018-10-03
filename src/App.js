import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import MainPage from './MainPage';
import SearchPage from './SearchPage';


class BooksApp extends React.Component {
  render() {
    //render method returns the main page or the searchpage based on the current path
    return (
      <div className="App">
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/search" component={SearchPage}/>
      </div>
    );
  }
}

export default BooksApp
