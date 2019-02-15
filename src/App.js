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
            .then(booksArr => {
                const newArray = booksArr.map(book => {
                    if (book.categories) {
                        book.categories = book.categories.map(category => category.toLowerCase())
                    }

                    return book
                });

                this.setState({
                    books: newArray
                })
            })

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log(this.state.books)
    }

    bookAction = (selectedBook, action) => {
        this.setState(state => ({
            books: state.books.map(book => {
                return (book.id === selectedBook.id ? {...book, shelf: action} : book)
            })
        }));

        BooksAPI.update(selectedBook, action)

    };

    render() {
        return (
            <div className="app">
                <Route path='/search' render={(props) => <SearchPage {...props} books={this.state.books} bookAction={this.bookAction}/>}/>
                <Route exact path="/" render={() => <MainPage bookshelves={this.state.bookshelves}
                                                              books={this.state.books} bookAction={this.bookAction}/>}/>
            </div>
        )
    }
}

export default BooksApp
