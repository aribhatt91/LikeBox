import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import Nav from 'react-bootstrap/Nav';

function handleSearch(e){
    e.preventDefault();
    console.log('search term ->', e.target.value);
}
function _keyPress(e){
  if(e.key === 'Enter'){

  }
}
function SearchInput(props){
    const [searchExpand, setExpandSearch] = useState(false)
    return (
      <span className={"search_input_container" + (searchExpand ? ' expanded' : '')}>
        <span className="close_icon" onClick={()=>{setExpandSearch(false)}}>&times;</span>
        <input type="text" placeholder="Search..." className='themed_text_input search_input' onKeyPress={_keyPress}></input>
        <Nav.Link onClick={searchExpand ? handleSearch : (() => {setExpandSearch(true)})} className="search_icon">
          <FontAwesomeIcon icon={faSearch}/>
        </Nav.Link>
      </span>
    )
}

export default SearchInput;