import React from 'react';
import PropTypes from 'prop-types';
const noCoverURL = '';

export default class Book extends React.Component {
    static propTypes = {
        /*
        * BookObj = list of books
        * bookAction = option callback in app.js
        * options = dynamic options based on page -- if needed
        * */
        bookObj: PropTypes.object.isRequired,
        bookAction: PropTypes.func.isRequired,
        options: PropTypes.array.isRequired
    };

    state = {
        optionVal: "move"
    };

    selectBookAction = (event) => {
        /*
        * 1. Set the option selection state (optionVal)
        * 2. Call the bookAction function from App.js
        * 3. Create a success notification to let the user know their action has worked
        * */
        const {bookObj: book, createNotification} = this.props;
        event.preventDefault();

        this.setState({optionVal: event.target.value});

        this.props.bookAction(book, event.target.value);
        createNotification('success', `"${book.title}" successfully moved!`)
    };

    render() {
        const {bookObj: book, options} = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 193,
                        // IF no book cover just put a empty string, causing the gray cover image as a no-cover-image
                        backgroundImage: `url("${book.imageLinks ? book.imageLinks.thumbnail: noCoverURL}")`
                    }}/>
                    <div className="book-shelf-changer">
                        <select value={this.state.optionVal} onChange={this.selectBookAction}>
                            {/* Map over the options passed down through props to create dynamic options */}
                            {options.map(option => <option key={option.value} value={option.value}
                                                           disabled={option.disabled} data-shelf={option.name}>{option.name}</option>)}
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors && (
                    book.authors.map((author, index) => (
                        // If multiple authors separate with ";" but not at the end
                        <span key={author}>{index === (book.authors.length - 1) ? author : `${author}; `}</span>
                    ))
                )}</div>
            </div>
        )
    }
}