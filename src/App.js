import React from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css';
import {Route} from "react-router-dom";
import SearchPage from "./Components/search-page";
import MainPage from "./Components/main-page";

class BooksApp extends React.Component {
    state = {
        /*
        * TODO: If I were designing the server backend as well, I would allow flexible bookshelfs, but currently
        *   it would seem the backend is not setup for that.
        * */
        bookshelves: [
            {name: 'Want to Read', id: 'wantToRead'},
            {name: 'Currently Reading', id: 'currentlyReading'},
            {name: 'Read', id: 'read'}
        ],

        books: []
    };

    componentDidMount() {
        BooksAPI.getAll()
            .then(booksArr => this.setState({books: booksArr}))

    }

    render() {
        return (
            <div className="app">
                <Route path='/search' render={() => <SearchPage/>}/>
                <Route exact path="/" render={() => <MainPage bookshelves={this.state.bookshelves} books={this.state.books}/>}/>
            </div>
        )
    }
}

export default BooksApp
