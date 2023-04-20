const DATA_LAYER_NAME = 'digitalData';

/* 
    @params(base:object, update:object, merge?:boolean)
    base: base object - required - non-null
    update: required - not null
    merge: boolean : optional - if set to false, a shallow override will happen
*/
const deepMerge = (base={}, update, merge=true) => {
    if(!base || typeof update !== 'object'){
        return;
    }
    /* 
        A special flag __MERGE__ to combine the best of deep and shallow merge. 
        If this flag is set to false in a nested object, that object is overriden 
    */
    const __MERGE__ = update['__MERGE__'] === false ? false : merge;
    if(update['__MERGE__'] === false){
        delete update['__MERGE__'];
    }
    
    for (const [key, value] of Object.entries(update)) {
        if(!__MERGE__ || !base.hasOwnProperty(key) || typeof base[key] !== 'object' || base[key] === null || base[key] === undefined || Array.isArray(base[key]) || Array.isArray(value) || value === null || typeof value !== 'object' || (value.__proto__.__proto__ !== null) || (base[key].__proto__.__proto__ !== null)) {
            base[key] = value;
        }else if(typeof value === 'object' && typeof base[key] === 'object'){
            deepMerge(base[key], value)
        }
    }
}
class DataLayer {    
    constructor(name=DATA_LAYER_NAME) {
        this.name = name;
        if(!window[this.name]){
            window[this.name] = window[this.name] || {};
            window[this.name].events = window[this.name].events || [];
        }
    }
    /* 
    Takes a path in dot notation and returns the corresponding value
    */
    get (objectPath) {
        let copy = undefined;
        if(!objectPath) {
            copy = Object.assign({}, window[this.name]);
            delete copy['events'];
        }else {
            const nested = objectPath.split('.');
            let obj = window[this.name];

            for (let i = 0; i < nested.length; i++) {
                /* If current value of obj is primitive type or null */
                if(typeof obj !== 'object' || obj === null) {
                    //break;
                    return copy;
                }
                
                if(nested[i].indexOf('[') > -1 && nested[i].indexOf(']') > -1) {
                    /* Handle arrays */
                    let array = nested[i].substring(0, nested[i].indexOf('[')),
                    num = Number((nested[i].substring(nested[i].indexOf('[') + 1, nested[i].indexOf(']'))));
                    if(Array.isArray(obj[array]) && num) {
                        obj = obj[array][num];
                    }else {
                        return copy;
                    }
                }else {
                    obj = obj[nested[i]];
                }
                
            }

            if(typeof obj !== 'undefined'){
                if(!Array.isArray(obj) && typeof obj === 'object'){
                    copy = Object.assign({}, obj);
                }else {
                    copy = obj;
                }   
            }
            
            //delete obj[nested[nested.length - 1]];
        }
        return copy;
    }

    push(arg){
        let events = [];

        if(Array.isArray(arg)){
            events = arg;
        }else {
            events.push(arg);
        }  

        window[this.name].events = window[this.name].events || [];

        events.forEach(e => {

            const { event, data, merge=true, update=true } = e;
            /* unless update flag is set to false, update the data layer */
            if(update && data) {
                deepMerge(window[this.name], data, merge);
            }
            /* unless update flag is set to false, update the data layer */
            if(event){
                window[this.name].events.push({event, data});
            }
            
        });
    }

    remove(objectPath){
        
        if(objectPath){
            const nested = objectPath.split('.');

            if(nested.length === 1){
                delete window[this.name][nested[0]];
                return;
            }

            let obj = window[this.name];
            for (let i = 0; i < nested.length - 1; i++) {
                if(!obj) {
                    return;
                }
                obj = obj[nested[i]];
                
            }
            delete obj[nested[nested.length - 1]];
        }
    }

    clearEvents(){
        if(window[this.name]){
            window[this.name].events = [];
        }
    }
}

export default DataLayer;
