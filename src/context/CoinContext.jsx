import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
    const [allCoins, setAllCoins] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    });

    const fetchData = () => {
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`;
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': `${import.meta.env.VITE_API_KEY}` }
        };

        fetch(url, options)
            .then(res => res.json())
            .then(json => setAllCoins(json))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchData();
    }, [currency])


    const contextValue = {
        allCoins,
        currency,
        setCurrency
    };

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    );

}

export default CoinContextProvider;