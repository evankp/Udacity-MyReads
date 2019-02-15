import React from 'react';
import PropTypes from 'prop-types';
import Book from "./book";

export default class BookShelf extends React.Component {
    static propTypes = {
        shelf: PropTypes.object.isRequired,
        books: PropTypes.array.isRequired,
        bookAction: PropTypes.func.isRequired
    };

    render() {
        let {shelf: bookshelf, books, bookAction} = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{bookshelf.name}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {/* -- Map each book to li tag -- */}
                        {books.length
                            ? books.map(book => <li key={book.id}><Book bookObj={book} bookAction={bookAction}/></li>)
                            : <li>There are currently no books in this category</li>
                        }

                    </ol>
                </div>
            </div>
        )
    }
}