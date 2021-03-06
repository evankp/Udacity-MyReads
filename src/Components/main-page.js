import React from 'react';
import BookShelf from './bookshelf';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

export default class MainPage extends React.Component {
    static propTypes = {
        /*
        * bookshelves = the bookshelf array
        * bookAction = book move option callback
        * books = all list of books regardless of shelf
        * */
        bookshelves: PropTypes.array.isRequired,
        bookAction: PropTypes.func.isRequired,
        books: PropTypes.array.isRequired
    };

    sortBooksByBookshelf = (array, shelf) => {
        // Limit each book for each shelf
        return array.filter(book => book.shelf === shelf.id)
    };

    render() {
        const {bookshelves, books} = this.props;
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {/* -- Map over bookshelves and filter the books to put on shelf by shelf id  -- */}
                    {bookshelves.map(bookshelf => (
                        <BookShelf {...this.props} key={bookshelf.id} shelf={bookshelf}
                                   books={this.sortBooksByBookshelf(books, bookshelf)}/>
                    ))}
                </div>
                <div className="open-search">
                    <Link to="/search">
                        <button>Add a book</button>
                    </Link>
                </div>
            </div>
        )
    }
}