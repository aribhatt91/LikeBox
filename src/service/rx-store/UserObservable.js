import { Observable } from 'rxjs';
import axios from 'axios';
/* Mock methods */
import simulateNetworkRequest from '../simulateNetworkRequest';

const UserObservable = new Observable( observer => {
    //axios.get( 'https://jsonplaceholder.typicode.com/users' )
    simulateNetworkRequest()
    .then( ( response ) => {
        //observer.next( response.data );
        observer.next({});
        observer.complete();
    } )
    .catch( ( error ) => {
        observer.error( error );
    } );
});

export default UserObservable;