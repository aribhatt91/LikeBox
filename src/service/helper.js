export const readFromCookie = (name) => {
    try{
        let decodedCookie = decodeURIComponent(document.cookie),
        ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
    }catch(err){
        console.log('readFromCookie: error :', name, err);
    }
    return null;
}

export const writeToCookie = (cname, value, days) => {
    var d = new Date();
    d.setTime(d.getTime() + ((days || 30)*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + JSON.stringify(value) + ";" + expires + ";path=/";
}

export const numberWithCommas = (x) => {
    if(isNaN(Number(x))){return ""}
    let parts = x.toString().split(".");
    return Number(parts[0]).toLocaleString() + "." + ((parts[1] || "") + "00").slice(0,2);
}
export const simulateNetworkRequest = () => {
    return new Promise(resolve => setTimeout(resolve, 2000));
}
export const _debounce = (fn, delay) => {
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

export const writeToLocalStorage = (key, value) => {
    if(window.localStorage){
        localStorage.setItem(key, value);
        return true;
    }
    return false;
}
export const readFromLocalStorage = (key) => {
    if(window.localStorage){
        return localStorage.getItem(key);
    }
    return null;
}

export const parseSearchParams = (search) => {
    let res = {};
    try{
        search = search || "";
        search = search.replace('?', '');
        let params = search.split('&');
        params.forEach(item => {
            let key = item.split('=')[0] || "", val = decodeURIComponent(item.split('=')[1]) || "";
            key = key.toLowerCase();
            val = val.toLowerCase();
            res[key] = val;
        })
    }catch(err){
        console.error('Error in parsing search params', err)
    }
    
    return res;
}

export const isSafeUrl = (url) => {
    const protocol = URL(url).protocol;
    if(protocol === 'http:' || protocol === 'https:'){
        return true
    }
    return false;
}

export const capitalise = (str) => {
    if(!str || typeof str !== 'string' || str.trim().length === 0){
        return str;
    }
    return str.charAt(0).toUpperCase() + (str.slice(1) || "").toLowerCase();
}

export const capitaliseAll = (str) => {
    if(!str || typeof str !== 'string' || str.trim().length === 0){
        return str;
    }
    return str.split(' ').map(s => capitalise(s)).join(' ');
}

export const formatPrice = (price) => {
    return Number(price).toFixed(2).toLocaleString();
}