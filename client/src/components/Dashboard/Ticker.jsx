import { useEffect, useRef } from 'react';

const Ticker = () => {
    const container = useRef();

    useEffect(
        () => {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
      {
        "symbols": [
          {
            "proName": "FOREXCOM:SPXUSD",
            "title": "S&P 500 Index"
          },
          {
            "proName": "BITSTAMP:BTCUSD",
            "title": "Bitcoin"
          },
          {
            "proName": "BITSTAMP:ETHUSD",
            "title": "Ethereum"
          },
          {
            "description": "Solana",
            "proName": "BINANCE:SOLUSDT"
          },
          {
            "description": "XRP",
            "proName": "BINANCE:XRPUSDT"
          }
        ],
        "showSymbolLogo": true,
        "isTransparent": false,
        "displayMode": "adaptive",
        "colorTheme": "dark",
        "locale": "en"
      }`;

            container.current.innerHTML = '';
            container.current.appendChild(script);
        },
        []
    );

    return (
        <div className="tradingview-widget-container w-full" ref={container}>
            <div className="tradingview-widget-container__widget"></div>
        </div>
    );
}

export default Ticker;
