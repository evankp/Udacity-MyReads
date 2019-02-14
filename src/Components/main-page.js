import React from 'react';
import BookShelf from './bookshelf';
import PropTypes from 'prop-types';

export default class MainPage extends React.Component {
    static propTypes = {
        bookshelves: PropTypes.array.isRequired
    };

    sortBooksByBookshelf = (array, shelf) => {
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
                        <BookShelf key={bookshelf.id} shelf={bookshelf} books={this.sortBooksByBookshelf(books, bookshelf)}/>
                    ))}
                </div>
                <div className="open-search">
                    <button onClick={() => this.setState({showSearchPage: true})}>Add a book</button>
                </div>
            </div>
        )
    }
}