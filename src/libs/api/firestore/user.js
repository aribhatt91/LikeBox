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
    window.loginfo('getUser:start', (new Date()).getTime());
    try {
        let queries = await fetchUserQuery(email);
        if(queries.docs.length > 0){
            user = queries.docs[0].data();
            window.loginfo('getUser:try', user, (new Date()).getTime());
        }else {
            throw new Error('Unique user not found');
        }
    }catch(err){
        window.logerror('user:getUser:', err);
        return new Promise((resolve, reject) => reject(err));
    }finally{
        window.loginfo('getUser:finally', user, (new Date()).getTime()); 
    }
    return new Promise(resolve => resolve(user));
}

export const isFirstLoad = async (email) => {
    let user = null, res = true;
    try {
        user = await getUser(email);
        window.loginfo('isFirstLoad', user);
        res = !(user && user.showedPrefs);
        window.loginfo('isFirstLoad:first', res);
        if(!res){
            await updateUserByEmail(email, {showedPrefs: true})
            user = await getUser(email);
            res = !(user && user.showedPrefs);
            window.loginfo('isFirstLoad:await', res);
        }
    }catch(err){

    }
    window.loginfo('isFirstLoad:return', res);
    return new Promise(resolve => resolve(res));
}
export const addUser = async (newUser) => {
    if(newUser.email){
        try{
            let user = await getUser(newUser.email);
            if(user){
                window.logerror('Email address is already registered');
                return;
            }
        }catch(err) {
            //window.logerror('Error while querying for existing users', err);
        }
    
        try {
            let date = (new Date()).getTime();
            newUser.date_joined = date;
            collection.add(newUser).then( docRef => {
                window.loginfo("Document written with ID: ", docRef);
            }).catch((error) => {
                window.logerror("Error adding document: ", error);
            });
        }catch(err){
            window.logerror("addUser: error -> ", err);
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
        
        //window.loginfo(querySnapshot.docs);
        if(querySnapshot.docs.length === 1){
            let doc = querySnapshot.docs[0];
                // doc.data() is never undefined for query doc snapshots
            window.loginfo(doc.id, " => ", doc.data());
            res = await collection.doc(doc.id).update(update);
            window.loginfo('updateUserByEmail: response', res);
        }else {
            throw new Error('Update Aborted! More than one user found with same email');
        }
    }catch(err){
        window.logerror("updateUser:error:", err);
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
        window.logerror("getUserSizing:error -> ", err);
    }   
    return new Promise(resolve => resolve(sizing));
}
export const getUserLikeBox = async (email) => {
    let likebox = null;
    try {
        let user = await getUser(email);
        likebox = user.likebox || null;
    }catch(err){
        window.logerror("getUserLikeBox:error -> ", err);
    } 
    return new Promise(resolve => resolve(likebox));
}
export const setUserSizing = async (email, update) => {
    let res = null;
    try {
        //window.loginfo(doc.id, " => ", doc.data());
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
        window.loginfo('setUserSizing:updated sizing', res);
    }catch(err){
        window.logerror("setUserSizing:error -> ", err);
    }   
    return new Promise(resolve => resolve(res));
}

export const getUserStyle = async (email) => {
    let styles = null;
    try {
        let user = await getUser(email);
        styles = user.styles;
    }catch(err){
        window.logerror("getUserStyle:error -> ", err);
    }   
    return new Promise(resolve => resolve(styles));
}

export const updateUserStyle = async (email, styles) => {
    let res = null;
    try {
        res = await updateUserByEmail(email, {styles});
        window.loginfo('updateUserStyle:updated styles', res);
    }catch(err){
        window.logerror("updateUserStyle:error -> ", err);
        return new Promise((resolve, reject) => reject(err));
    }   
    return new Promise(resolve => resolve(res));
}

export const getUserChoice = async (email) => {
    let likebox = null;
    try {
        let user = await getUser(email);
        likebox = user.box || null;
    }catch(err){
        window.logerror("getUserLikeBox:error -> ", err);
    } 
    return new Promise(resolve => resolve(likebox));
}

