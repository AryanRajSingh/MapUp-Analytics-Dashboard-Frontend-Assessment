// src/components/StatisticsCard.js
import React from 'react';
import '../styles/StatisticsCard.css';

const StatisticsCard = ({ title, value }) => {
  return (
    <div className="stats-card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default StatisticsCard;
