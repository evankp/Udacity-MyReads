import React from 'react';
import PropTypes from 'prop-types';

export default class Book extends React.Component {
    static propTypes = {
        bookObj: PropTypes.object.isRequired,
        bookAction: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.selectBox = React.createRef();
    }

    selectBookAction = (event) => {
        event.preventDefault();

        this.props.bookAction(this.props.bookObj, event.target.value)
    };

    render() {
        const {bookObj: book} = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url("${book.imageLinks.thumbnail}")`
                    }}/>
                    <div className="book-shelf-changer">
                        <select ref={this.selectBox} onChange={this.selectBookAction}>
                            <option value="move" disabled>Move to...</option>
                            <option>-----</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors.map((author, index) => (
                    // If multiple authors separate with ";" but not at the end
                    <span key={author}>{index === (book.authors.length - 1) ? author : `${author}; `}</span>
                ))}</div>
            </div>
        )
    }
}