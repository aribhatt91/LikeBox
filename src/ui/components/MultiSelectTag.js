import React, { useState } from 'react';
/* 
items - array of objects
{name, [selected]}
handler - function that takes updated array of items as argument
*/
function Tag({item, _click, cancelable, _cancel}) {
    const [selected, setSelected] = useState(item.selected);
    const [show, setShow] = useState(true);
    const name = item.name;
    return (
            <span key={index} className={"selectable_tag" + (selected ? " selected" : "") + (show ? "" : " d-none") + (cancelable ? " cancelable" : "")} onClick={() => {
                setSelected(!selected); 
                if(typeof _click === 'function'){
                    _click({name, selected});
                    }
                }
            }>
            <span className="tag_name">{item.name}</span>
            {cancelable && <span className="tag_cancel" onClick={() => {
                setShow(false);
                if(_cancel){
                    _cancel(name);
                }
            }}>&times;</span>}
        </span>
    )
}
export default function MultiSelectTag({label, items, handler}) {
    let selected = (items || []).filter((item, index) => {
        return item.selected === true
    });
    
    items.forEach((item, index) => {
        list_items.push(
            <Tag
                item={item}
                _click={(item) => {
                    if(selected.indexOf(item.name) > -1){
                        selected.splice(selected.indexOf(item.name), 1);
                    }else {
                        selected.push(item.name)
                    }
                }}
            ></Tag>
        )
    })

    return (
        <div className="d-inline-block">
            <div className="d-inline-block tags_label">{label}</div>
            <div className="tags_container" onClick={() => {handler(selected)}}>
                {list_items}
            </div>
        </div>
    )
}

