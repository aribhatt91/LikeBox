import { db, fieldPath } from './../firebase';
import { concat, isEqual, uniqWith } from 'lodash';
import { convertAwinToProduct, convertCJToProduct } from './models/Product';


const collection = db.collection('products');
const brandsCollection = db.collection('brands');
const categoriesCollection = db.collection('categories');

/* Take a query and a filter object. 
Add database filtering to the query and return the query object */
const applyFilter = (query, filterObject) => {
    if(!query || !filterObject){
        return query;
    }
    window.mlog('applyFilter', query, filterObject);
    if(filterObject.sortby){
        let order = filterObject.sortby.selected;
        if(order && order !== ""){
            if(order.indexOf(':') > -1){
                query = query.orderBy(order.split(":")[0], order.split(":")[1]);
            }
        }
    }
    if(filterObject.brands){
        let brands = filterObject.brands.selected || [];
        
        if(brands && Array.isArray(brands) && brands.length > 0){
            brands = brands.slice(0, 10);
            query = query.where('brand', 'in', brands);
        }
    }
    if(filterObject.gender){
        let gender = filterObject.gender.selected || [];
        if(gender && Array.isArray(gender)){
            if(gender.indexOf('m') > -1 && gender.indexOf('f') > -1){
                //do nothing
            }else if(gender.indexOf('m') > -1){
                query = query.where('searchTerms.mens', '==', true);
            }else if(gender.indexOf('f') > -1){
                query = query.where('searchTerms.womens', '==', true);
            }
        }
    }
    if(filterObject.price){
        //TODO
    }
    window.mlog('applyFilter', query, filterObject);
    return query;
}
/* 
fetch products by path
1. Break down the path and 
*/
export const fetchFirestoreProducts = async (path="", page=0, LIMIT=10, LAST_NODES=[], filterObject=null) => {
    window.mlog('Product category ->', path);
    path = path.toLowerCase() || "";
    let paths = path.split('-').map(p => (p || "").trim()), 
    queryPaths = [], 
    res = null;
    /* Get available paths as per search terms */
    try {
        let categoriesQuerySnapshot = await categoriesCollection.get(),
        categories = categoriesQuerySnapshot.docs;
        let availableCategoriesDocs = categories.filter(doc => doc.id === 'aggregate'),
        avalaibleCategories = null;
        
        if(availableCategoriesDocs.length > 0){
            avalaibleCategories = availableCategoriesDocs.map(doc => doc.data())[0]
            //console.log('availableCategories', avalaibleCategories);
            if(avalaibleCategories){
                Object.keys(avalaibleCategories).forEach(cat => {
                    for (let index = 0; index < paths.length; index++) {
                        if(paths[index].trim().indexOf(cat.trim()) === 0  || (cat.trim()).indexOf(paths[index]) === 0){
                            queryPaths.push(cat.trim());
                            //console.log(cat);
                            break;
                        }
                    }
                })
                //console.log('Actual queryPaths -> ', paths, queryPaths);
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

            if(filterObject){
                q1 = applyFilter(q1, filterObject);
                q2 = applyFilter(q2, filterObject);
            }
            
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

            res.items = (uniqWith(dump, isEqual)).map(doc => {
                let item = doc.data();
                if(item.affiliate === 'cj'){
                    return convertCJToProduct(item, doc.id);
                }else if(item.affiliate === 'awin'){
                    return convertAwinToProduct(doc.data(), doc.id);
                }
            });

            window.mlog('2: Fetched Firestore products for path -> ', path, '--->', res);

        }else if(queryPaths.length === 1){
            //console.log('BP3', queryPaths, ('searchTerms.' + (queryPaths[0] || "").trim()));
            let q = collection
            .where(('searchTerms.' + (queryPaths[0] || "").trim()), '==', true);
            if(LAST_NODES && Array.isArray(LAST_NODES) && LAST_NODES.length >= 1){
                q = q.startAfter(LAST_NODES[0]);
            }
            if(filterObject){
                q = applyFilter(q, filterObject);
            }
            q = q.limit(LIMIT);
            let querySnapshot = await q.get();
            let lastVisible = [querySnapshot.docs[querySnapshot.docs.length - 1]];

            res = {lastVisible};
            res.items = (querySnapshot.docs || []).map(doc => {
                let item = doc.data();
                if(item.affiliate === 'cj'){
                    return convertCJToProduct(item, doc.id);
                }else if(item.affiliate === 'awin'){
                    return convertAwinToProduct(doc.data(), doc.id);
                }
            });
            //console.log('1: Fetched Firestore products for path -> ', path, '--->', res);
        }
    }catch(err){
        console.error('fetchFirestoreProducts:error', err);
        return new Promise((resolve, reject) => reject(err));
    }
    return new Promise(resolve => resolve(res));    
}
//https://stackoverflow.com/questions/47876754/query-firestore-database-for-document-id
//db.collection('books').where(firebase.firestore.FieldPath.documentId(), '==', 'fK3ddutEpD2qQqRMXNW5').get()
export const fetchFirestoreProductsBySkus = async (skus=[], page=0, LIMIT=10, LAST_DOC=null, exclusion=false) => {
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
        items = docs.map(doc => {
            let item = doc.data();
            if(item.affiliate === 'cj'){
                return convertCJToProduct(item, doc.id);
            }else if(item.affiliate === 'awin'){
                return convertAwinToProduct(doc.data(), doc.id);
            }
        });
        let lastVisible = docs[docs.length - 1];
        res = {lastVisible, items};
    }catch(err){
        return new Promise((resolve, reject) => reject(err));
    }
    return new Promise(resolve => resolve(res));
}

export const fetchFirestoreProduct = async (sku) => {
    sku = (sku || "").toLowerCase();
    let res = null;
    try {
        let doc = await collection.doc(sku).get();
        
        let item = doc.data();
        if(item.affiliate === 'cj'){
            res = convertCJToProduct(item, doc.id);
        }else if(item.affiliate === 'awin'){
            res = convertAwinToProduct(item, doc.id);
        }
        
        window.mlog('fetchFirestoreProduct:response', res);
    }catch(err){
        console.error('fetchFirestoreProduct:error', err);
        return new Promise((resolve, reject) => reject(err));
    }
    return new Promise(resolve => resolve(res));
}

export const fetchProductBrands = async (category) => {
    try {
        let query = brandsCollection;
        if(category){
            try{
                category = category.split('-')[0];
                query = query.where(category, ">", 10).orderBy(category);
            }catch(err){

            }
        }
        let brandsQuerySnapshot = await query.limit(20).get(),
        brands = brandsQuerySnapshot.docs;
        let availableBrandsDocs = brands.filter(doc => doc.id !== 'aggregate');
        let res = availableBrandsDocs.map(doc => Object.assign({'label': doc.id, 'val': doc.id}));
        window.mlog('getBrands', res);
        return new Promise(resolve => resolve(res));
    }catch(err){
        console.error('getBrands', err);
    }
}
