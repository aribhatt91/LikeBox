import React, { Component } from 'react';
function CategoryPageItem() {
    return (
        <div>
            
        </div>
    )
}

/* 
/category/sneakers
*/
export default class CategoryPage extends Component {
    category = null;
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            items: [],
            error: null
        }
    }
    componentDidMount(){
        //call function to fetch products in category
    }
    fetchProductByCategory(){
        
    }
    render() {
        return (
            <div className="page">
                
            </div>
        )
    }
}
