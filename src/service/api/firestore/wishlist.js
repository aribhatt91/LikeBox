import { db } from '../firebase.js';

/* 
Wishlist Schema
{
    id,
    name,
    user_id,
    items: [
        {
            id,
            date_added
        }
    ]
} 
*/
const collection = db.collection('wishlists');

export const getWishlistQuery = (email) => {
    return collection.where("user_id", "==", email).get();
}

export const updateWishlistQuery = (docId, update) => {
    return collection.doc(docId).update(update);
}

export const isItemInWishList = async (email, sku) => {
    try{
        let queries = await getWishlistQuery(email);
        if(queries.size > 0){
            let isPresent = false;


            queries.forEach( doc => {
                console.log('WishList -> ', doc.id, doc.data());
                let data = doc.data();
                data = data || {};
                (data.items || []).forEach( item => {
                    if(item.sku === sku){
                        isPresent = true;
                    }
                })
            });

            return new Promise(resolve => resolve(isPresent));

        }
    }catch(err){
        console.error(err);
    }
    return new Promise(resolve => resolve(false));

}

export const getUserWishList = async (email) => {
    let res = null;
    try {
        if(email){
            let queries = await getWishlistQuery(email),
            items = [];
            if(queries.size > 0){
                queries.forEach( doc => {
                    console.log('WishList -> ', doc.id, doc.data());
                    let data = doc.data();
                    data = data || {};
                    items = items.concat((data.items || []));
                });
                res = new Promise(resolve => resolve({type: 'success', items}));
            }
        }else {
            throw new Error('No email parameter found');
        }
    }catch(err){
        res = new Promise((resolve, reject) => reject(err));
    }
    return res;
}
export const createWishList = async (email, name="My Wishlist", products=[]) => {
    let res = null;
        try {
            if(email){
                let queries = await getWishlistQuery(email);
                if(queries.size <= 0){
                    let wlist = {}, items = [];
                    wlist.user_id = email;
                    products.forEach(sku => {
                        let item = {};
                        item.sku = sku;
                        item.date_added = (new Date()).getTime();
                        items.push(item);
                    })
                    wlist.items = items;
                    try {
                        let docRef = await collection.add(wlist),
                        doc = await collection.doc(docRef.id).get();
                        doc = doc || {};
                        console.log('createWishList', docRef.id, doc.data());
                        res = new Promise(resolve => resolve({
                            type: 'success',
                            items:(doc.data().items || [])
                        })) //(data.items || []).map(item => item.sku)
                    }catch(err){
                        console.error(err);
                        res = new Promise(resolve => resolve([]))
                    }
                }else {
                    let data = {};
                    data.type = 'error';
                    data.msg = 'Wishlist is already present';
                    res = new Promise(resolve => resolve(data));
                }
            }else {
                throw new Error('No email parameter present');
            }
        }catch(err){
            res = new Promise((resolve, reject) => reject(err));
        }
    return res;
}

export const addToWishList = async (email, sku) => {
    let res = null;
    if(email){
        try{
            let queries = await getWishlistQuery(email);
            if(queries.size <= 0){
                let data = await createWishList(email, "", [sku]);
                console.log(data);
                res = new Promise(resolve => resolve(data));
            }else if(queries.size === 1){
                console.log('queries', queries.docs[0].id);
                let doc = queries.docs[0],
                docId = doc.id;
                    console.log(doc.id, " => ", doc.data());
                let products = doc.data().items || [], isPresent = false;
                
                /* Check if product is present */
                for (let i = 0; i < products.length; i++) {
                    if(products[i].sku === sku){
                        isPresent = true;
                        break;
                    }
                }
                if(isPresent){
                    let data = {};
                    data.type = 'error';
                    data.msg = 'Product is already present in your wish list';
                    console.log('Product already present');
                    res = new Promise((resolve, reject) => resolve({
                        type: 'error', 
                        msg: 'Product is already present in your wish list',
                        items: products
                    }))
                }else {/* If not add it and update */
                    products.push({sku: sku, date_added: (new Date()).getTime()});
                    //let updateQuery = await updateWishlistQuery(doc.id, {'items': products});
                    try {
                        let docRef = await updateWishlistQuery(doc.id, {'items': products});
                        doc = await collection.doc(docId).get();
                        doc = doc || {};
                        console.log('addToWishList', docId, doc.data());
                        res = new Promise(resolve => resolve({
                            type: 'success',
                            items:(doc.data().items || [])
                        }))
                    }catch(err){
                        console.error(err);
                        res = new Promise(resolve => resolve([]))
                    }
                }
            }
        }
        catch(err){
            /* let data = {};
            data.type = 'error';
            data.msg = 'Product is already present in your wish list'; */
            res = new Promise((resolve, reject) => reject(err));
        }
        return res; 
    }
}

export const removeFromWishList = async (email, sku) => {
    let res = null;
    if(email){
        try{
            let queries = await getWishlistQuery(email);
            if(queries.size <= 0){
                res = createWishList(email, "", [sku]);
            }else if(queries.size === 1){
                console.log('queries', queries.docs[0].id);
                let doc = queries.docs[0],
                docId = doc.id;
                console.log(doc.id, " => ", doc.data());
                let products = doc.data().items || [], isPresent = false, index = -1;
                
                /* Check if product is present */
                for (let i = 0; i < products.length; i++) {
                    if(products[i].sku === sku){
                        isPresent = true;
                        index = i;
                        break;
                    }
                }
                if(isPresent && index > -1){
                    products.splice(index, 1);                        
                    let docRef = await updateWishlistQuery(doc.id, {'items': products});
                    doc = await collection.doc(docId).get();
                    doc = doc || {};
                    console.log('removeFromWishList', docId, doc.data());
                    res = new Promise(resolve => resolve({
                        type: 'success',
                        items:(doc.data().items || [])
                    }))
                }else {/* If not add it and update */
                    let data = {};
                    data.type = 'error';
                    data.msg = 'Product is not present in your wish list';
                    res = new Promise((resolve, reject) => resolve(
                        {
                            type: 'error', 
                            msg: 'Product is not present in your wish list',
                            items: products
                        }
                        ))
                }
            }
        }
        catch(err){
            /* let data = {};
            data.type = 'error';
            data.msg = 'Product is already present in your wish list'; */
            res = new Promise((resolve, reject) => reject(err));
        }
        return res; 
    }
}
