import { db } from './../firebase';
 /* let user = {
     email,
     name: {
         fname,
         lname
     },
     mobile,
     addresses: [{
         housenum,
         street,
         city,
         zipcode,
         country
     }],
     cart : {
         items:[],
         total,
         date,
         size
     },
     wishlist,
     orders,
     payments,
     sizing: {
         shoesize,
         neck,
         chest,
         height,
         waist
     }
 } */

const collection = db.collection('users');
function stringToHash(string) { 
                  
    var hash = 0; 
      
    if (string.length == 0) return hash; 
      
    for (let i = 0; i < string.length; i++) { 
        let char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; 
    } 
      
    return hash; 
} 

export const fetchUserQuery = (email) => {
    return collection.where("email", "==", email).get();
}

export const getUser = async (email) => {
    let user = null;
    window.mlog('getUser:start', (new Date()).getTime());
    try {
        let queries = await fetchUserQuery(email);
        if(queries.docs.length > 0){
            user = queries.docs[0].data();
            window.mlog('getUser:try', user, (new Date()).getTime());
        }else {
            throw new Error('Unique user not found');
        }
    }catch(err){
        console.error('user:getUser:', err);
        return new Promise((resolve, reject) => reject(err));
    }finally{
        window.mlog('getUser:finally', user, (new Date()).getTime()); 
    }
    return new Promise(resolve => resolve(user));
}

export const isFirstLoad = async (email) => {
    let user = null, res = true;
    try {
        user = await getUser(email);
        window.mlog('isFirstLoad', user);
        res = !(user && user.showedPrefs);
        window.mlog('isFirstLoad:first', res);
        if(!res){
            await updateUserByEmail(email, {showedPrefs: true})
            user = await getUser(email);
            res = !(user && user.showedPrefs);
            window.mlog('isFirstLoad:await', res);
        }
    }catch(err){

    }
    window.mlog('isFirstLoad:return', res);
    return new Promise(resolve => resolve(res));
}
export const addUser = async (newUser) => {
    if(newUser.email){
        try{
            let user = await getUser(newUser.email);
            if(user){
                console.error('Email address is already registered');
                return;
            }
        }catch(err) {
            console.error('Error while querying for existing users', err);
        }
    
        try {
            let date = (new Date()).getTime();
            newUser.date_joined = date;
            collection.add(newUser).then( docRef => {
                window.mlog("Document written with ID: ", docRef);
            }).catch((error) => {
                console.error("Error adding document: ", error);
            });
        }catch(err){
            console.error("addUser: error -> ", err);
        }
    }
}

const validateUpdateObject = (update) => {
    return update && typeof update === 'object' && (update.hasOwnProperty('name') || update.hasOwnProperty('cart') || update.hasOwnProperty('addresses') || update.hasOwnProperty('wishlist') || update.hasOwnProperty('orders') || update.hasOwnProperty('payments') || update.hasOwnProperty('sizing') || update.hasOwnProperty('mobile'));
}
export const updateUserByEmail = async (email, update) => {
    let res = null;
    try {
        let querySnapshot = await fetchUserQuery(email);
        
        //window.mlog(querySnapshot.docs);
        if(querySnapshot.docs.length === 1){
            let doc = querySnapshot.docs[0];
                // doc.data() is never undefined for query doc snapshots
            window.mlog(doc.id, " => ", doc.data());
            res = await collection.doc(doc.id).update(update);
            window.mlog('updateUserByEmail: response', res);
        }else {
            throw new Error('Update Aborted! More than one user found with same email');
        }
    }catch(err){
        console.error("updateUser:error:", err);
        return new Promise((resolve, reject) => reject(err));
    }
    return new Promise(resolve => resolve(res));
}

export const getUserSizing = async (email) => {
    let sizing = null;
    try {
        let user = await getUser(email);
        sizing = user.sizing;
    }catch(err){
        console.error("getUserSizing:error -> ", err);
    }   
    return new Promise(resolve => resolve(sizing));
}
export const getUserLikeBox = async (email) => {
    let likebox = null;
    try {
        let user = await getUser(email);
        likebox = user.likebox || null;
    }catch(err){
        console.error("getUserLikeBox:error -> ", err);
    } 
    return new Promise(resolve => resolve(likebox));
}
export const setUserSizing = async (email, update) => {
    let res = null;
    try {
        //window.mlog(doc.id, " => ", doc.data());
        let sizing = await getUserSizing(email);;
        
        if(sizing){
            sizing = {
                ...sizing,
                ...update
            };
        }else {
            sizing = update;
        }
        res = await updateUserByEmail(email, {sizing});
        //res = res.sizing;
        window.mlog('setUserSizing:updated sizing', res);
    }catch(err){
        console.error("setUserSizing:error -> ", err);
    }   
    return new Promise(resolve => resolve(res));
}