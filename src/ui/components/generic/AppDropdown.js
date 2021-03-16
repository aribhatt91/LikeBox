import React from 'react'

export default function AppDropdown() {
    const [open, setOpen] = useState(false);
    return (
        <div className={"d-inline-block select-dropdown multiselect_tags_container" + (open ? " open" : "")}>
            <div className="d-flex d-md-inline-flex select-label tags_label" onClick={toggle}>{label}</div>
            <div className="select-dropdown-items tags_container">
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
