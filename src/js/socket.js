let WebSocket = require('ws');

let url_trades="wss://ws.coincap.io/trades/binance";
let url_prices = "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin";
let url_prices_ALL = "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin";

const tradeWs =new WebSocket(url_prices_ALL);

console.log(tradeWs.addEventListener("message", ev => console.log("server: ", ev.data)));
