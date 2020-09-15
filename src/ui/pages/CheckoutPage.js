import Page from './Page';
import React, {useState} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CartService from './../../service/cartOperation';
import ThemedButton from '../components/ThemedButton';

function LoginModule(props){

}
function NewAddressForm({}){

}
function AddressModule({addresses, addNewAddress, selectAddress, editAddress, setDeliverySpeed}){
    useState(expand, setExpand) = useState(false);
    useState(expandAddAddress, setExpandAddAddress) = useState(false);
    useState(dirty, setDirty) = useState(false);
    useState(expandAddAddress, setExpandAddAddress) = useState(false);
    useState(expandDeliverySpeed, setExpandDeliverySpeed) = useState(false);
    useState(deliverySpeed, setDeliverySpeed) = useState(false);

    let saved_addresses = [];
    for(let i=0; i < (addresses || []).length; i++) {
        saved_addresses.push(
        <option key={i} selected={i===0}>
            <div className="select-option-container">
                <span className="addr_line1">{addresses[i].line1}</span>
                <span className="addr_line2">{addresses[i].line2}</span>
                <span className="addr_city">{addresses[i].city}</span>
                <span className="addr_zipcode">{addresses[i].zipcode}</span>
            </div>
        </option>);
    }
    return (
        <div className="collapsible_form select_address">
            <div className={"collapsible_header"}>
                <div className="d-inline-block">
                    Address
                </div>
                {
                dirty && <div className={(expand ? "d-none" : "d-inline-block") + "edit-btn-container"}>
                    <ThemedButton 
                        text="Edit"
                        type="outline"
                        size="small"
                        _click={() => {editAddress();setExpand(true);} }
                        ></ThemedButton>
                    
                </div>
                }
            </div>
            <div className={(!expand ? "d-none " : "d-inline-block ") + "collapse-section p-4"}>
                <div className={"select-address-wrapper"}>
                    <select>
                        {
                            saved_addresses
                        }
                        <option key={saved_addresses.length} onSelect={() => {setExpandAddAddress(true)}}>
                            <div className={"add-address-wrapper"}>
                                <NewAddressForm
                                    addNewAddress={addNewAddress}
                                ></NewAddressForm>
                            </div>
                        </option>
                    </select>
                </div>

                {
                    !expandAddAddress && <div className="container-fluid d-flex justify-content-end submit-button-container">
                        <ThemedButton
                        text="Continue"
                        type="accent"
                        border="false"
                        _click={selectAddress}
                        ></ThemedButton>
                    </div>
                }
            </div>
        </div>
    )
}

function NewCardForm(props) {

}
function PaymentModule({expandModule, editPaymentOption, debit_cards, credit_cards}){
    useState(expand, setExpand) = useState(expandModule);
    useState(expandAddCard, setExpandAddCard) = useState(false);
    useState(dirty, setDirty) = useState(false);
    useState(expandAddCard, setExpandAddCard) = useState(false);

    let saved_debit_cards = [];
    for(let i=0; i < (debit_cards || []).length; i++) {
        saved_debit_cards.push(
        <option key={i} selected={i===0}>
            <div className="select-option-container">
            Pay with debit card {debit_cards[i].display_number}
            </div>
        </option>);
    }
    return (
        <div>
            <div className={"collapsible_header"}>
                <div className="d-inline-block">
                    Address
                </div>
                <div className={(expand ? "d-none" : "d-inline-block") + "edit-btn-container"}>
                    {
                        dirty && <ThemedButton 
                        text="Edit"
                        type="outline"
                        size="small"
                        _click={() => {editPaymentOption();setExpand(true);} }
                        ></ThemedButton>
                    }
                </div>
            </div>
            <div className={"collapse-section p-4"}>
                <div className={"select-address-wrapper"}>
                    <select>
                        {
                            saved_debit_cards
                        }
                        <option key={saved_debit_cards.length} onSelect={() => {setExpandAddAddress(true)}}>
                            <div className={"add-address-wrapper"}>
                                Cash on Delivery
                            </div>
                        </option>
                    </select>
                </div>
                    {
                    expandAddAddress && <div className="container-fluid d-flex justify-content-end submit-button-container">
                        <ThemedButton
                        type="accent"
                        border="false"
                        _click={selectAddress}
                        ></ThemedButton>
                    </div>
                    }
            </div>
        </div>
    )

}

function OrderSummary(props){

}

class CheckoutPage extends Page {
    constructor(props){
        super(props);
    }
    render(){
        return (
                <section className="checkout_container">
                    <div className="container-fluid">

                    </div>
                </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.loginReducer.loggedIn,
        user: state.loginReducer.user
    }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({getCart: CartService.getCart}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);