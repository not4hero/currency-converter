import React from 'react';
import { Section } from './Section';
import './index.scss';

function App() {
  // const [rates, setRates] = React.useState({})
  const ratesRef = React.useRef({})

  const [fromCurrency, setFromCurrency] = React.useState('RUB')
  const [toCurrency, setToCurrency] = React.useState('USD')

  const [fromPrice, setFromPrice] = React.useState(0)
  const [toPrice, setToPrice] = React.useState(0)



  React.useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
      .then( res => res.json() )
      .then( json => {
        ratesRef.current = json.rates
        console.log(json.rates)
      })
      .catch( err => {
        console.warn(err);
        alert('Не удалось получить данные')
      })
      
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency]
    const result = price * ratesRef.current[toCurrency]
    setFromPrice(value);
    setToPrice(parseFloat(result.toFixed(3)))
  }

  const onChangeToPrice = (value) => {
    const result = value * (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency])
    setFromPrice(parseFloat(result.toFixed(3)));
    setToPrice(value); 
  }

  React.useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [fromCurrency])

  React.useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [toCurrency])


  const onChangeFromCurrency = (currency) => {
    setFromCurrency(currency);
    onChangeFromPrice(fromPrice);
  }

  return (
    <div className="App">
      <Section value={fromPrice} currency={fromCurrency} onChangeCurrency={onChangeFromCurrency} onChangeValue={onChangeFromPrice}/>
      <Section value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice}/>
    </div>
  );
}

export default App;
