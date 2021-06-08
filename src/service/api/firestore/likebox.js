import { db, fieldPath } from './../firebase';

const collection = db.collection('likecards');

export const fetchLikeCards = async () => {
    let res = [];
    try {
        let querySnapshot = await collection.get(),
        docs = querySnapshot.docs,
        items = docs.map(doc => doc.data());
        /* Fetch liked and disliked cards */
        console.log('fetchSwipeCards:response', items);
        return new Promise(resolve => resolve(items));
    }catch(err){
        console.error('fetchSwipeCards:error', err);
        return new Promise((resolve, reject) => reject(err));
    }
}