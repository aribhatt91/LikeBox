
let counter = 0;
const fetchSuggestions = (str) => {
    console.log('Fetching data...', str);
},
debounce = (fn, delay) => {
    let timer;
    return function() {
        let context = this,
        args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    }
}
export const searchSuggestion = debounce(fetchSuggestions, 300);