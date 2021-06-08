import React, { useState } from 'react';
import AppDropdown from './AppDropdown';
import { Tag } from './SingleSelectDropdown';

/* 
item object definition:
{
    label,
    val
}
*/
const MultiSelectDropdown = ({label, name, items, onSelect}) => {
    const [selected, setSelected] = useState([]);
    
    const handleSelect = (item) => {
        let res = [].concat(selected || []);
        if(res.indexOf(item.val) === -1){
            res.push(item.val);
        }else {
            let index = res.indexOf(item.val);
            res.splice(index, 1);
        }
        setSelected(res);
        if(typeof onSelect === 'function'){
            onSelect(name, res);
        }
    }
    
    

    return (
        <AppDropdown label={label}>
            {
                items.map((item, index) =>
                    <Tag
                        key={index}
                        item={item}
                        onClick={handleSelect}
                        selected={(selected || []).indexOf(item.val) > -1}
                    />
                )
            }
        </AppDropdown>
    )
}

export default MultiSelectDropdown;

