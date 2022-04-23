import React, {useState, useEffect} from 'react'
import ErrorModule from '../../../../components/ErrorModule';
import AppButton from '../../../../components/_generic/AppButton';
import Page from '../../../Page'
import OrderInstance, { OrderInstancePlaceholder } from './components/OrderInstance';

const ITEMS_PER_PAGE = 10,
EMPTY_TITLE = "",
EMPTY_TEXT = "You haven't placed any orders with us";

export default function Orders() {
    const [page, setPage] = useState(1);
    const [endReached, setEndReached] = useState(false);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            if(!loading){
                setLoading(true);
            }
            const results = [];

            if(results.length > 0){
                setOrders([].concat(orders).concat(results));
            }
            /* If orders fetched in current page is less than requested, its the last batch */
            if(results.length < ITEMS_PER_PAGE){
                setEndReached(true);
            }
        }catch(error){

        }finally {
            setLoading(false);
        }
    }

    const next = () => {
        if(!endReached){
            setPage(page + 1);
        }
    }

    useEffect(()=>{
        fetchOrders();
    }, [page])

    return (
        <div className='w-100'>
            <div className='mt-5 mb-5'>
                <h2 className='mb-5 text-center text-bold'>Orders</h2>
                {
                    !loading && orders.length <= 0 && <ErrorModule error={EMPTY_TEXT} />
                }
                {
                    orders && orders.length > 0 && <div className='row d-flex flex-column mt-5'>
                        {
                            orders.map((order)=><OrderInstance key={order.id} order={order}/>)
                        }
                    </div>
                }
                {
                    loading && <React.Fragment>
                        <OrderInstancePlaceholder />
                        <OrderInstancePlaceholder />
                        <OrderInstancePlaceholder />
                    </React.Fragment>
                }
                {
                    !loading && orders.length > 0 && !endReached && <div className='row d-flex mt-5 justify-content-center'>
                        <AppButton onClick={next} className="col-12 col-lg-8" label="Load more" />
                    </div>
                }
            </div>
        </div>
    )
}
