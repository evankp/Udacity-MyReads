import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import Book from "./book";
import * as BooksAPI from '../BooksAPI';

/*NOTES: The search from BooksAPI is limited to a particular set of search terms.
You can find these search terms here:
https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
you don't find a specific author or title. Every search is limited by search terms.*/

export default class SearchPage extends React.Component {
    /*
    * books = The books array
    * */
    static propTypes = {
        books: PropTypes.array.isRequired
    };

    state = {
        searchTerm: '',
        results: []
    };


    handleSearchChange = event => {
        // Update search term then search the backend for the book
        this.setState({searchTerm: event.target.value});

        if (event.target.value !== '') {
            BooksAPI.search(event.target.value).then(res => this.setState({results: res}));
        } else {
            this.setState(() => ({results: []}))
        }

    };

    resetSearchTerm = e => {
        // Reset the search term
        if (e) {
            e.preventDefault();
        }

        this.setState({
            searchTerm: '',
            results: []
        })
    };

    moveOptions = book => {
        // Options for search page and determining if the book is already on a shelf
        const {books} = this.props;
        let matchingBook = {},
            bookInLib = false;

        let optionsArray = [
            {value: 'move', name: "Add to...", disabled: true},
            {value: 'currentlyReading', name: 'Currently Reading'},
            {value: 'wantToRead', name: 'Want to Read'},
            {value: 'read', name: 'Read'},
            {value: 'none', name: 'None'}
        ];

        books.forEach(existingBook => {
            if (existingBook.id === book.id) {
                matchingBook = existingBook;
                bookInLib = true
            }
        });

        optionsArray.forEach(option => {
            if (option.value === matchingBook.shelf) option.disabled = true;
            if (!bookInLib && option.value === 'none') option.disabled = true
        });

        return optionsArray
    };

    render() {
        let {bookAction} = this.props,
            {searchTerm} = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={searchTerm}
                               onChange={this.handleSearchChange}/>
                    </div>
                </div>
                <div className="search-books-results">
                    {searchTerm !== "" && (
                        <div className="search-books-term">
                            <p>Search results for: <span>{searchTerm}</span></p>
                            <button className="text-button" onClick={this.resetSearchTerm}>Reset</button>
                        </div>
                    )}

                    {searchTerm === '' && (
                        <div className="search-books-term">
                            <p>No Results</p>
                        </div>
                    )}
                    <ol className="books-grid">
                        {/* If there is an error or no search term, do not show books. */}
                        {!("error" in this.state.results || this.state.searchTerm === '') && this.state.results.map(book => (
                            <li key={book.id}><Book {...this.props} bookObj={book} bookAction={bookAction}
                                                    options={this.moveOptions(book)}/>
                            </li>
                        ))
                        }
                    </ol>
                </div>
            </div>
        )
    }
}