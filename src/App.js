import React from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css';
import 'react-notifications/lib/notifications.css';
import {Route} from "react-router-dom";
import SearchPage from "./Components/search-page";
import MainPage from "./Components/main-page";
import {NotificationContainer, NotificationManager} from "react-notifications";

export default class BooksApp extends React.Component {
    state = {
        bookshelves: [
            {name: 'Want to Read', id: 'wantToRead'},
            {name: 'Currently Reading', id: 'currentlyReading'},
            {name: 'Read', id: 'read'}
        ],

        books: [],
    };

    getBooks = () => {
        // Get books from backend and then set the books state with the books
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
    };
    componentDidMount() {
        // First pass of book state update
        this.getBooks()
    }

    bookAction = (selectedBook, action) => {
        // Update the shelf of book that is being moving and then re-fetch book list
        BooksAPI.update(selectedBook, action)
            .then(() => this.getBooks());
    };

    createNotification = (type, message) => {
        // Show a notification of any kind
            switch (type) {
                case 'success':
                    NotificationManager.success(message);
                    break;

                case 'error':
                    NotificationManager.error(message);
                    break;

                default:
                    NotificationManager.info(message)
            }
    };

    render() {
        // Bundle the book related props that are shared between both routes, to make it easier to read route lines
        const bookProps = {
            books: this.state.books,
            bookAction: this.bookAction
        };

        return (
            <div className="app">
                <NotificationContainer/>
                <Route path='/search' render={(props) => <SearchPage {...props} {...bookProps}
                                                                     createNotification={this.createNotification} />}/>

                <Route exact path="/" render={(props) => <MainPage {...props} {...bookProps}
                                                                   bookshelves={this.state.bookshelves}
                                                                   createNotification={this.createNotification}/>}/>
            </div>
        )
    }
}