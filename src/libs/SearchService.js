import { _debounce } from './Helper';
let counter = 0;
export const fetchSuggestions = (str) => {
    window.loginfo('Fetching data...', str);
    return new Promise(res => []);
}
export const fetchSearchHistory = (str) => {

}
export const saveSeachHistory = (str) => {

}
//export const searchSuggestion = _debounce(fetchSuggestions, 300);