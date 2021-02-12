import Page from './Page';
import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CartService from './../../service/cartOperation';
import ThemedButton from '../components/generic/ThemedButton';
import AddressForm from '../components/forms/AddressForm';
import Accordion from '../components/generic/Accordion';
import LoginForm from './../components/forms/LoginForm';
import { transform } from 'lodash';
import { fetchAddresses } from '../../service/addressMethods';
import { addAddress } from './../../service/addressMethods';



function UserModule({onClickContinue}){
    return (<div className="user-module d-container-fluid d-flex flex-column flex-md-row">
        <div className="d-flex justify-content-center align-items-center flex-grow-1 pr-lg-5">
            <LoginForm/>
        </div>
        <div className="d-flex justify-content-center align-items-center p-2 flex-grow-1">
            <ThemedButton
                text="Continue as guest"
                _click={onClickContinue}
            />
        </div>
    </div>)
}
function AddressModule({
    saved_addresses = [], 
    addNewAddress, 
    selectAddress, 
    loggedIn
}){
    const [expandAddAddress, setExpandAddAddress] = useState(false);
    const [addressSelected, setAddressSelected] = useState(-1)
    const [addressList, setAddressList] = useState([])
    const [fetchAddressFlag, setFetchAddressFlag] = useState(false)
    const [dirty, setDirty] = useState(true);
    //const [deliverySpeed, setDeliverySpeed] = useState(false);

    //console.log('Addresses ->', addresses);
    //saved_addresses.push(<p>Example address</p>)
    useEffect(()=> {
        console.log("Calling useEffect: loggedIn", loggedIn);
        fetchAddresses().then( res => {
            console.log(res)
            let addresses = res.addresses;
            for(let i=0; i < (addresses || []).length; i++) {
                saved_addresses.push(
                    <div key={i} className={"select-address-item p-2 col-12 col-md-3" + (i === addressSelected ? " selected" : "")}>
                        <h6 className="text-center text-uppercase mb-1">{addresses[i].adtype}</h6>
                        <p className="addr_line1">{addresses[i].address}</p>
                        <p className="addr_line2">{addresses[i].locality}</p>
                        <p className="addr_city">{addresses[i].city}</p>
                        <p className="addr_city">{addresses[i].state}</p>
                        <p className="addr_zipcode">{addresses[i].zipcode}</p>
                    </div>);
            }
            console.log('Addresses ->', saved_addresses);
            setAddressList(saved_addresses)
        }).catch(err => {
    
        })
    }, [fetchAddressFlag, loggedIn])

    
    
    let addAddress = () => {
        setDirty(true)
        if(typeof addNewAddress === 'function'){
            addNewAddress();
            setFetchAddressFlag(!fetchAddressFlag);
            setAddressSelected(saved_addresses.length);
        }
        setExpandAddAddress(false)
    }
    console.log('Called AddressModule', saved_addresses)
    return (
        <div className="address-module">
            
            <div className="d-flex flex-column">
                <div className="select-address-wrapper d-flex flex-wrap">
                        {
                            addressList
                        }
                </div>
                <div className={"add-address-wrapper col-md-6 p-0"}>
                    {
                    expandAddAddress && <AddressForm
                        addNewAddress={addAddress}/>
                    }
                    <div className={"justify-content-start submit-button-container" + (expandAddAddress ? " d-none": " d-flex")}>
                        <ThemedButton
                        text="Add new address"
                        border="false"
                        _click={() => setExpandAddAddress(true)}
                        ></ThemedButton>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-end submit-button-container mt-5">
                <ThemedButton
                text="Continue"
                border="false"
                btnState={saved_addresses.length === 0 ? 'disabled' : 'active'}
                _click={selectAddress}
                ></ThemedButton>
            </div>
            
        </div>
    )
}

function NewCardForm(props) {

}
function PaymentModule({expandModule, editPaymentOption, debit_cards, selectPaymentOption, credit_cards}){
    const [expand, setExpand] = useState(expandModule);
    const [dirty, setDirty] = useState(false);
    const [expandAddCard, setExpandAddCard] = useState(false);

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
                        theme="outline"
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
                        <option key={saved_debit_cards.length} onSelect={() => {setExpandAddCard(true)}}>
                            <div className={"add-address-wrapper"}>
                                Cash on Delivery
                            </div>
                        </option>
                    </select>
                </div>
                    {
                    expandAddCard && <div className="container-fluid d-flex justify-content-end submit-button-container">
                        <ThemedButton
                        theme="accent"
                        border="false"
                        _click={selectPaymentOption}
                        ></ThemedButton>
                    </div>
                    }
            </div>
        </div>
    )

}

function OrderSummary(props){

}

function FlowIndicator({states, current, onClick}) {

}

//function MSlider({slides, })
function CheckoutSection({
    label,
    children,
    slideBy,
    onClick
}){
    //const [open, setOpen] = useState(expanded);
    let style = {
        minHeight: '500px',
        transform: `translate(${-1 * slideBy * 100}%)`
    }

    console.log(`${label} open -> ${slideBy}`)
    return (
        <div style={style} className={"checkout-section-container d-flex flex-column p-5"}>
            <h2 className="checkout-section-header mb-5 font-weight-lighter">{label}</h2>
            <div className={"checkout-section"}>
                {
                    children
                }
            </div>
        </div>
    )
}
class CheckoutPage extends Page {
    constructor(props){
        super(props);
        this.state = {
            activeSlide: (this.props.loggedIn ? 1 : 0),
            guest: false
        }
        
    }
    componentDidMount() {
        const {fetchCart} = this.props;
        fetchCart();
    }
    setActiveSlide(slide) {
        console.log('Setting expand -> ', slide);
        this.setState ({
            ...this.state,
            activeSlide: slide
        })
    }
    setGuest(bool) {
        this.setState ({
            ...this.state,
            guest: bool
        })
    }
    async getAddresses(){
        let addresses = await fetchAddresses()
        return addresses;
    }
    render(){
        let activeSlide = this.state.activeSlide,
        loggedIn = this.props.loggedIn,
        guest = this.state.guest,
        addresses = this.getAddresses();


        if(loggedIn && activeSlide === 0){
            //activeSlide -= 1;
            this.setActiveSlide(1)
            //this.setGuest(false)
        }

        console.log('Calling render', activeSlide);
        return (
            <div className="page">
                <section className="container checkout-flow-indicator-container">

                </section>
                <section className="container checkout-container">
                    <CheckoutSection
                        label=" "
                        slideBy={activeSlide}>
                        <UserModule
                            loggedIn={loggedIn}
                            onClickContinue={() => {
                                this.setGuest()
                                this.setActiveSlide(1)
                            }}/>
                    </CheckoutSection>

                    <CheckoutSection
                        label="Delivery address"
                        slideBy={activeSlide}>

                        <AddressModule
                            guest={guest}
                            loggedIn={loggedIn}
                            addresses={addresses}
                        />

                    </CheckoutSection>
                    <CheckoutSection
                        label="Payment options"
                        slideBy = {activeSlide}>

                        <div className="dummydiv"></div>

                    </CheckoutSection>
                    <CheckoutSection
                        label="Order Confirmed"
                        slideBy = {activeSlide}>

                        <div className="dummydiv"></div>

                    </CheckoutSection>
                    
                </section>
                <section className="cart_summary"></section>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.loginReducer.loggedIn,
        user: state.loginReducer.user,
        cart: state.cartReducer.cart,
        cart_error: state.cartReducer.error
    }
}
const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        fetchCart: CartService.fetchCart, 
        isCartEmpty: CartService.isEmpty()
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);