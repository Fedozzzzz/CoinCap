import React from "react"

let url_trades="wss://ws.coincap.io/trades/binance";
let url_prices = "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin";
let url_prices_ALL = "wss://ws.coincap.io/prices?assets=ALL";

class Socket extends React.Component {

    state = {
        timestamp: null
    };

    componentDidMount() {
        const tradeWs = new WebSocket(url_prices_ALL);
        tradeWs.addEventListener("message", ev => {
            console.log(JSON.parse(ev.data));
        });
        this.setState({timestamp: ""});
    }

    render() {
        // console.log(this.state);
        return (
            <div className="App">
                <p className="App-intro">
                    This is the timer value: {this.state.timestamp}
                </p>
            </div>
        );
    }
}

export default Socket;