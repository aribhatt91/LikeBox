import React, { useState, useEffect, useRef } from 'react'

export default function AppImage({className, src, alt="", ...rest}) {
    const [loaded, setLoaded] = useState(false);
    const imgRef = useRef(null);
    useEffect(()=> {
        console.log('useEffect called', imgRef);
        if(imgRef && imgRef.current){
            if(imgRef.current.loaded){
                setLoaded(true);
            }
        }
    }, [imgRef])
    return (
        <img alt={alt || ""} {...rest} ref={imgRef} className={"app-image" + (loaded ? " img-loaded" : "") + (className ? " " + className : "")} src={src} onLoad={() => setLoaded(true)}/>
    )
}
