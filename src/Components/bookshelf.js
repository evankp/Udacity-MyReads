import React from 'react';
import PropTypes from 'prop-types';
import Book from "./book";

export default class BookShelf extends React.Component {
    /*
    * shelf = The book shelf object
    * books = THe array of books
    * bookAction = the callback to move books between shelves
    * */
    static propTypes = {
        shelf: PropTypes.object.isRequired,
        books: PropTypes.array.isRequired,
        bookAction: PropTypes.func.isRequired
    };

    bookshelfOptions = shelf => {
        // Create main page options for books
        let optionsArray = [
            {value: 'move', name: "Move to...", disabled: true},
            {value: 'currentlyReading', name: "Currently Reading"},
            {value: 'wantToRead', name: "Want to Read"},
            {value: 'read', name: "Read"},
            {value: 'none', name: "None"},
        ];

        optionsArray.forEach(option => {
            // The move options is permanently disabled, IE - a label in the select menu
            if (option.value === 'move') return;

            // If the option is the current shelf, disable it; no point in moving to current shelf
            option.value === shelf.id ? option.disabled = true : option.disabled = false
        });

        return optionsArray
    };

    render() {
        let {shelf: bookshelf, books} = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{bookshelf.name}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {/* -- Map each book to li tag -- */}
                        {books.length
                            ? books.map(book => <li key={book.id}><Book {...this.props} bookObj={book}
                                                                        options={this.bookshelfOptions(bookshelf)}/></li>)
                            : <li>There are currently no books in this category</li>
                        }

                    </ol>
                </div>
            </div>
        )
    }
}