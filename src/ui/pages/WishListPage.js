import React, { Component } from 'react'
import UserWishListFragment from './fragments/UserWishListFragment';

export default class WishListPage extends Component {
    constructor(props){
        super(props);
    }

    //componentDidMount(){}
    render() {
        return (
            <div className="page">
                <UserWishListFragment/>
            </div>
        )
    }
}
