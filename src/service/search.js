import { _debounce } from './helper';
import { MockGetSuggestions } from './../mock/api/mock-search-api';
let counter = 0;
export const fetchSuggestions = (str) => {
    console.log('Fetching data...', str);
    return MockGetSuggestions(str);
}
export const fetchSearchHistory = (str) => {

}
export const saveSeachHistory = (str) => {

}
//export const searchSuggestion = _debounce(fetchSuggestions, 300);