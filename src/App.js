import React from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css';
import 'react-notifications/lib/notifications.css';
import {Route} from "react-router-dom";
import SearchPage from "./Components/search-page";
import MainPage from "./Components/main-page";
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types'
import {NotificationContainer, NotificationManager} from "react-notifications";

class BooksApp extends React.Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

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

        books: [],
    };

    getBooks = () => {
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
        this.getBooks()
    }

    bookAction = (selectedBook, action) => {
        BooksAPI.update(selectedBook, action)
            .then(() => this.getBooks());
    };

    createNotification = (type, message) => {
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

export default withRouter(BooksApp)
