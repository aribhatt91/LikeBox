import React, {useState, useEffect, useContext} from 'react';
import AppButton from '../components/generic/AppButton';
import AppImage from '../components/generic/AppImage';
import { useHistory } from 'react-router';
import { AuthContext } from '../../store/contexts/AuthContext';
import { debounce } from 'lodash';
import { fetchLikeBox, updateLikeBox } from '../../service/userProfile';
import Page from './Page';
import { fetchLikeCards } from '../../service/api/firestore/likebox';
import { SuccessMessage } from '../components/generic/PageMessage';
import LeftArrowIcon from '../components/svg-components/LeftArrowIcon';
import RightArrowIcon from '../components/svg-components/RightArrowIcon';
import YourStylePage from './YourStylePage';
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
export default function YourStyleCardsPage({slideIn, slideOut}) {
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
        window.mlog('useEffectCalled');
        if(update && currentUser && !reachedMax){
            setCardsState({
                ...cardsState,
                loading: true
            });
            try{
                (async() => {
                    /* Fetch next batch of cards */
                    //window.mlog('LikeBoxCarousel:useEffect: updating', PAGE, LAST_NODE);
                    //let products = await fetchProductsByPage(PAGE, LIMIT);
                    
                    let skus = [].concat(LIKED.map(item => item.sku)).concat(DISLIKED.map(item => item.sku));
                    window.mlog('SKUS', skus);
                    
                    /* let res = await fetchProductsBySkus([], PAGE, LIMIT, LAST_NODE, true);
                    let products = res ? res.items || [] : []; */
                    let products = await getCardsByPage(skus);
                    //LAST_NODE = res ? res.lastVisible : null;
                    //window.mlog('useEffectCalled: response', res);
                    if(products.length < LIMIT){
                        setReachedMax(true);
                        window.scrollTo({top: 0, left: 0});
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
                window.scrollTo({top: 0, left: 0});
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
            setTimeout(() => {
                setUpdate(true);
            }, 500);
            
        }
        window.mlog(currentPos);
        DISLIKED.push(items[currentPos]);
    }
    const likeItem = () => {
        window.mlog('likeItem')
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
            setTimeout(() => {
                setUpdate(true);
            }, 500);
            
        }
        window.mlog(currentPos, items[currentPos]);
        LIKED.push(items[currentPos]);
    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 39){
            likeItem();
        }else if(e.keyCode === 37){
            rejectItem();
        }

        window.mlog('keypressed', e.keyCode)
    }

    useEffect(()=>{
        document.body.addEventListener('keyup', debounce(handleKeyPress, 300))
    }, [])

    const submit = async () => {
        if(currentUser){
            try {
                let likebox = {LIKED, DISLIKED, 'lastVisible': LAST_NODE.id};
                window.mlog('LikeBoxCarousel:submit', likebox);
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
        <Page pageName="Your style">
            {!reachedMax && <div className="like-box container">
            <div className={"like-box-preference-carousel container slide-in"}>
                <h1 className="text-center mt-5">Go with your heart!</h1>
                <h4 className="text-center color">(We recommend swiping at least 15 items)</h4>
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                
                    <div className="d-inline-flex flex-column align-center">
                        <div className="btn-label btn-dislike">Dislike</div>
                        <div className="like-box-btn like-box-left-btn" onClick={debounce(rejectItem, 100)}>
                            <LeftArrowIcon size={64} />
                        </div>
                    </div>
                    <CardStack
                        cards={items}
                        cardsState={cardsState}
                    />
                    <div className="d-inline-flex flex-column align-center">
                        <div className="btn-label btn-like">Like</div>
                        <div className="like-box-btn like-box-right-btn" onClick={debounce(likeItem, 100)}>
                            <RightArrowIcon size={64} />
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
