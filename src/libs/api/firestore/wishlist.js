import { db } from '../firebase.js';

/* 
Wishlist Schema
{
    user_id,
    items: [
        {
            id,
            date_added,
            title,
            thumbnail,
            brand,
            price,
            path
        }
    ]
} 
*/
const collection = db.collection('wishlists');

const WISHLIST_CREATED = 'Wishlist created successfully',
WISHLIST_CREATED_ERROR = 'Error while creating Wishlist';

export const getWishlistQuery = (email) => {
    return collection.where("user_id", "==", email).get();
}

export const updateWishlistQuery = (docId, update) => {
    return collection.doc(docId).update(update);
}

export const isItemInWishList = async (email, productId) => {

    try{
        let queries = await getWishlistQuery(email);
        let isPresent = false;
        queries.forEach( doc => {
            window.loginfo('WishList -> ', doc.id, doc.data());
            let data = doc.data();
            data = data || {};
            (data.items || []).forEach( item => {
                if(item.id === productId){
                    isPresent = true;
                }
            })
        });

        return new Promise(resolve => resolve(isPresent));
        
    }catch(error){
        window.logerror('isItemInWishList::error', error);
        return new Promise(resolve => resolve(false));
    }
    

}

export const getUserWishList = async (email) => {
    let res = [];
    try {
        if(email){
            let queries = await getWishlistQuery(email),
            items = [];
            if(queries.size > 0){
                queries.forEach( doc => {
                    window.loginfo('WishList -> ', doc.id, doc.data());
                    let data = doc.data();
                    data = data || {};
                    items = items.concat((data.items || []));
                });
                res = new Promise(resolve => resolve(items));
            }
        }else {
            throw new Error('Invalid or insufficient arguments: Email nor present');
        }
    }catch(err){
        res = new Promise((resolve, reject) => reject(err));
    }
    return res;
}
export const createWishList = async (email, products=[]) => {
    let res = null;
    try {
        if(email){
            let queries = await getWishlistQuery(email);
            if(queries.size <= 0){
                let wlist = {}, items = [];
                wlist.user_id = email;

                /* Push items to newly created wishlist */
                products.forEach(product => {
                    if(product.id){
                        items.push({
                            id: product.id, 
                            thumbnail: product.thumbnail,
                            title: product.title,
                            link: product.link,
                            price: product.price,
                            currency: product.currency,
                            path: product.path,
                            date_added: (new Date()).getTime()
                        });
                    }
                })
                wlist.items = items;

                /* Update firestore */
                let docRef = await collection.add(wlist),
                doc = await collection.doc(docRef.id).get();
                doc = doc || {};

                window.loginfo('createWishList::success::', docRef.id, doc.data());
                return new Promise(resolve => resolve(doc.data()));
            }else {
                throw new Error('Wishlist is already present for the user');
            }
        }else {
            throw new Error('Invalid or insufficient arguments: Email or product nor present');
        }
    }catch(error){
        return new Promise((resolve, reject) => reject(error));
    }
}

export const addToWishList = async (email, product) => {
    let res = null;
    window.loginfo('addToWishList called', product); 

    
        try{
            if(email){
                let queries = await getWishlistQuery(email);
                if(queries.size <= 0){
                    let data = await createWishList(email, [].push(product));
                    
                    window.loginfo('addToWishList::Creating new Wishlist', data);
                    return new Promise(resolve => resolve({
                        type: 'success',
                        msg: 'Item added to your wishlist!'
                    }))
                }else {
                    window.loginfo('queries', queries.docs[0].id);
                    let doc = queries.docs[0],
                    docId = doc.id;
                    window.loginfo(doc.id, " => ", doc.data());
                    let products = doc.data().items || [], isPresent = false;
                    
                    /* Check if product is present */
                    for (let i = 0; i < products.length; i++) {
                        if(products[i].id === product.id){
                            isPresent = true;
                            break;
                        }
                    }
                    if(isPresent){
                        throw new Error('Product is already present in your Wislist');
                    }else {/* If not add it and update */
                        products.push({
                            id: product.id, 
                            thumbnail: product.thumbnail,
                            title: product.title,
                            link: product.link,
                            price: product.price,
                            path: product.path,
                            currency: product.currency,
                            date_added: (new Date()).getTime()
                        });
                        //let updateQuery = await updateWishlistQuery(doc.id, {'items': products});
                        
                        let docRef = await updateWishlistQuery(doc.id, {'items': products});
                        /* doc = await collection.doc(docId).get();
                        doc = doc || {}; */
                        //window.loginfo('addToWishList', docId, doc.data());
                        return new Promise(resolve => resolve({
                            type: 'success',
                            msg: 'Item added to your wishlist!'
                        }))
                    }
                }
            }else {
                throw new Error('Invalid or insufficient arguments: Email or product nor present');
            }
        }
        catch(error){
            window.logerror('addToWishList::error::', error);
            return new Promise((resolve, reject) => reject(error));
        }
        return res; 
    
}

export const removeFromWishList = async (email, productId) => {
    let res = null;
    
    try{
        if(email && productId){
            let queries = await getWishlistQuery(email);
            if(queries.size <= 0){
                throw new Error('Product is not present in Wishlist');
            }else {
                let doc = queries.docs[0],
                docId = doc.id;
                window.loginfo(doc.id, " => ", doc.data());
                let products = doc.data().items || [], isPresent = false, index = -1;
                
                /* Check if product is present */
                for (let i = 0; i < products.length; i++) {
                    if(products[i].id === productId){
                        isPresent = true;
                        index = i;
                        break;
                    }
                }
                if(isPresent && index > -1){
                    products.splice(index, 1);                        
                    let docRef = await updateWishlistQuery(doc.id, {'items': products});
                    /* doc = await collection.doc(docId).get();
                    doc = doc || {}; */
                    //window.loginfo('removeFromWishList', docId, doc.data());
                    return new Promise(resolve => resolve({
                        type: 'success',
                        msg: 'Item removed from your Wishlist!'
                    }))
                }else {/* If not add it and update */
                    throw new Error('Product is not present in Wishlist')
                }
            }
        }else {
            throw new Error('Invalid or insufficient arguments: Email or product nor present');
        }
    }
    catch(error){
        window.logerror('removeFromWishList::error::', error);
        return new Promise((resolve, reject) => reject(error));
    }

    return res; 
    
}
