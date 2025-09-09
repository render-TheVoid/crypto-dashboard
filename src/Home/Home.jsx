import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import { CoinContext } from '../context/CoinContext';
import { Link } from 'react-router-dom';

const Home = () => {

    const {allCoins, currency} = useContext(CoinContext);
    const [displayCoin, setDisplayCoin] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        setDisplayCoin(allCoins);
    }, [allCoins]);

    const inputHandler = (e) => {
        setInput(e.target.value);
    }; 

    const searchHandler = async (e) => {
        e.preventDefault();
        const coins = await allCoins.filter((item) => {
            return item.name.toLowerCase().includes(input.toLowerCase());
        });
        setDisplayCoin(coins);
    };
    
    return (
        <div className='container'>
            <div className="second">
                <h1 className='center'>Track the Market<br></br> Anytime</h1>
                <p className='center'>From Bitcoin to emerging altcoins, access real-time market data in a responsive, elegant dashboard. Designed to keep you informed and ahead of the curve.</p>
                <form className='search' onSubmit={searchHandler}>
                    <input type="text" onChange={inputHandler} placeholder='Find your crypto' required/>
                    <button>Search</button>
                </form>
                <div className="table">
                    <div className="layout">
                        <p>#</p>
                        <p>Coins</p>
                        <p>Price</p>
                        <p>24h Change</p>
                        <p className='market-cap'>Market Cap</p>
                    </div>
                    {
                        displayCoin.slice(0, 10).map((item, index) => (
                            <Link to={`/coin/${item.id}`} className="layout" key={index}>
                                <p>{item.market_cap_rank}</p>
                                <div className='image-name'>
                                    <img src={item.image} className='image'/>
                                    <p className='align-left'>{item.name+" - "+item.symbol}</p>
                                </div>
                                <p>{currency.symbol}{item.current_price.toLocaleString()}</p>
                                <p className={item.price_change_percentage_24h>0?"green":"red"}>{Math.floor(item.price_change_percentage_24h*100)/100+"%"}</p>
                                <p className='market-cap'>{currency.symbol}{item.market_cap.toLocaleString()}</p>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;
