import { readFromLocalStorage, writeToLocalStorage } from './../../service/helper';

const search_history = 'search_history';
export const getSearchHistory = () => {
    return (new Promise( (resolve, reject) => {
        let suggestions = (readFromLocalStorage(search_history) || "").split(',');
        setTimeout(() => resolve(suggestions), 500);
    }));
}
export const updateSearchHistory = (searchTerm) => {
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

export const getSuggestions = (searchTerm) => {
    if(!searchTerm){
        return [];
    }
    return (new Promise( (resolve, reject) => {
        let suggestions = [];
        ['Men', 'Women', 'Kids'].forEach(item => {
            suggestions.push(searchTerm + ' in ' + item);
        });
        setTimeout(() => resolve(suggestions), 200);
    }));
}