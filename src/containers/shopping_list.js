import React, { Component } from 'react';
import { connect } from 'react-redux';

class ShoppingList extends Component {

  renderList(){
    return this.props.shoppingList.map((item) => {
      return (
        <li
          key={item.title}
          className="list-group-item">
          {item.title}
        </li>
      );
    });
  }

  render(){
    return (
      <ul className="list-group col-sm-4">
        { this.renderList() }
      </ul>
    );
  }
}

function mapStateToProps(state){
  return {
    shoppingList: state.shoppingList
  };
}

export default connect(mapStateToProps)(ShoppingList);
