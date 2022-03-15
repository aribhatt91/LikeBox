import React, {useState, useEffect, useContext} from 'react';
import AppButton from '../../components/_generic/AppButton';
import AppImage from '../../components/_generic/AppImage';
import { useHistory } from 'react-router';
import { AuthContext } from '../../../libs/store/contexts/AuthContext';
import { debounce } from 'lodash';
import { fetchLikeBox, updateLikeBox } from '../../../libs/UserService';
import Page from '../Page';
import { fetchLikeCards } from '../../../libs/api/firestore/likebox';
import { SuccessMessage } from '../../components/_generic/AppMessage';
import LeftArrowIcon from '../../components/_svg-components/LeftArrowIcon';
import RightArrowIcon from '../../components/_svg-components/RightArrowIcon';
import './style.page.css';

function CardStack({cards, cardsState}) {
    useEffect(() => {}, [cards])
    return (
        <div className="card-stack">
            {
                (cards || []).map((card, index) => {
                    let state = cardsState[index];
                    state = state ? " " + state : "";
                    return (
                            <div key={card.productid} className={"card-stack-item" + state}>
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
                cardsState.loading && <div className={"card-stack-item card-item-placeholder placeholder"}>
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
export default function YourStyleCards({slideIn, slideOut}) {
    //const [loading, setLoading] = useState(true);
    const [reachedMax, setReachedMax] = useState(false);
    const [cardsState, setCardsState] = useState({loading: true});
    const [submitting, setSubmitting] = useState(false);
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
        window.loginfo('useEffectCalled');
        if(update && currentUser && !reachedMax){
            setCardsState({
                ...cardsState,
                loading: true
            });
            try{
                (async() => {
                    /* Fetch next batch of cards */
                    
                    let skus = [].concat(LIKED.map(item => item.productid)).concat(DISLIKED.map(item => item.productid));
                    
                    window.loginfo('SKUS', skus, LIKED, DISLIKED);
                    
                    let products = await getCardsByPage(skus);

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

    const checkExists = (array, item) => {
        for (let i = 0; i < array.length; i++) {
            if(item.productid === array[i].productid){
                return true;
            }
        }
        return false;
    };

    const removeFromArray = (array, item) => {
        var index = -1;
        for (let i = 0; i < array.length; i++) {
            if(item.productid === array[i].productid){
                index = i;
                break;
            }
        }
        if(index > -1){
            array.splice(index,1);
        }   
    }
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
        window.loginfo(currentPos);
        if(!checkExists(DISLIKED, items[currentPos])){
            DISLIKED.push(items[currentPos]);
            removeFromArray(DISLIKED, items[currentPos]);
        }
        
    }
    const likeItem = () => {
        window.loginfo('likeItem')
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
        window.loginfo(currentPos, items[currentPos]);        
        if(!checkExists(LIKED, items[currentPos])){
            LIKED.push(items[currentPos]);
            removeFromArray(DISLIKED, items[currentPos]);
        }
    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 39){
            likeItem();
        }else if(e.keyCode === 37){
            rejectItem();
        }

        window.loginfo('keypressed', e.keyCode)
    }

    useEffect(()=>{
        let debounced_keypress = debounce(handleKeyPress, 300);
        document.body.addEventListener('keyup', debounced_keypress);
        return document.body.removeEventListener('keyup', debounced_keypress);

    }, [])

    const submit = async () => {
        if(currentUser && !submitting){
            try {
                setSubmitting(true);
                let likebox = {LIKED, DISLIKED, 'lastVisible': ""};
                window.loginfo('LikeBoxCarousel:submit', likebox);
                await updateLikeBox(currentUser.email, {likebox});
                
            }catch(err){
                window.logerror('LikeBoxCarousel:submit:error', err);
                setSubmitting(false)
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
                <AppButton loading={submitting} label="Start shopping" className="d-block ml-auto mr-auto pr-5 pl-5 mb-5" onClick={submit} />
            </div>
            </div>}
            {
                reachedMax && <div className="container mt-5 p-4">
                    <SuccessMessage message="Awesome! You are good to go.." />
                    <AppButton loading={submitting} label="Start shopping" className="d-block ml-auto mr-auto pr-5 pl-5 mb-5 mt-5" onClick={submit} />
                </div>
            }
            
        </Page>
    )
}
