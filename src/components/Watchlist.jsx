import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Watchlist.css';

const COINS = [
  { symbol: 'BTCUSDT', name: 'Bitcoin' },
  { symbol: 'ETHUSDT', name: 'Ethereum' },
  { symbol: 'SOLUSDT', name: 'Solana' },
  { symbol: 'BNBUSDT', name: 'Binance Coin' },
  { symbol: 'XRPUSDT', name: 'Ripple' },
  { symbol: 'DOGEUSDT', name: 'Dogecoin' },
  { symbol: 'ADAUSDT', name: 'Cardano' },
  { symbol: 'AVAXUSDT', name: 'Avalanche' },
  { symbol: 'DOTUSDT', name: 'Polkadot' },
  { symbol: 'LINKUSDT', name: 'Chainlink' },
  { symbol: 'MATICUSDT', name: 'Polygon' },
  { symbol: 'UNIUSDT', name: 'Uniswap' },
];

function Watchlist({ onSelectCoin, selectedCoin, setMarketData }) {
  const [prices, setPrices] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr');
        const data = response.data;
        const priceMap = {};
        COINS.forEach(coin => {
          const coinData = data.find(d => d.symbol === coin.symbol);
          if (coinData) {
            priceMap[coin.symbol] = {
              price: parseFloat(coinData.lastPrice),
              change24h: parseFloat(coinData.priceChangePercent),
              high: parseFloat(coinData.highPrice),
              low: parseFloat(coinData.lowPrice),
              volume: parseFloat(coinData.volume),
            };
          }
        });
        setPrices(priceMap);
        setMarketData(prev => ({ ...prev, ...priceMap }));
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, [setMarketData]);

  const filteredCoins = COINS.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="watchlist">
      <div className="watchlist-header">
        <h3>MARKETS</h3>
        <input
          type="text"
          className="search-box"
          placeholder="Search coins..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="watchlist-items">
        {filteredCoins.map(coin => {
          const data = prices[coin.symbol];
          return (
            <div
              key={coin.symbol}
              className={`watchlist-item ${selectedCoin === coin.symbol ? 'active' : ''}`}
              onClick={() => onSelectCoin(coin.symbol)}
            >
              <div className="coin-info">
                <span className="coin-symbol">{coin.symbol.replace('USDT', '')}</span>
                <span className="coin-name">{coin.name}</span>
              </div>
              <div className="coin-price">
                <span className="price">
                  ${data?.price?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '—'}
                </span>
                <span className={`change ${data?.change24h >= 0 ? 'positive' : 'negative'}`}>
                  {data?.change24h >= 0 ? '+' : ''}{data?.change24h?.toFixed(2) || '0'}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="watchlist-footer">
        <span className="powered-by">Powered by Binance</span>
        <span className="dev-signature">Atharva Darshanwar</span>
      </div>
    </div>
  );
}

export default Watchlist;
