import { db, fieldPath } from './../firebase';
import { concat, isEqual, max, reject, uniqWith } from 'lodash';
import { convertAwinToProduct } from './models/Product';


const collection = db.collection('awin');
const categoriesCollection = db.collection('categories');

/* Take a query and a filter object. 
Add database filtering to the query and return the query object */
const applyFilter = (query, filter) => {
    if(!query || !filter){
        return query;
    }
    if(filter.sortBy){
        
    }
}
/* 
fetch products by path
1. Break down the path and 
*/
export const fetchAwinProducts = async (path="", page=0, LIMIT=10, LAST_NODES=[], filter={}) => {
    window.loginfo('Product category ->', path);
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
            window.loginfo('availableCategories', avalaibleCategories);
            if(avalaibleCategories){
                Object.keys(avalaibleCategories).forEach(cat => {
                    for (let index = 0; index < paths.length; index++) {
                        if(paths[index].trim().indexOf(cat.trim()) === 0  || (cat.trim()).indexOf(paths[index]) === 0){
                            queryPaths.push(cat.trim());
                            window.loginfo(cat);
                            break;
                        }
                    }
                })
                window.loginfo('Actual queryPaths -> ', paths, queryPaths);
            }
        }

        if(queryPaths.length > 1){
            /* Logical OR operation */
            
            let queries = [];

            queryPaths.forEach(item => {
                if((item || "").trim() !== ""){
                    queries.push(('searchTerms.' + (item || "").trim()))
                }
            });
            let q1 = collection.where(queries[0], '==', true),
            q2 = collection.where(queries[1], '==', true);
            
            if(LAST_NODES && Array.isArray(LAST_NODES) && LAST_NODES.length >= 2){
                q1 = q1.startAfter(LAST_NODES[0]);
                q2 = q2.startAfter(LAST_NODES[0]);
            }

            q1 = q1.limit(LIMIT);
            q2 = q2.limit(LIMIT);

            let p1 = q1.get(),
            p2 = q2.get();
            const [p1Snap, p2Snap] = await Promise.all([p1, p2]),
            dump = concat(p1Snap.docs, p2Snap.docs);

            let lastVisible = [p1Snap.docs[p1Snap.docs.length - 1], p2Snap.docs[p2Snap.docs.length - 1]];
            res = {lastVisible};

            res.items = (uniqWith(dump, isEqual)).map(doc => convertAwinToProduct(doc.data(), doc.id));
            window.loginfo('2: Fetched awin products for path -> ', path, '--->', res);
        }else if(queryPaths.length === 1){
            window.loginfo('BP3', queryPaths, ('searchTerms.' + (queryPaths[0] || "").trim()));
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
            window.loginfo('1: Fetched awin products for path -> ', path, '--->', res);
        }
    }catch(err){
        window.logerror('fetchAwinProducts:error', err);
        return new Promise((resolve, reject) => reject(err));
    }
    return new Promise(resolve => resolve(res));    
}
//https://stackoverflow.com/questions/47876754/query-firestore-database-for-document-id
//db.collection('books').where(firebase.firestore.FieldPath.documentId(), '==', 'fK3ddutEpD2qQqRMXNW5').get()
export const fetchAwinProductsBySkus = async (skus=[], page=0, LIMIT=10, LAST_DOC=null, exclusion=false) => {
    let res = [];
    try{
        let query = null;
        if(!exclusion){
            query = collection.where(fieldPath.documentId(), 'in', (skus || []));
        }else {
            query = collection;
            skus = (skus || []).filter(item => item && typeof item === "string");
            if((skus || []).length > 0){
                query = query.where(fieldPath.documentId(), 'not-in', (skus || []));
            }
        }
        if(LAST_DOC && page > 1){
            query = query.startAfter(LAST_DOC);
        }
        query = query.limit(LIMIT); 
        let querySnapshot = await query.get(),
        docs = querySnapshot.docs,
        items = docs.map(doc => convertAwinToProduct(doc.data(), doc.id));
        let lastVisible = docs[docs.length - 1];
        res = {lastVisible, items};
    }catch(err){
        return new Promise((resolve, reject) => reject(err));
    }
    return new Promise(resolve => resolve(res));
}

export const fetchAwinProduct = async (sku) => {
    sku = (sku || "").toLowerCase();
    let res = null;
    try {
        let doc = await collection.doc(sku).get();
        res = convertAwinToProduct(doc.data(), sku);
        window.loginfo('fetchAwinProduct:response', res);
    }catch(err){
        window.logerror('fetchAwinProduct:error', err);
        return new Promise((resolve, reject) => reject(err));
    }
    return new Promise(resolve => resolve(res));
}