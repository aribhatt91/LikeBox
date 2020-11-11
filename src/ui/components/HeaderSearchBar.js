import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import Nav from 'react-bootstrap/Nav';
import { searchSuggestion } from './../../service/searchSuggestions';

function handleSearch(e){
    e.preventDefault();
    console.log('search term ->', e.target.value);
}
function _keyPress(e){
  if(e.key === 'Enter'){

  }
  searchSuggestion(e.target.value);
}
function SearchInput(props){
    const [searchExpand, setExpandSearch] = useState(false);
    
    return (
      <div className="suggested_search_bar">
        <div className={"search_input_container" + (searchExpand ? ' expanded' : '')}>
          <span className="close_icon" onClick={()=>{setExpandSearch(false)}}>&times;</span>
          <input type="text" placeholder="Search..." className='themed_text_input search_input' onKeyPress={_keyPress}></input>
          <Nav.Link onClick={searchExpand ? handleSearch : (() => {setExpandSearch(true)})} className="search_icon">
            <FontAwesomeIcon icon={faSearch}/>
          </Nav.Link>
        </div>
      </div>
      
    )
}

export default SearchInput;