import React, { useEffect, useRef } from 'react';

const useEventListener = (eventTYpe="", target=window, listener = () => null, options=null) => {
    const savedListener = useRef();

    useEffect(()=>{
        savedListener.current = listener;
    },[listener])

    useEffect(() => {
        if(!target?.addEventListener){
            return;
        }
        const eventListner = event => savedListener.current(event);

        target.addEventListener(eventTYpe, eventListner, options);

        return () => {
            target?.removeEventListener(eventType, eventListner, options);
        };

    }, [eventTYpe, target, options]);
}

export default useEventListener;