import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';

class BookList extends Component{
  renderList(){
    return this.props.books.map((book, index) => {
      return (
        <li
          key={index}
          className="list-group-item"
          onClick={() => this.props.selectBook(book)}>
          {book.title}
        </li>
      );
    });
  }
  render(){
    return(
      <ul className="list-group col-sm-4">
        { this.renderList() }
      </ul>
    );
  }
}

function mapStateToProps(state){
  return {
    books:state.books
  };
}
//Anything returned from this function will end up as props to BookList container
function mapDispatchToProps(dispatch){
  // Whenever selectBook is called, the result should be passed to all our reducers
  return bindActionCreators({selectBook: selectBook}, dispatch);
}
//Promote BookList from a component to a container
//It needs to know about this dispatch method selectBook -- Make it available as prop
export default connect(mapStateToProps, mapDispatchToProps)(BookList);
