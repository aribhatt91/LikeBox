export const sendEvent = (event, data) => {
    if(window.gtag && typeof window.gtag === 'function') {
        window.gtag('event', event, data);
    }

}
export const setProp = (prop, value) => {
    if(window.gtag && typeof window.gtag === 'function') {
        window.gtag('set', {[prop]: value});
    }
}
