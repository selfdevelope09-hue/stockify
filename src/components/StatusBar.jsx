import React from 'react';
import './StatusBar.css';

function StatusBar({ orders }) {
  return (
    <div className="status-bar">
      <div className="status-left">
        <span className="status-dot live"></span>
        <span>Binance WebSocket • LIVE DATA</span>
      </div>
      <div className="status-center">
        <span>Last order: {orders.length > 0 ? `${orders[0].coin} at $${orders[0].exitPrice?.toFixed(2)}` : 'No orders yet'}</span>
      </div>
      <div className="status-right">
        <span>ATHARVA CAPITAL v1.0 | by Atharva Darshanwar</span>
      </div>
    </div>
  );
}

export default StatusBar;
