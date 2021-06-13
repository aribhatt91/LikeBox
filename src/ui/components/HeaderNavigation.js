import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { HEADER_NAV_MENU } from './../../service/constants/header-navs';

export default function HeaderNavigation() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(0);

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
            setOpen(false);
        })
    })
    //TODO - Use layout effect to remove the listener

    const openTab = (index) => {
        setActive(index); 
        setOpen(true);
    }
    
    return (
        <div className="desktop-navigation d-flex">
        {
            Object.keys(HEADER_NAV_MENU).map((item, index) => {
                return <div key={index} className={"primary-nav-dropdown" + (open && (active === index) ? " open" : "")} aria-expanded={open && (active === index)} onClick={(e) => {e.stopPropagation()}}>
                    <a href="#" className={"nav-anchor text-uppercase"} onClick={(e) => openTab(index)}>{item}</a>
                    <div className={"nav-dropdown-container" + (open ? ' slide-down': '')}>
                    
                        <div className="nav-dropdown">
                            
                            <div className="nav-dropdown-items">
                                
                                <ul className={"nav-dropdown-items-list"}>
                                {
                                    ([].concat(HEADER_NAV_MENU[item])).map((obj, i) => <li key={i} className={"nav-dropdown-item"}>
                                        <Link className="nav-dropdown-item-link" to={obj.link} onClick={() => {setOpen(false)}}>
                                            <div className="nav-dropdown-item-box" >
                                                <div className="nav-dropdown-item-title">{obj.name}</div>
                                            </div>
                                        </Link>
                                    </li>)
                                }
                                </ul>
                                

                            </div>
                        </div>
                    </div>
                    {
                        open && <span className="nav-background" onClick={() => setOpen(false)}></span>
                    }
                </div>
            })
            
            
            }
        </div>
    )
}
