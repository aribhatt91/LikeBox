import React, { useState, useEffect } from 'react';
import AppDropdown from '../AppDropdown';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import './style.component.css';

export function Tag({item, onClick, selected=false}) {
    return (
        <span className={"app-tag" + (selected ? " app-tag--selected" : "")} aria-selected={selected} onClick={debounce(() => onClick(item), 400)}>
            <span className="app-tag__name">{item.label}</span>
        </span>
    )
}

const AppSelectDropdown = ({label, name, items=[], onSelect, multiSelect=false}) => {

    const [selected, setSelected] = useState(multiSelect ? [] : '');
    
    const handleSelectOne = (item) => {
        setSelected(item.val);
        if(typeof onSelect === 'function'){
            onSelect(name, item.val);
        }
    }

    const handleSelectMany = (item) => {
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
                        onClick={multiSelect ? handleSelectMany : handleSelectOne}
                        selected={multiSelect ? (selected || []).indexOf(item.val) > -1 : item.val === selected}
                    />
                )
            }
        </AppDropdown>
    )
}

AppSelectDropdown.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    items: PropTypes.array,
    onSelect: PropTypes.func,
    multiSelect: PropTypes.bool
}

export default AppSelectDropdown;

