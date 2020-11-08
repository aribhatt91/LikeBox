import { _debounce } from './helper';
let counter = 0;
const fetchSuggestions = (str) => {
    console.log('Fetching data...', str);
}
export const searchSuggestion = _debounce(fetchSuggestions, 300);