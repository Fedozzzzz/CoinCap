// let WebSocket = require('ws');
//
// let url_trades="wss://ws.coincap.io/trades/binance";
// let url_prices = "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin";
// let url_prices_ALL = "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin";
//
// const tradeWs =new WebSocket(url_prices_ALL);
//
// tradeWs.addEventListener("message", ev => console.log("server: ", ev.data));
// // tradeWs.onmessage = function (msg) {
// //     console.log(msg.data)
// // };

// import React from "react"
// import openSocket from 'socket.io-client';
let WebSocket = require('ws');

let url_trades="wss://ws.coincap.io/trades/binance";
let url_prices = "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin";
let url_prices_ALL = "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin";

// const socket = openSocket(url_prices_ALL);
//
// function subscribeToTimer(cb) {
//     socket.on('timer', timestamp => cb(null, timestamp));
//     socket.emit('subscribeToTimer', 1000);
// }

const tradeWs =new WebSocket(url_prices_ALL);

console.log(tradeWs.addEventListener("message", ev => console.log("server: ", ev.data)));
// tradeWs.onmessage = function (msg) {
//     console.log(msg.data)
// };
// export { tradeWs.addEventListener("message", ev => console.log("server: ", ev.data));};