import React, { useState, useEffect, useContext } from 'react';
import LoadingModule from '../../../components/LoadingModule';
import { fetchPastOrders } from '../../../../service/OrdersService';
import { AuthContext } from '../../../../store/contexts/AuthContext';

const ORDER_STATUS = {
    "1": "Order placed",
    "2": "Order shipped",
    "3": "In transit",
    "4": "Order complete",
    "-1": "Order failed",
    "-2": "Payment failed"
}

function ProductInstance({instance, order_placed}) {
    const [showDetails, setShowDetails] = useState(false);
    let status_code = instance.transaction.status, status_color = "green";
    if(status_code.indexOf("-") > -1) {
        status_color = "red";
    }

    
    return (
        <div className="order-instance-product position-relative d-flex flex-column">
            <div className="order-summary-container d-flex pt-3">
                <a href={"/product/" + instance.id} className="order-instance-thumb">
                    <img src={instance.thumbnail + "&h=100&w=100"}/>
                </a>
                <div className="order-instance-text pl-3 pr-3">
                    <div className="order-instance-name">
                        {instance.title || instance.name}
                    </div>
                    <div className="order-instance-price">
                        &#x20B9;{instance.price}
                    </div>
                    <div className="order-instance-size-qty mt-1">
                        {instance.size && <span>Size: {instance.size}</span>}
                        <span className="ml-3">Qty: {instance.quantity}</span>
                    </div>
                </div>
                {/* <div className="order-instance-status d-flex flex-column justify-content-center">
                    <div className={"order-instance-status-text " + status_color}>
                        {ORDER_STATUS[(instance.transaction.status + "")]}
                    </div>
                    <div className="order-instance-status-date">
                        {
                            instance.transaction.status === "4" ? "Delivered on " + instance.transaction.order_received : "Expected delivery: " +instance.transaction.expected_date
                        }
                    </div>
                </div> */}
            </div>
            <div className={"order-details-container pt-3 pb-3" && (showDetails ? " d-flex" : " d-none")}>
                
            </div>
            <span className={"expand-btn" + (showDetails ? " open": "")} onClick={() => {setShowDetails(!showDetails)}}></span>
        </div>
    )
}
function OrdersListItem({instance}){
    let products = [];
    /* (instance.products || []).forEach((item, index) => {
        products.push(
            <ProductInstance
                instance={item}
                order_placed={instance.order_date}
                key={index}
            />
        )
    }) */

    return (
        <div className="order-container mb-2">
            <div className="order-id pr-3 pl-3 pt-2 pb-1">
                <h3><span className="order-id-label">Order id: </span><span className="order-id-text">#{instance.order_id}</span></h3>
                <h4 className="ml-3">Order placed: {instance.order_date}</h4>
            </div>
            <div className="order-instances pt-2 pb-2 pr-3 pl-3">
                
            </div>
                
        </div>
    )
}
function OrdersList(){
    //let orders = ORDERS.orders || [],
    const [orders, setOrders] = useState([]);
    const [pending, setPending] = useState(false);
    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        if(currentUser){
            setPending(true);
            (async () => {
                try {
                    const result = await fetchPastOrders(currentUser.email);
                    setOrders(result);
                }catch(error){
                    console.log('OrdersList:fetchPastOrders::error', error);
                }finally {
                    setPending(false);
                }
            })
        }
    }, [])

    return (
        <div className={"orders-list-section editable-section"}>
            <h1 className="editable-section-header mb-5">Orders</h1>

            
            <div className="orders-list-container">
                {
                    !pending && orders.length > 0 && <div className="col-12">
                        {
                            orders.map((order, index) => <OrdersListItem instance={order} key={index} />)
                        }
                    </div>
                }
                {
                    pending && <div className="col-12">
                        <LoadingModule
                            type="block"
                            text="Please wait while we fetch your orders"
                        />
                    </div>
                }
            </div>
        </div>
    )
}

export default OrdersList;