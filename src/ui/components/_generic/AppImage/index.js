import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import './style.component.css';

export default function AppImage({className, src, alt="", ...rest}) {
    const [loaded, setLoaded] = useState(false);
    const imgRef = useRef(null);
    useEffect(()=> {
        //window.loginfo('useEffect called', imgRef);
        if(imgRef && imgRef.current){
            if(imgRef.current.loaded){
                setLoaded(true);
            }
        }
    }, [imgRef])
    return (
        <img alt={alt || ""} {...rest} ref={imgRef} className={"app-image" + (loaded ? " app-img--loaded" : "") + (className ? " " + className : "")} src={src} onLoad={() => setLoaded(true)}/>
    )
}

AppImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    className: PropTypes.string
}