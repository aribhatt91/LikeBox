import React, { useState } from 'react';

function Tag({item, _click, cancelable, selected, _cancel, index}) {
    const [_selected, setSelected] = useState(selected ? selected === true : false);
    const [show, setShow] = useState(true);
    const name = item,
    toggle = (e) => {
        e.preventDefault();
        let val = !_selected;
        setSelected(val); 
        if(typeof _click === 'function'){
            _click(name, val);
        }
    }

    return (
            <span key={index} className={"selectable_tag" + (_selected ? " selected" : "") + (show ? "" : " d-none") + (cancelable ? " cancelable" : "")} onClick={toggle}>
            <span className="tag_name">{name}</span>
            {cancelable && <span className="tag_cancel" onClick={() => {
                setShow(false);
                if(_cancel){
                    _cancel(name);
                }
            }}>&times;</span>}
        </span>
    )
}

/* 
items - array of objects
{name, [selected]}
handler - function that takes updated array of items as argument
*/
//TODO - Implement All option
const MultiSelectTag = ({label, items, handler}) => {
    const [selectAll, setSelectAll] = useState(true);
    
    // Initiate result object
    let result = {}, list_items = [];
    (items || []).forEach((item, index) => {
        result[item] = false;
    })
    const _handleSelect = (name, value) => {
        console.log(name, value);
        let selected_any = false, selected_all = true;
        result[name] = value;
        (Object.keys(result) || []).forEach((item, index) => {
            if(result[item]){
                selected_any = true;
            }else {
                selected_all = false;
            }
        })
        //setSelectAll((!selected_any || selected_all));
        console.log(result, !selected_any, selected_all);
        if(typeof handler === 'function'){
            handler(label, result);
        }
    },
    _selectAll = () => {
        (Object.keys(result) || []).forEach((item, index) => {
            result[item] = true;
        })
        setSelectAll(true);
        console.log(result);
        if(typeof handler === 'function'){
            handler(label, result);
        }
    }
    
    items.forEach((item, index) => {
        list_items.push(
            <Tag
                item={item}
                // selected={!selectAll}
                _click={_handleSelect}
                index={index}
            ></Tag>
        )
    })

    return (
        <div className="d-inline-block multiselect_tags_container">
            <div className="d-block d-md-inline-block tags_label">{label}</div>
            <div className="tags_container d-inline-block">
                {/* <Tag
                    item="All"
                    selected={selectAll}
                    _click={_selectAll}
                ></Tag> */}
                {list_items}
            </div>
        </div>
    )
}

export default MultiSelectTag;

