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

export const fetchUser = (email) => {
    return collection.where("email", "==", email).get();
}
export const addUser = async (user) => {
    if(user.email){
        try{
            let queries = await fetchUser(user.email);
            if(queries.size > 0){
                throw new Error('Email address is already registered');
            }
        }catch(err) {
            console.error('Error while querying for existing users', err);
            return;
        }
    
        try {
            let date = (new Date()).getTime();
            user.date_joined = date;
            collection.add(user).then( docRef => {
                console.log("Document written with ID: ", docRef);
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
        let querySnapshot = await fetchUser(email);
        
        console.log(querySnapshot);
        if(querySnapshot.size === 1){
            let doc = querySnapshot.docs[0];
                // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            res = collection.doc(doc.id).update(update);
        }else {
            throw new Error('Update Aborted! More than one user found with same email');
        }
    }catch(err){
        console.error("updateUser:error:", err);
    }   
    if(res){
        return new Promise(resolve => resolve(res));
    }else {
        return new Promise((resolve, reject) => reject(res));
    }
}

export const getUserSizing = async (email) => {
    let sizing = null;
    try {
        let querySnapshot = await fetchUser(email);
        console.log(querySnapshot);
        if(querySnapshot.size === 1){
            querySnapshot.forEach((doc) => {
                //console.log(doc.id, " => ", doc.data());
                sizing = doc.data().sizing || null;
            });
        }
    }catch(err){
        console.error("updateUser: error -> ", err);
    }   
    return new Promise(resolve => resolve(sizing));
}