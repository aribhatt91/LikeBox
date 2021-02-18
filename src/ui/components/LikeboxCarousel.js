import Carousel from 'react-bootstrap/Carousel';
import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import AppButton from './generic/AppButton';
function CardStack({cards, cardsState}) {
    return (
        <div className="card-stack">
            {
                (cards || []).map((card, index) => {
                    let state = cardsState[index];
                    state = state ? " " + state : "";
                    return (
                        <div index={index} className={"card-stack-item" + state}>
                            {card}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default function LikeboxCarousel({items}) {
    const [stackTop, setStackTop] = useState(-1);
    const [disable, setDisable] = useState(false);
    const [cardsState, setCardsState] = useState({});
    const rejectItem = () => {
        let st = stackTop;
        if(st === -1){
            st = items.length - 1;
        }else {
            --st; 
        }
        if(st === -1){
            setDisable(true);
            return;
        }
        setStackTop(st);
        let arr = Object.assign({}, cardsState);
        arr[st] = "rejected";
        setCardsState(arr);
    }
    const likeItem = () => {
        let st = stackTop;
        if(st === -1){
            st = items.length - 1;
        }else {
            --st; 
        }
        if(st === -1){
            setDisable(true);
            return;
        }
        setStackTop(st);
        let arr = Object.assign({}, cardsState);
        arr[st] = "liked";
        setCardsState(arr);
    }
    return (
        <React.Fragment>
            <div className="like-box-preference-carousel d-flex align-items-center justify-content-between">
                <div className="like-box-btn like-box-left-btn" onClick={rejectItem}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                <CardStack
                    cards={items}
                    stackTop={stackTop}
                    cardsState={cardsState}
                />
                <div className="like-box-btn like-box-right-btn" onClick={likeItem}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>
            </div>
            <AppButton label="Start shopping" className="w-100 mb-5" />
        </React.Fragment>
    )
}
