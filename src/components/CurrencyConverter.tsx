import { useState, useEffect } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.tbcbank.ge/v1/exchange-rates/commercial/",
  headers: { apikey: "I3Rz8QXBVPofKtucsenkW7g2n7aDwqBg" },
});

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [sourceCurrency, setSourceCurrency] = useState("usd");
  const [targetCurrency, setTargetCurrency] = useState("gel");
  const [converted, setConverted] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function convert() {
        setIsLoading(true);
        const res = await axiosInstance.get(
          `convert?amount=${amount}&from=${sourceCurrency}&to=${targetCurrency}`
        );
        const data = await res.data;
        setConverted(data.value);
        setIsLoading(false);
      }

      if (sourceCurrency === targetCurrency) return setConverted(amount);
      convert();
    },
    [amount, sourceCurrency, targetCurrency]
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={sourceCurrency}
        onChange={(e) => setSourceCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GEL">GEL</option>
      </select>
      <select
        value={targetCurrency}
        onChange={(e) => setTargetCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="GEL">GEL</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>
      <p>
        {converted}
        {targetCurrency}
      </p>
    </div>
  );
}
