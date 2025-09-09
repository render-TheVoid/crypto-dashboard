import React, { useContext } from 'react';
import './NavBar.css';
import { CoinContext } from '../../context/CoinContext';
import { Link } from 'react-router-dom';

const NavBar = () => {

    const { setCurrency } = useContext(CoinContext);
    const currencyHandle = (e) => {
        switch (e.target.value) {
            case "usd": {
                setCurrency({ name: "usd", symbol: "$" });
                break;
            } case "inr": {
                setCurrency({ name: "inr", symbol: "₹" });
                break;
            } case "eur": {
                setCurrency({ name: "eur", symbol: "€" });
                break;
            } default: {
                setCurrency({ name: "usd", symbol: "$" });
                break;
            }
        }
    };

    return (
        <div className='navbar'>
            <Link to={'/'}><h1>CryptoVoid</h1></Link>
            <ul>
                <Link to={'/'}><li>Home</li></Link>
                <li>About Us</li>
            </ul>
            <div className="right-nav">
                <select className='options' onChange={currencyHandle}>
                    <option value="usd">USD</option>
                    <option value="inr">INR</option>
                    <option value="eur">EUR</option>
                </select>
                <button className='sign-up'>Sign Up</button>
            </div>
        </div>
    );
};

export default NavBar;
