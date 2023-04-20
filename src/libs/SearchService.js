import MOCK_DATA from './constants/fake-search-data.json';
let counter = 0;

class Item {
    constructor({name, type, product=null, link, thumbnail=""}){
        this.name = name;
        this.type = type;
        if(type === 2 && product){
            this.product = product;
            this.thumbnail = thumbnail;
        }
    }
}

export default {
    fetchSuggestions: (query, limit=100) => {
        window.loginfo('Fetching data...', query);
        return new Promise((res, rej) => {
            const results = [];

        });
    },
    fetchSearchHistory: (query) => {

    },
    updateSearchHistory: (query, response, cacheSize) => {

    },
    queryCache: (query) => {},
    invalidateCache: () => {}
}