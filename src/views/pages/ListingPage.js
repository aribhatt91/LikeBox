import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Page from './Page';
import fetchItems from './../../service/fetchItems';
import LoadingModule from './../components/LoadingModule';
import { ProductCard } from './../components/ProductCard';

class ListingPage extends Page {
  constructor(props){
    super(props);
    this.state = {
      pending: true,
      items: [],
      error: null
    }
  }
  componentDidMount(){
    const {fetchProducts} = this.props;
    fetchProducts();
  }

  render() {
    return (
      <div className="products-section">
        {this.props.pending && <LoadingModule text="Please wait..."></LoadingModule>}
        {!this.props.pending && this.props.items.length > 0 && 
          <div>
            {this.props.items.map((item)=>{
              return (<ProductCard 
                title={item.name}
                img={item.thumbnail}
                price={item.price}
                link={"/products/" + item.sku}
                rating={item.ratings}
                brand={item.brand}
                ></ProductCard>)
            })}
          </div>}
        {!this.props.pending && this.props.items.length === 0 && <div>No products found</div>} 
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log('mapStateToProps called', state);
  return {
    pending: state.itemsReducer.pending,
    items: state.itemsReducer.items,
    error: state.itemsReducer.error
  }
}
//Anything returned from this function will end up as props to BookList container
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchProducts: fetchItems}, dispatch)
//Promote BookList from a component to a container
//It needs to know about this dispatch method selectBook -- Make it available as prop
export default connect(mapStateToProps, mapDispatchToProps)(ListingPage);
