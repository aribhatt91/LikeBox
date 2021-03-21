import React, { useContext } from 'react';
import AppButton from './generic/AppButton';
import { AuthContext } from './../../store/contexts/AuthContext';
import { addItemToWishList } from '../../service/wishlistMethods';
import AppImage from './generic/AppImage';


export function ProductCardPlaceholder () {
    return (
        <div className="product-card-placeholder row mr-0 ml-0 mt-5 mb-5">
            <div className="card-thumb-wrapper-placeholder p-0 col-xs-12 col-md-4 col-lg-3">
            </div>
            <div className="card-text-wrapper col-xs-12 col-md-4 col-lg-5 p-4 pt-md-0 pb-md-0 d-flex flex-column justify-content-between align-center">
                <div className="product-description-placeholder w-100">
                    <div className="card-product-brand-placeholder w-100"></div>
                    <div className="card-product-name-placeholder w-100 mt-4"></div>
                    <div className="card-product-price-placeholder w-100 mt-4"></div>
                </div>
                <div className="action-buttons-placeholder w-100">
                    <div className="button-placeholder w-100"></div>
                    <div className="button-placeholder w-100 mt-2"></div>
                </div>
            </div>
            <div className="card-desc-wrapper-placeholder col-xs-12 col-md-4 col-lg-4 p-4 pt-md-0 pb-md-0">
                <div className="line w-100"></div>
                <div className="line w-100 mt-2"></div>
                <div className="line w-100 mt-2"></div>
            </div>
        </div>
    )
}
const ProductCard = (props) => {
    const {currentUser} = useContext(AuthContext);
    const addToWishList = async () => {
        if(currentUser){
          let res = await addItemToWishList(currentUser.email, props.sku);
          console.log('ProductCard', res);
        }else {
            console.log('User not authenticated');
        }
    }

    return (
        <div className="product-card row mr-0 ml-0 mt-5 mb-5" key={props.sku}>
            <div className="card-thumb-wrapper p-0 col-xs-12 col-md-4 col-lg-3">
{/*                 <img className="card-thumb" src={props.img} alt={props.title}></img>
 */}                <AppImage className="card-thumb" src={props.img} alt={props.title} />
            </div>
            <div className="card-text-wrapper col-xs-12 col-md-4 col-lg-5 p-4 pt-md-0 pb-md-0 d-flex flex-column justify-content-between align-center">
                <div className="product-description">
                    <h3 className="card-product-brand text-center">{props.brand}</h3>
                    <h4 className="card-product-name text-center">{props.title}</h4>
                    <div className="card-product-price text-center">
                        <span>&pound;{props.price}</span>
                    </div>
                </div>
                <div className="action-buttons w-100">
                    <AppButton href={props.link} label="View product" className="w-100"/>
                    <AppButton onClick={addToWishList} label="Add to wishlist" className="btn-white w-100 mt-2"/>
                </div>
            </div>
            <div className="card-desc-wrapper col-xs-12 col-md-4 col-lg-4 p-4 pt-md-0 pb-md-0">
                {
                    (props.desc || "").substr(0, 100).concat("...")
                }
            </div>
        </div>
    );
}


export default ProductCard;