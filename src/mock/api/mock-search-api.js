import { readFromLocalStorage, writeToLocalStorage } from './../../service/helper';
import SEARCH from '../search.json';
const search_history = 'search_history';
export const MockGetSearchHistory = () => {
    return (new Promise( (resolve, reject) => {
        let suggestions = (readFromLocalStorage(search_history) || "").split(',');
        setTimeout(() => resolve(suggestions), 500);
    }));
}
export const MockUpdateSearchHistory = (searchTerm) => {
    if(!searchTerm){
        return [];
    }
    return (new Promise( (resolve, reject) => {
        let suggestions = (readFromLocalStorage(search_history) || "").split(',');
        if(suggestions.indexOf(searchTerm)){
            suggestions = suggestions.slice(suggestions.indexOf(searchTerm), 1);
        }
        suggestions.push(searchTerm);
        writeToLocalStorage(search_history, suggestions.join(','));
        setTimeout(() => resolve(suggestions), 500);
    }));
}

export const MockGetSuggestions = (searchTerm) => {
    if(!searchTerm){
        return [];
    }
    return (new Promise( (resolve, reject) => {
        const map = SEARCH;
        let suggestions = [];
        map.keywords.brands.forEach(item => {
            if(searchTerm.toLowerCase().indexOf(item) > -1 || item.toLowerCase().indexOf(searchTerm) > -1) {
                let obj = {};
                obj.type = 'brand';
                obj.brand = item;
                suggestions.push(obj);
            }
        }) 
        map.keywords.products.forEach(item => {
            if(searchTerm.toLowerCase().indexOf(item) > -1 || item.toLowerCase().indexOf(searchTerm) > -1) {
                map.keywords.category.forEach(cat => {
                    let obj = {};
                    obj.type = 'product';
                    obj.product = item;
                    obj.category = cat;
                    suggestions.push(obj);
                });
            }
        }) 
        map.keywords.category.forEach(item => {
            if(searchTerm.toLowerCase().indexOf(item) > -1 || item.toLowerCase().indexOf(searchTerm) > -1) {
                map.keywords.products.forEach(p => {
                    let obj = {};
                    obj.type = 'category';
                    obj.category = item;
                    obj.product = p;
                    suggestions.push(obj);
                });
            }
        })   
        
        /* ['Men', 'Women', 'Kids'].forEach(item => {
            suggestions.push(searchTerm + ' in ' + item);
        }); */
        setTimeout(() => resolve(suggestions), 200);
    }));
}