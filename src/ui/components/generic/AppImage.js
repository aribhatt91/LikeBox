import React, { useState, useEffect, useRef } from 'react'

export default function AppImage({className, src}) {
    const [loaded, setLoaded] = useState(false);
    return (
        <div className={"app-img-background" + (className ? " " + className : "") + (loaded ? ' img-loaded' : '')}>
            <img src={src} onLoad={() => setLoaded(true)}/>
        </div>
    )
}
