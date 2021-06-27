import React, { useState, useEffect, useContext } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { HEADER_NAV_MENU } from './../../service/constants/header-navs';
import AppButton from './generic/AppButton';
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
                if(index === 0){
                    return <div key={index} 
                        className={"primary-nav-dropdown" + (open && (active === index) ? " open" : "")} 
                        aria-expanded={open && (active === index)} 
                        onClick={(e) => {e.stopPropagation()}}>
                        <a href="#" className={"nav-anchor text-uppercase"} onClick={(e) => openTab(index)}>{item}</a>
                        <div className={"nav-dropdown-container" + (open ? ' slide-down': '')}>
                        
                            <div className="nav-dropdown">
                                
                                <div className="nav-dropdown-items flex-column">
                                    <h4 className="pl-3 pr-3">Tops</h4>
                                    
                                    <ul className={"nav-dropdown-items-list list-group"}>
                                    {
                                        ([].concat(HEADER_NAV_MENU[item])).filter(obj => obj.top === true).map((obj, i) => <li key={i} className={"nav-dropdown-item d-list-item list-group-item border-0"}>
                                            <Link className="nav-dropdown-item-link" to={obj.link} onClick={() => {setOpen(false)}}>
                                                <div className="nav-dropdown-item-box" >
                                                    <div className="nav-dropdown-item-title">{obj.name}</div>
                                                </div>
                                            </Link>
                                        </li>)
                                    }
                                    </ul>
                                    
                                </div>

                                <div className="nav-dropdown-items flex-column">
                                    <h4 className="pl-3 pr-3">Bottoms</h4>
                                    
                                    <ul className={"nav-dropdown-items-list list-group"}>
                                    {
                                        ([].concat(HEADER_NAV_MENU[item])).filter(obj => obj.top !== true).map((obj, i) => <li key={i} className={"nav-dropdown-item d-list-item list-group-item border-0"}>
                                            <Link className="nav-dropdown-item-link" to={obj.link} onClick={() => {setOpen(false)}}>
                                                <div className="nav-dropdown-item-box" >
                                                    <div className="nav-dropdown-item-title">{obj.name}</div>
                                                </div>
                                            </Link>
                                        </li>)
                                    }
                                    </ul>
                                    
                                </div>
                                <div className="nav-dropdown-items flex-column">
                                    <h4 className="pl-4 pr-4 mb-4">Regularly update your style on the LikeBox</h4>
                                    <div className="static-cards">
                                        <div className="card-stack">
                                            <div className="card-stack-item">
                                                <div className="card-thumb">
                                                    <LazyLoadImage effect="opacity" src="https://firebasestorage.googleapis.com/v0/b/webapp-470b3.appspot.com/o/Trendy.jpg?alt=media&token=1dcfe99e-2a13-4587-9ac2-d2a153b520dd" alt="" />
                                                </div>
                                                <div className="card-title">
                                                    Trendy
                                                </div>
                                            </div>
                                            <div className="card-stack-item">
                                                <div className="card-thumb">
                                                    <LazyLoadImage effect="opacity" src="https://firebasestorage.googleapis.com/v0/b/webapp-470b3.appspot.com/o/Classic.jpg?alt=media&token=2ca68b58-bc4f-40e9-b6f7-a1f0f786f207" alt="" />
                                                </div>
                                                <div className="card-title">
                                                    Classic
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-4" onClick={() => {setOpen(false)}}>
                                        <AppButton href="/your-style" className="w-100 md" label="Update style" />
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        {
                            open && <span className="nav-background" onClick={() => setOpen(false)}></span>
                        }

                    </div>
                }else{
                    return <div key={index} 
                    className={"primary-nav-dropdown" + (open && (active === index) ? " open" : "")} 
                    aria-expanded={open && (active === index)} 
                    onClick={(e) => {e.stopPropagation()}}>
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
                }
            })
            
            
            }
        </div>
    )
}
