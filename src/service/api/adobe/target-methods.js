export const triggerCustomEvent = (viewName, params) => {
    let mboxName = 'mbox-page-view', detail = {};
    if(viewName){
        mboxName = 'mbox-' + viewName;
        detail = {
            view: viewName
        }
    }
    if(params && typeof params === 'object'){
        detail = {
            ...detail,
            params
        }
    }
    detail = {
        ...detail,
        mbox: mboxName
    }

    let event = new CustomEvent("react-view-change", {detail})
    document.dispatchEvent(event);
}

export const sendProductInformation = () => {

}