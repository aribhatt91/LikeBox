import React, {useState, useEffect, useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import AppButton from './generic/AppButton';
import AppImage from './generic/AppImage';
import { useHistory } from 'react-router';
import { AuthContext } from './../../store/contexts/AuthContext';
import { debounce } from 'lodash';
import { fetchLikeBox, updateLikeBox } from '../../service/userProfile';
import Page from './../pages/Page';
import { fetchLikeCards } from './../../service/api/firestore/likebox';
import { SuccessMessage } from './generic/PageMessage';
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
let currentPos = -1, LIKED = [], DISLIKED = [], PAGE = 0, LIMIT = 5, gender = "", LAST_NODE=null, CARDS = null;
export default function LikeBoxCarousel({slideIn, slideOut}) {
    //const [loading, setLoading] = useState(true);
    const [reachedMax, setReachedMax] = useState(false);
    const [cardsState, setCardsState] = useState({loading: true});
    const [items, setItems] = useState([]);
    const [update, setUpdate] = useState(true);
    const history = useHistory();
    const {currentUser} = useContext(AuthContext);

    const getCardsByPage = async (exclude=[]) => {
        let res = [];
        try {
            if(!CARDS) {
                CARDS = await fetchLikeCards();
                CARDS = CARDS || [];
                CARDS = CARDS.filter(item => exclude.indexOf(item) === -1);
            }
            if(CARDS && Array.isArray(CARDS)) {
                res = CARDS.slice((PAGE * LIMIT), ((PAGE * LIMIT) + LIMIT));
                PAGE++;
            }
        }catch(err){

        }
        return res;
    }
    useEffect(()=>{
        //Find gender and other preferences
        if(currentUser){
            (async () => {
                let res = await fetchLikeBox(currentUser.email);
                if(res){
                    LIKED = res.LIKED || [];
                    DISLIKED = res.DISLIKED || [];
                    LAST_NODE = res.lastVisible || null;
                }
            })()
        }
    }, [currentUser])

    useEffect(()=>{
        console.log('useEffectCalled');
        if(update && currentUser && !reachedMax){
            setCardsState({
                ...cardsState,
                loading: true
            });
            try{
                (async() => {
                    /* Fetch next batch of cards */
                    //console.log('LikeBoxCarousel:useEffect: updating', PAGE, LAST_NODE);
                    //let products = await fetchProductsByPage(PAGE, LIMIT);
                    
                    let skus = [].concat(LIKED).concat(DISLIKED);
                    console.log('SKUS', skus);
                    
                    /* let res = await fetchProductsBySkus([], PAGE, LIMIT, LAST_NODE, true);
                    let products = res ? res.items || [] : []; */
                    let products = await getCardsByPage(skus);
                    //LAST_NODE = res ? res.lastVisible : null;
                    //console.log('useEffectCalled: response', res);
                    if(products.length < LIMIT){
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
        DISLIKED.push(items[currentPos].sku);
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
        console.log(currentPos, items[currentPos]);
        LIKED.push(items[currentPos].sku);
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
        document.body.addEventListener('keyup', debounce(handleKeyPress, 300))
    }, [])

    const submit = async () => {
        if(currentUser){
            try {
                let likebox = {LIKED, DISLIKED, 'lastVisible': LAST_NODE.id};
                console.log('LikeBoxCarousel:submit', likebox);
                await updateLikeBox(currentUser.email, {likebox});
                
            }catch(err){
                console.error('LikeBoxCarousel:submit:error', err);
            }finally {
                setTimeout(()=>{
                    history.push('/');
                }, 500)
            }
        }
        
    }
    
    return (
        <Page>
            {!reachedMax && <div className="like-box container">
            <div className={"like-box-preference-carousel container slide-in"}>
                <h3 className="text-center mt-5">Go with your heart!</h3>
                <h4 className="text-center color">(We recommend swiping at least 15 items)</h4>
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                
                    <div className="d-inline-flex flex-column align-center">
                        <div className="btn-label btn-dislike">Dislike</div>
                        <div className="like-box-btn like-box-left-btn" onClick={debounce(rejectItem, 100)}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </div>
                    </div>
                    <CardStack
                        cards={items}
                        cardsState={cardsState}
                    />
                    <div className="d-inline-flex flex-column align-center">
                        <div className="btn-label btn-like">Like</div>
                        <div className="like-box-btn like-box-right-btn" onClick={debounce(likeItem, 100)}>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                    </div>
                </div>
                <AppButton label="Start shopping" className="d-block ml-auto mr-auto pr-5 pl-5 mb-5" onClick={submit} />
            </div>
            </div>}
            {
                reachedMax && <div className="container mt-5 p-4">
                    <SuccessMessage message="Awesome! You are good to go.." />
                    <AppButton label="Start shopping" className="d-block ml-auto mr-auto pr-5 pl-5 mb-5 mt-5" onClick={submit} />
                </div>
            }
            
        </Page>
    )
}
