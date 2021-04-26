import React, { useState, useEffect } from 'react';
import AppDropdown from './AppDropdown';
import { debounce } from 'lodash';

export function Tag({item, onClick, selected=false}) {
    return (
        <span className={"selectable-tag" + (selected ? " selected" : "")} aria-selected={selected} onClick={debounce(() => onClick(item), 400)}>
            <span className="tag-name">{item.label}</span>
        </span>
    )
}

const SingleSelectDropdown = ({label, items=[], onSelect}) => {
    const [selected, setSelected] = useState('');
    
    const handleSelect = (item) => {
        setSelected(item.val);
        if(typeof onSelect === 'function'){
            onSelect(item.val);
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
                        selected={item.val === selected}
                    />
                )
            }
        </AppDropdown>
    )
}

export default SingleSelectDropdown;

