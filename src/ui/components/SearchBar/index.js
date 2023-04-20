import React, {useState, useEffect } from 'react';
import { fetchSuggestions, updateSearchHistory, fetchSearchHistory } from '../../../libs/SearchService';
import { Link } from 'react-router-dom';
import SearchIcon from '../_svg-components/SearchIcon';
import './style.component.css';
import { debounce } from 'lodash';
import CloseIcon from '../_svg-components/CloseIcon';

const SearchItem = ({item}) => {
  const type = item.type,
  brand = item.brand,
  product = item.product,
  category = item.category;
  let link = "";

  if(type === 'brand') {
    link = 'products/all?brand=' + brand;
  }
  if(type === 'product') {
    link = 'products/' + category + '?category=' + product;
  }
  if(type === 'category') {
    link = '/products/' + category;
  }

  return(
    <Link to={link}>
      {type === 'brand' && <span>Brand: <span className="text-uppercase"><strong>{brand}</strong> </span> </span>}
      {(type === 'product' || type === 'category') && <span><span className="text-uppercase">{category}</span>'s <span className="font-weight-bold">{product + 's'}</span></span>}
    </Link>
  )
}
/* 
  {
    type: 0 //SEARCH HISTORY,
    
  },
  {
    type: 1,//CATEGORY
    category: 'Hoodies'
  },
  {
    type: 2,//PRODUCT
    product: Product
  }
*/
/*  */
const SearchBar = ({cacheLimit, maxResults, showCloseButton, closeOnEscape}) => {
    const [expand, setExpand] = useState(false),
    [showSuggestions, setShowSuggestions] = useState(false),
    [loadingSuggestions, setLoadingSuggestions] = useState(false),
    [suggestions, setSuggestions] = useState([]);
    let search_term = "";

    useEffect(() => {
      window.loginfo('Exec once');
      window.addEventListener('click', () => {setShowSuggestions(false)});
      window.addEventListener('keydown', onEscape);
      return () => window.removeEventListener('keydown', onEscape);
    }, [])

    const searchSuggestions = async (query) => {
      console.log(query);
      /* window.loginfo('Fetching data...', search_term.trim());
      let s = [];

      const res = await fetchSuggestions(search_term.trim());
      (res || []).forEach((item, index) => {
        s.push(
          <li key={index} onClick={(e) => {
            e.stopPropagation();
            //search_term = e.target.innerHTML; 
            //_search();
          }}>
            <SearchItem
              item={item}
            />
          </li>
        )
      })
      setSuggestions(s);
      setShowSuggestions(true); */
    },
    getSuggestionsList = () => {

    },
    onEscape = (e) => {
      if(expand){
        console.log('onEscape');
        const code = (e.keyCode ? e.keyCode : e.which); 
        if(code === 27) {
          setExpand(false);
        }
      }
    },
    onEnter = (e) => {},
    onKeyPress = (e) => {
      /* const code = (e.keyCode ? e.keyCode : e.which); 
      if(code === 13) {
        onEnter();
      } */
      optimisedSearch(e.target.value)
    },
    getSearchItem = (obj) => {

    }

    const optimisedSearch = debounce(searchSuggestions, 400);

    return (
      <div className='app-search'>
        <a onClick={() => setExpand(true)} href="#" className="app-search__icon">
          <SearchIcon size={24} />
        </a>
        {expand && <div className={"app-search__screen py-5"}>
          <div className="app-search__screen--container container">
            <div className="row w-100 d-flex flex-column align-items-center">
              <div className="app-search__box col-12 col-md-10 col-lg-6 mx-auto">
                <input type="text" className="app-search__input" onKeyUp={onKeyPress} />
                <span className='app-search__action'>
                  <SearchIcon size={24} />
                </span>
              </div>
              <div className="app-search__suggestions col-12 col-md-10 col-lg-6 mx-auto">
                {suggestions && suggestions.length > 0 && <ul className="app-search__suggestions--list">

                </ul>}
              </div>
            </div>
          </div>
          <span className="app-search__close" onClick={() => setExpand(false)}>
            <CloseIcon size={24}/>
          </span>
        </div>}
      </div>
    )
}

export default SearchBar;