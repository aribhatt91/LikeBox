import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    const menuItems = {
        'Clothes': [
            {
                name: 'Hoodies & Sweatshirts',
                link: '/products/hoodies-sweatshirts',
                img: ''
            },
            {
                name: 'Jackets & Coats',
                link: '/products/jackets-coats',
                img: ''
            },
            {
                name: 'Jeans',
                link: '/products/jeans',
                img: ''
            },
            {
                name: 'Shirts',
                link: '/products/shirts',
                img: ''
            },
            {
                name: 'T-shirts & vests',
                link: '/products/tshirts-vests',
                img: ''
            },
            {
                name: 'T-shirts & vests',
                link: '/products/tshirts-vests',
                img: ''
            }
        ], 
        'Shoes': [
            {
                name: 'Boots',
                link: '/products/boots',
                img: ''
            },
            {
                name: 'Sneakers',
                link: '/products/sneakers',
                img: ''
            },
            {
                name: 'Slippers',
                link: '/products/slippers',
                img: ''
            }
        ], 
        'Accessories': []
    };
    return (
        <div className={"primary-nav-dropdown" + (open ? " open" : "")}>
            <a href="#" className={"nav-anchor"} onClick={() => setOpen(!open)}>Categories</a>
            <div className={"nav-dropdown-container"}>
                <div className="nav-dropdown">
                    <div className="nav-menu">
                        <ul className="nav-menu-list">
                            {
                                Object.keys(menuItems).map((item, index) => <li key={index} onClick={() => setActive(index)} className={(index === active ? "active" : "")}>{item}</li>)

                            }
                        </ul>
                    </div>
                    <div className="nav-items">
                        {
                            Object.keys(menuItems).map((item, index) => <ul className={"nav-items-list" + (active === index ? "" : " d-none")} key={index}>
                            {
                                ([].concat(menuItems[item])).map((obj, i) => <li key={i} className={"nav-item"}>
                                    <Link className="nav-item-link" to={obj.link}>
                                        <div className="nav-item-box" >
                                            <div className="nav-item-title">{obj.name}</div>
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
