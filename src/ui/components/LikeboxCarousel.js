import React, {useState, useEffect, useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import AppButton from './generic/AppButton';
import AppImage from './generic/AppImage';
import { fetchProductsByPage } from '../../service/api/firestore/product';
import { useHistory } from 'react-router';
import { AuthContext } from './../../store/contexts/AuthContext';
import { debounce } from 'lodash';
function CardStack({cards, cardsState, loading}) {
    useEffect(() => {}, [cards])
    return (
        <div className="card-stack">
            {
                (cards || []).map((card, index) => {
                    let state = cardsState[index];
                    state = state ? " " + state : "";
                    return (
                            <div key={index} className={"card-stack-item" + state}>
                                <div className="card-container d-inline-flex flex-column">
                                    <div className="card-thumb">
                                        <AppImage src={card.thumbnail} alt={card.name} />
                                    </div>
                                    <div className="card-title">
                                        {card.brand}
                                    </div>
                                </div>
                            </div>
                    )
                    
                })
                
            }
            {
                cardsState.loading && <div className={"card-stack-item card-item-placeholder"}>
                    <div className="card-container d-inline-flex flex-column">
                        <div className="card-thumb">
                        </div>
                        <div className="card-title-placeholder">
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
let currentPos = -1, SEEN = [], PAGE = 0, LIMIT = 6, gender = "";
export default function LikeBoxCarousel({slideIn, slideOut}) {
    //const [loading, setLoading] = useState(true);
    const [reachedMax, setReachedMax] = useState(false);
    const [cardsState, setCardsState] = useState({loading: true});
    const [items, setItems] = useState([]);
    const [update, setUpdate] = useState(true);
    const history = useHistory();
    const {currentUser} = useContext(AuthContext);

    useEffect(()=>{
        //Find gender and other preferences
    }, [currentUser])

    useEffect(()=>{
        console.log('useEffectCalled');
        if(update && !reachedMax){
            setCardsState({
                ...cardsState,
                loading: true
            });
            try{
                (async() => {
                    /* Fetch next batch of cards */
                    console.log('useEffectCalled: updating');
                    let products = await fetchProductsByPage(PAGE, LIMIT);
                    if(products.length === 0){
                        setReachedMax(true);
                    }
                    currentPos = products.length;
                    PAGE++;
                    setUpdate(false);
                    setItems(products);
                    setCardsState({loading: false});
                })()
            }catch(err){
                setUpdate(false);
                setReachedMax(true);
            }finally{
                setCardsState({loading: false});
            }
        }
    }, [update])
    const rejectItem = () => {
        if(cardsState.loading || reachedMax){
            return;
        }
        let st = currentPos;
        if(st === -1){
            st = items.length - 1;
        }else {
            --st; 
        }
        if(st === -1){
            //setDisable(true);
            return;
        }
        //setStackTop(st);
        currentPos = st;
        let arr = Object.assign({}, cardsState);
        arr[st] = "rejected";
        setCardsState(arr);
        if(currentPos === 0){
            setUpdate(true);
        }
        console.log(currentPos);
    }
    const likeItem = () => {
        console.log('likeItem')
        if(cardsState.loading || reachedMax){
            return;
        }
        
        let st = currentPos;
        if(st === -1){
            return;
            //st = items.length - 1;
        }else {
            --st; 
        }
        if(st === -1){
            //setDisable(true);
            return;
        }
        //setStackTop(st);
        currentPos = st;
        let arr = Object.assign({}, cardsState);
        arr[st] = "liked";
        setCardsState(arr);
        if(currentPos === 0){
            setUpdate(true);
        }
        console.log(currentPos);
    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 39){
            likeItem();
        }else if(e.keyCode === 37){
            rejectItem();
        }

        console.log('keypressed', e.keyCode)
    }

    useEffect(()=>{
        document.body.addEventListener('keyup', debounce(handleKeyPress, 1000))
    }, [])
    
    return (
        <React.Fragment>
            {!reachedMax && <div className="like-box"><div className={"like-box-preference-carousel slide-in"}>
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <div className="like-box-btn like-box-left-btn" onClick={debounce(rejectItem, 1000)}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                    <CardStack
                        cards={items}
                        cardsState={cardsState}
                    />
                    <div className="like-box-btn like-box-right-btn" onClick={debounce(likeItem, 1000)}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                </div>
                <AppButton label="Start shopping" className="w-100 mb-5" onClick={() => {history.push('/')}} />
            </div>
            </div>}
            {
                reachedMax && <div className=""></div>
            }
            
        </React.Fragment>
    )
}
