import { useEffect, useState } from 'react'

import './App.css';

function App() {
  const [amount, setamount] = useState(1);
  const [fromCurrency,setfromCurrency] = useState("USD");
  const [toCurrency,settoCurrency] = useState("INR");
  const [convertedAmount,setconvertedAmount] = useState(null);
  const [exchangeRate, setexchangeRate] = useState(null);



  useEffect(() => {
    const getExchangeRate = async() => {
      try{

    let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency} `;

    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    setexchangeRate(data.rates[toCurrency])


      }catch(error) {
        console.error("Error fetching exchange rate :", error);

      }
    }
    getExchangeRate();
  },[fromCurrency , toCurrency]);

  useEffect(() => {
    if(exchangeRate !== null) {
      setconvertedAmount((amount * exchangeRate).toFixed(2))
    }
  })

  const  handleAmountChange = (e) => {
      const value = parseFloat(e.target.value);
      setamount(isNaN(value) ? 0 : value); 
  }

  const handleFromCurrency = (e) => {
    setfromCurrency(e.target.value)
  }

  const handleToCurrency = (e) => {
    settoCurrency(e.target.value)
  }




  return (
    <>
      <div className='currency-converter'>
        <div className='box'></div>
        <div className='data'>
          <h1>Currency Converter </h1>
          <div className='input-container'>
            <label htmlFor='amt'>Amount :</label>
            <input type='number' id='amt' value={amount}
            onChange={handleAmountChange} />

          </div>
          <div className='input-container'>
            <label htmlFor='fromCurrency'>From Currency :</label>
            <select id='fromCurrency' value={fromCurrency} onChange={handleFromCurrency}>
              <option value='USD'>USD-United States Dollar</option>
              <option value='EUR'>EUR-Euro</option>
              <option value='GBP'>GBP-British Pound Sterling</option>
              <option value='JPY'>JPY-Japanese Yen</option>
              <option value='AUD'>AUD-Austrailan Dollar</option>
              <option value='CAD'>CAD-Canadian Dollar</option>
              <option value='CNY'>CNY-Chinese Yuan</option>
              <option value='INR'>INR-Indian Rupee</option>
              <option value='BRL'>BRL-Brazilian Real</option>
              <option value='ZAR'>ZAR-South African Rand</option>
            </select>

          </div>
          <div className='input-container'>
            <label htmlFor='toCurrency'>To Currency :</label>
            <select id='toCurrency' value={toCurrency} onChange={handleToCurrency}>
              <option value='USD'>USD-United States Dollar</option>
              <option value='EUR'>EUR-Euro</option>
              <option value='GBP'>GBP-British Pound Sterling</option>
              <option value='JPY'>JPY-Japanese Yen</option>
              <option value='AUD'>AUD-Austrailan Dollar</option>
              <option value='CAD'>CAD-Canadian Dollar</option>
              <option value='CNY'>CNY-Chinese Yuan</option>
              <option value='INR'>INR-Indian Rupee</option>
              <option value='BRL'>BRL-Brazilian Real</option>
              <option value='ZAR'>ZAR-South African Rand</option>
            </select>

          </div>

           <div className='result'>
            <p>
            {amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}
            </p>
           </div>
        </div>
      </div>
    </>
  )
}

export default App;
