import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import Book from "./book";

/*NOTES: The search from BooksAPI is limited to a particular set of search terms.
You can find these search terms here:
https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
you don't find a specific author or title. Every search is limited by search terms.*/

export default class SearchPage extends React.Component {
    static propTypes = {
        books: PropTypes.array.isRequired
    };

    state = {
        searchTerm: ""
    };

    filterBySearchTerm = (searchTerm) => {
        return (searchTerm === "" ? [] : this.props.books.filter(book => {
           return (book.authors.indexOf(searchTerm) !== -1 ||
               (book.categories && book.categories.indexOf(searchTerm.toLowerCase()) !== -1) ||
                   book.title.includes(searchTerm)
           )
        }))
    };

    render() {
        // let {url} = this.props.match,
            let {bookAction} = this.props;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.searchTerm}
                               onChange={event => this.setState({searchTerm: event.target.value})}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.filterBySearchTerm(this.state.searchTerm).map(book => (
                            <li key={book.id}><Book bookObj={book} bookAction={bookAction}/></li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}