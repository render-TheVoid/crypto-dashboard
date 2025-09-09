import React, { useContext, useEffect, useState } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../../context/CoinContext';

const Coin = () => {

    const { coinId } = useParams();
    const [coin, setCoin] = useState();
    const { currency } = useContext(CoinContext);
    const [HistoricalData, setHistoricalData] = useState();

    const fetchCoinData = async () => {
        const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': `${import.meta.env.VITE_API_KEY}` }
        };

        fetch(url, options)
            .then(res => res.json())
            .then(json => setCoin(json))
            .catch(err => console.error(err));
    };

    const fetchHistoricalData = async () => {
        const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`;
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': `${import.meta.env.VITE_API_KEY}` }
        };

        fetch(url, options)
            .then(res => res.json())
            .then(json => setHistoricalData(json))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchCoinData();
    }, [currency]);

    if (coin) {
        return (
            <div className='overallCont'>
                <div className="coinCont">
                    <img src={coin.image.large} alt="" />
                    <h1>{coin.name} ({coin.symbol.toUpperCase()})</h1>
                </div>
                <div className='data'>
                    <ul>
                        <li>Crypto Market Rank</li>
                        <li>{coin.market_cap_rank}</li>
                    </ul>
                    <ul>
                        <li>Current Price</li>
                        <li>{currency.symbol}{coin.market_data.current_price[currency.name].toLocaleString()}</li>
                    </ul>
                    <ul>
                        <li>Market Cap</li>
                        <li>{currency.symbol}{coin.market_data.market_cap[currency.name].toLocaleString()}</li>
                    </ul>
                    <ul>
                        <li>24h High</li>
                        <li>{currency.symbol}{coin.market_data.high_24h[currency.name].toLocaleString()}</li>
                    </ul>
                    <ul>
                        <li>24h Low</li>
                        <li>{currency.symbol}{coin.market_data.low_24h[currency.name].toLocaleString()}</li>
                    </ul>
                </div>
            </div>
        );
    } else {
        return (<h1 className='loader'>Please, Wait!</h1>)
    }
}

export default Coin;
