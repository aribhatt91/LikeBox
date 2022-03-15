import React, { useState, useEffect } from 'react';

const useFetch = (url, options=null) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        fetch(url, options)
        .then(res => res.json())
        .then(data => {
            if(isMounted){
                setData(data);
                setError(null);
            }
        })
        .catch(error => {
            if(isMounted){
                setData(null);
                setError(error);
            }
        })
        .finally(() => isMounted && setLoading(false));

        return () => (isMounted = false);

    }, [url, options]);

    return {data, error, loading};
}

export default useFetch;