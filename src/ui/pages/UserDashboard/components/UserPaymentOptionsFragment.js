import React, { useState } from 'react';
import CardForm from '../../../components/forms/CardForm';
import Accordion from '../../../components/generic/Accordion';

function formatCardNumber(cardNumber) {

    return cardNumber;
}
function SavedCard({instance, deleteCard, editCard}){
    const [editMode, setEditMode] = useState(false);
    return (
        <div className="card-instance-container mb-3">
            <div className={"card-instance-display p-3" + (editMode ? " d-none": "")}>
                <div className="card-instance-name font-weight-bold mb-1"><span className="pr-3">{instance.calias || ""}</span></div>
                <div className="card-instance-number"><span>{formatCardNumber(instance.cnumber)}</span></div>
                <span className="card-instance-edit-btn" onClick={() => setEditMode(true)}>Edit</span>
            </div>
            
        </div>
    )
}
function UserPaymentOptionsFragment({saved_cards, deleteCard, editCard}){
    let saved_payments = [],
    cards = []; //TODO - Create Payment methods

    if(cards && cards.length > 0){
        cards.forEach((item, index) => {
            saved_payments.push(
                <SavedCard
                    instance={item}
                    deleteCard={deleteCard}
                    editCard={editCard}
                />
            )
        })   
    }
    return (
        <div className={"saved-cards-section editable-section"}>
            <h1 className="editable-section-header mb-4">Payment options</h1>
            <div className="add-card-container mb-4">
                <Accordion
                    label="Add new card"
                    openBtn="true"
                    // hideHeaderOnOpen={true}
                    children={
                        <CardForm
                            hideHeader={true}
                        />
                    }
                />
            </div>
            {saved_payments.length > 0 && <div className="saved-cards-container">
                {
                    saved_payments
                }
            </div>}

        </div>
    )
}

export default UserPaymentOptionsFragment;