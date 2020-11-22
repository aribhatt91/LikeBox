import React, {useState, useEffect, useReducer} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import Nav from 'react-bootstrap/Nav';
import { fetchSuggestions } from '../../service/search';
import { _debounce } from './../../service/helper';



function SearchInput(props){
    const [searchExpand, setExpandSearch] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    let search_term = "";
    useEffect(() => {
      console.log('Exec once');
      window.addEventListener('click', () => {setShowSuggestions(false)})
    }, [])
    const searchSuggestions = () => {
      console.log('Fetching data...', search_term.trim());
      //setSuggestions([]);
      fetchSuggestions(search_term.trim())
      .then(res => {
        console.log(res);
        let s = [];
        (res || []).forEach((item, index) => {
          s.push(
            <li key={index} onClick={(e) => {
              e.stopPropagation();
              search_term = e.target.innerHTML; 
              _search();
            }}>{item}</li>
          )
        })
        setSuggestions(s);
        setShowSuggestions(true)
      });
    },
    _keyPress = (e) => {
      var code = (e.keyCode ? e.keyCode : e.which); 
      if(code == 13) {
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
      console.log('Searching for ', search_term.trim());
      setShowSuggestions(false);
      if(search_term.trim() !== ""){
        //console.log('Searching for ', search_term);
      }
    }
    const optimisedSearch = _debounce(searchSuggestions, 400);
    return (
      <div className="suggested_search_bar" onClick={(e) => {e.stopPropagation()}}>
        <div className={"search_input_container" + (searchExpand ? ' expanded' : '')}>
          <span className="close_icon" onClick={()=>{setExpandSearch(false)}}>&times;</span>
          <input type="text" placeholder="Search..." className='themed_text_input search_input' onChange={_change} onKeyPress={_keyPress}></input>
          <Nav.Link onClick={searchExpand ? _search : (() => {setExpandSearch(true)})} className="search_icon">
            <FontAwesomeIcon icon={faSearch}/>
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

export default SearchInput;