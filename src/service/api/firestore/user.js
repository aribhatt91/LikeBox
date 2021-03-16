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
     preferences: {
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


export const updateUserByEmail = async (email, update, postUpdate) => {
    try {
        let querySnapshot = await fetchUser(email);
        
        console.log(querySnapshot);
        if(querySnapshot.size === 1){
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                collection.doc(doc.id)
                .update(update)
                .then(data => {
                    console.log('Successfully updated user', data);
                    if(postUpdate && typeof postUpdate === 'function'){
                        postUpdate();
                    }
                }).catch(err => {
                    console.error('Ran into error', err);
                })
            });
        }
        /* ref.update(update).then( docRef => {
            console.log("Document written with ID: ", docRef);
        }).catch((error) => {
            console.error("Error adding document: ", error);
        }); */
    }catch(err){
        console.error("updateUser: error -> ", err);
    }   
}
