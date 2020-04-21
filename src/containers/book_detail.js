import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';

class BookDetail extends Component{
  render(){
    if(!this.props.book){
      return (<div><h3>Click on a book</h3></div>);
    }
    return(
      <div>
        <p>
          {this.props.book.title}
        </p>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    book:state.activeBook
  };
}
//Promote BookList from a component to a container
//It needs to know about this dispatch method selectBook -- Make it available as prop
export default connect(mapStateToProps)(BookDetail);
