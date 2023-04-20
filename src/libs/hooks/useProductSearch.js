import { useEffect, useState } from "react";
import axios from "axios";

export default function useProductSearch(query, page=1) {
    const [loading, setLoading] = useState(true),
    [error, setError] = useState(false),
    [results, setResults] = useState([]),
    [hasMore, setHasMore] = useState(false);

    useEffect(()=> {
        
    }, [query])

    useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel;
        axios({
            method: 'GET',
            url: 'https://openlibrary.org/search.json',
            params: {
                q: query,
                page
            },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            console.log(res.data);
            const data = res.data.docs.map(b => b.title);
            setResults(prevResults => [...new Set([...prevResults, ...data])]);
            setHasMore(data.length > 0);
        }).catch(e => {
            /* TODO: Understand how is this cancelToken concept different from debouncing? */
            if(axios.isCancel(e)){
                return;
            }
            setError(true)
        }).finally(() => {
            setLoading(false);
        })
    });

    return {loading, error, results, hasMore};
}