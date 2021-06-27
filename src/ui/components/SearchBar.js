import React, {useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { fetchSuggestions, saveSeachHistory, fetchSearchHistory } from '../../service/search';
import { _debounce } from '../../service/helper';
import { Link } from 'react-router-dom';
import SearchIcon from './svg-components/SearchIcon';

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

const SearchBar = (props) => {
    const [searchExpand, setExpandSearch] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    let search_term = "";
    useEffect(() => {
      window.mlog('Exec once');
      window.addEventListener('click', () => {setShowSuggestions(false)})
    }, [])
    const searchSuggestions = () => {
      window.mlog('Fetching data...', search_term.trim());
      //setSuggestions([]);
      fetchSuggestions(search_term.trim())
      .then(res => {
        window.mlog(res);
        let s = [];
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
        setShowSuggestions(true)
      });
    },
    _keyPress = (e) => {
      var code = (e.keyCode ? e.keyCode : e.which); 
      if(code === 13) {
        search_term = e.target.value;
        _search();
      }else {
        optimisedSearch();
      }
    },
    _change = (e) => {
      search_term = e.target.value.trim();
      if(search_term === ""){
        setShowSuggestions(false);
      }
    },
    _search = () => {
      window.mlog('Searching for ', search_term.trim());
      setShowSuggestions(false);
      if(search_term.trim() !== ""){
        //window.mlog('Searching for ', search_term);
      }
    }
    const optimisedSearch = _debounce(searchSuggestions, 400);
    return (
      <div className="suggested_search_bar" onClick={(e) => {e.stopPropagation()}}>
        <div className={"search_input_container" + (searchExpand ? ' expanded' : '')}>
          <span className="close_icon" onClick={()=>{setExpandSearch(false)}}>&times;</span>
          <input type="text" placeholder="Search..." className='themed_text_input search_input' onChange={_change} onKeyPress={_keyPress}></input>
          <Nav.Link onClick={searchExpand ? _search : (() => {setExpandSearch(true)})} className="search_icon">
            <SearchIcon />
          </Nav.Link>
        </div>
        {showSuggestions && <div className={"search_suggestions"}>
          <ul>
            {
              suggestions
            }
          </ul>
        </div>}
      </div>
      
    )
}

export default SearchBar;