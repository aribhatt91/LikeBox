import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './../../store/contexts/AuthContext';
import { HEADER_NAV_MENU } from './../../service/constants/header-navs';

export default function HeaderNavigation() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(0);
    const {currentUser} = useContext(AuthContext)

    useEffect(() => {
        if(open){
            document.body.style.height = '100vh';
            document.body.style.overflowY = 'hidden';
        }else {
            document.body.style.height = 'auto';
            document.body.style.overflowY = 'auto';
        }
        
    }, [open])
    useEffect(() => {
        window.addEventListener('click', (e) => {
            if(open){
                setOpen(false);
            }
        })
    })
    
    return (
        <div className={"primary-nav-dropdown" + (open ? " open" : "")} onClick={(e) => {e.stopPropagation()}}>
            <a href="#" className={"nav-anchor text-uppercase"} onClick={() => setOpen(!open)}>Categories</a>
            <div className={"nav-dropdown-container"}>
                <div className="nav-dropdown">
                    <div className="nav-dropdown-menu">
                        <ul className="nav-dropdown-menu-list">
                            {
                                Object.keys(HEADER_NAV_MENU).map((item, index) => <li key={index} onClick={() => {setActive(index)}} className={(index === active ? "active" : "")}>{item}</li>)

                            }
                        </ul>
                    </div>
                    <div className="nav-dropdown-items">
                        {
                            Object.keys(HEADER_NAV_MENU).map((item, index) => <ul className={"nav-dropdown-items-list" + (active === index ? "" : " d-none")} key={index}>
                            {
                                ([].concat(HEADER_NAV_MENU[item])).map((obj, i) => <li key={i} className={"nav-dropdown-item"}>
                                    <Link className="nav-dropdown-item-link" to={obj.link} onClick={() => {setOpen(false)}}>
                                        <div className="nav-dropdown-item-box" >
                                            <div className="nav-dropdown-item-title">{obj.name}</div>
                                        </div>
                                    </Link>
                                </li>)
                            }
                            </ul>)
                        }

                    </div>
                </div>
            </div>

        </div>
    )
}
