import React from 'react';

const defaultCurrencies = ['RUB', 'USD', 'EUR', 'GBP'];

export const Section = ({ value, currency, onChangeValue, onChangeCurrency }) => (
  <div className="section">
    <ul className="currencies">
      {defaultCurrencies.map((cur) => (
        <li key={cur}>
          {cur}
        </li>
      ))}
      <li>
        <svg height="50px" viewBox="0 0 50 50" width="50px">
          
        </svg>
      </li>
    </ul>
    <input
      onChange={(e) => onChangeValue(e.target.value)}
      value={value}
      type="number"
      placeholder={0}
    />
  </div>
);
