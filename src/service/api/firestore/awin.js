import { db } from './../firebase';
import { concat, isEqual, max, reject, uniqWith } from 'lodash';
import { convertAwinToProduct } from './models/Product';


const collection = db.collection('awin');
const categoriesCollection = db.collection('categories');
/* 
fetch products by path
1. Break down the path and 
*/
export const fetchAwinProducts = async (path="", page=0, LIMIT=10, LAST_NODES=[], filter={}) => {
    console.log('Product category ->', path);
    path = path.toLowerCase() || "";
    let paths = path.split('-').map(p => (p || "").trim()), queryPaths = [], res = null;
    /* Get available paths as per search terms */
    try {
        let categoriesQuerySnapshot = await categoriesCollection.get(),
        categories = categoriesQuerySnapshot.docs;
        let availableCategoriesDocs = categories.filter(doc => doc.id === 'aggregate'),
        avalaibleCategories = null;
        
        if(availableCategoriesDocs.length > 0){
            avalaibleCategories = availableCategoriesDocs.map(doc => doc.data())[0]
            console.log('availableCategories', avalaibleCategories);
            if(avalaibleCategories){
                Object.keys(avalaibleCategories).forEach(cat => {
                    for (let index = 0; index < paths.length; index++) {
                        if(paths[index].trim().indexOf(cat.trim()) === 0  || (cat.trim()).indexOf(paths[index]) === 0){
                            queryPaths.push(cat.trim());
                            console.log(cat);
                            break;
                        }
                    }
                })
                console.log('Actual queryPaths -> ', paths, queryPaths);
            }
        }

        if(queryPaths.length > 1){
            /* Logical OR operation */
            
            let queries = [];
            let promises = [];

            queryPaths.forEach(item => {
                if((item || "").trim() !== ""){
                    queries.push(('searchTerms.' + (item || "").trim()))
                }
            });
            let q1 = collection.where(queries[0], '==', true).limit(LIMIT),
            q2 = collection.where(queries[1], '==', true).limit(LIMIT);

            let p1 = q1.get(),
            p2 = q2.get();
            const [p1Snap, p2Snap] = await Promise.all([p1, p2]),
            dump = concat(p1Snap.docs, p2Snap.docs);

            let lastVisible = [p1Snap.docs[p1Snap.docs.length - 1], p1Snap.docs[p1Snap.docs.length - 1]];
            res = {lastVisible};

            res.items = (uniqWith(dump, isEqual)).map(doc => convertAwinToProduct(doc.data(), doc.id));
            console.log('Fetched awin products for path -> ', path, '--->', res);
        }else if(queryPaths.length === 1){
            console.log('BP3', queryPaths, ('searchTerms.' + (queryPaths[0] || "").trim()));
            let q = collection
            .where(('searchTerms.' + (queryPaths[0] || "").trim()), '==', true);
            if(LAST_NODES && Array.isArray(LAST_NODES) && LAST_NODES.length >= 1){
                q = q.startAfter(LAST_NODES[0]);
            }
            q = q.limit(LIMIT);
            let querySnapshot = await q.get();
            let lastVisible = [querySnapshot.docs[querySnapshot.docs.length - 1]];

            res = {lastVisible};
            res.items = (querySnapshot.docs || []).map(doc => convertAwinToProduct(doc.data(), doc.id));
            console.log('Fetched awin products for path -> ', path, '--->', res);
        }
    }catch(err){
        console.error('fetchAwinProducts:error', err);
        return new Promise((resolve, reject) => reject(err));
    }
    return new Promise(resolve => resolve(res));    
}

export const fetchProductsByPage = (page, max) => {
    /* return new Promise((resolve, reject) => {
        if(page >= 0 && max > 0) {
            setTimeout(() => {
                resolve(products.slice(page*max, page*max + max))
            }, 1000);
        }else {
            reject([]);
        }
    }) */
}
export const fetchProductsByIds = (productIds=[]) => {
    /* return new Promise((resolve, reject) => {
        var data = (products || []).filter((item, index) => {
            let isPresent = false;
            productIds.forEach(p => {
                if(p === item.sku){
                    isPresent = true;
                }
            })
            return isPresent;
        })
        console.log(productIds, data);
        resolve(data);
    }) */
}

export const fetchAwinProduct = async (sku) => {
    sku = (sku || "").toLowerCase();
    let res = null;
    try {
        let doc = await collection.doc(sku).get();
        res = convertAwinToProduct(doc.data(), sku);
        console.log('fetchAwinProduct:response', res);
    }catch(err){
        console.error('fetchAwinProduct:error', err);
        return new Promise((resolve, reject) => reject(err));
    }
    return new Promise(resolve => resolve(res));
}