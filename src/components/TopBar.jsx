import React from 'react';
import './TopBar.css';

function TopBar({ virtualBalance, marketData, positions }) {
  const totalPnL = positions.reduce((sum, pos) => sum + pos.pnl, 0);
  const totalValue = virtualBalance + positions.reduce((sum, pos) => sum + (pos.amount * pos.currentPrice), 0);

  return (
    <div className="top-bar">
      <div className="logo-section">
        <div className="logo">
          <span className="logo-icon">▲</span>
          <span className="logo-text">ATHARVA</span>
          <span className="logo-sub">CAPITAL</span>
        </div>
        <div className="tagline">by Atharva Darshanwar</div>
      </div>
      
      <div className="market-summary">
        <div className="market-item">
          <span className="market-symbol">BTC</span>
          <span className="market-price">
            ${marketData?.BTCUSDT?.price?.toLocaleString() || '—'}
          </span>
          <span className={`market-change ${marketData?.BTCUSDT?.change24h >= 0 ? 'positive' : 'negative'}`}>
            {marketData?.BTCUSDT?.change24h?.toFixed(2) || '0'}%
          </span>
        </div>
        <div className="market-item">
          <span className="market-symbol">ETH</span>
          <span className="market-price">
            ${marketData?.ETHUSDT?.price?.toLocaleString() || '—'}
          </span>
          <span className={`market-change ${marketData?.ETHUSDT?.change24h >= 0 ? 'positive' : 'negative'}`}>
            {marketData?.ETHUSDT?.change24h?.toFixed(2) || '0'}%
          </span>
        </div>
      </div>
      
      <div className="portfolio-summary">
        <div className="portfolio-item">
          <span className="portfolio-label">TOTAL VALUE</span>
          <span className="portfolio-value">${totalValue.toLocaleString()}</span>
        </div>
        <div className="portfolio-item">
          <span className="portfolio-label">AVAILABLE</span>
          <span className="portfolio-value">${virtualBalance.toLocaleString()}</span>
        </div>
        <div className={`portfolio-item ${totalPnL >= 0 ? 'positive' : 'negative'}`}>
          <span className="portfolio-label">TOTAL P&L</span>
          <span className="portfolio-value">{totalPnL >= 0 ? '+' : ''}{totalPnL.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="user-profile">
        <div className="avatar">AD</div>
        <span className="username">Atharva</span>
      </div>
    </div>
  );
}

export default TopBar;
