import React, {useState, useEffect} from 'react';
import ORDERS from '../../../mock/orders.json';

const ORDER_STATUS = {
    "1": "Order placed",
    "2": "Order shipped",
    "3": "In transit",
    "4": "Order complete",
    "-1": "Order failed",
    "-2": "Payment failed"
}
function getOrderTimeLine(transaction, order_placed, status){

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
                <a href={"/product/" + instance.sku} className="order-instance-thumb">
                    <img src={instance.thumbnail}/>
                </a>
                <div className="order-instance-text pl-3 pr-3">
                    <div className="order-instance-name">
                        {instance.name}
                    </div>
                    <div className="order-instance-brand">
                        {instance.brand}
                    </div>
                    <div className="order-instance-price">
                        &#x20B9;{instance.price}
                    </div>
                    <div className="order-instance-size-qty mt-1">
                        <span>Size: {instance.size}</span>
                        <span className="ml-3">Qty: {instance.qty}</span>
                    </div>
                </div>
                <div className="order-instance-status d-flex flex-column justify-content-center">
                    <div className={"order-instance-status-text " + status_color}>
                        {ORDER_STATUS[(instance.transaction.status + "")]}
                    </div>
                    <div className="order-instance-status-date">
                        {
                            instance.transaction.status === "4" ? "Delivered on " + instance.transaction.order_received : "Expected delivery: " +instance.transaction.expected_date
                        }
                    </div>
                </div>
            </div>
            <div className={"order-details-container pt-3 pb-3" && (showDetails ? " d-flex" : " d-none")}>
                
            </div>
            <span className={"expand-btn" + (showDetails ? " open": "")} onClick={() => {setShowDetails(!showDetails)}}></span>
        </div>
    )
}
function OrderInstance({instance}){
    let products = [];
    (instance.products || []).forEach((item, index) => {
        products.push(
            <ProductInstance
                instance={item}
                order_placed={instance.order_date}
            />
        )
    })

    return (
        <div className="order-container mb-2">
            <div className="order-id pr-3 pl-3 pt-2 pb-1">
                <span><span className="order-id-label">Order id: </span><span className="order-id-text">#{instance.id}</span> </span>
                <span className="ml-3">Order placed: {instance.order_date}</span>
            </div>
            <div className="order-instances pt-2 pb-2 pr-3 pl-3">
                {
                    products
                }
            </div>
                
        </div>
    )
}
function UserOrdersFragment(){
    let orders = ORDERS.orders || [],
    ordersItems = [];

    useEffect(() => {
        
    }, [])

    orders.forEach((item, index) => {
        ordersItems.push(
            <OrderInstance
                instance={item}
            />
        )
    });
    return (
        <div className={"orders-list-section editable-section"}>
            <h1 className="editable-section-header mb-5">My orders</h1>
            <div className="orders-list-container">
                {
                    ordersItems
                }
            </div>
        </div>
    )
}

export default UserOrdersFragment;