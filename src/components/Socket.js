import React from "react"
// import {subscribeToTimer} from "../functions/socket";


let url_trades="wss://ws.coincap.io/trades/binance";
let url_prices = "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin";
let url_prices_ALL = "wss://ws.coincap.io/prices?assets=ALL";



class Socket extends React.Component {

    state = {
        timestamp: null
    };

    // constructor(props) {
    //     super(props);
    //     // subscribeToTimer((err, timestamp) => this.setState({
    //     //     timestamp
    //     //         // }));
    // }

    componentDidMount() {
        const tradeWs = new WebSocket(url_prices_ALL);
        // tradeWs.addEventListener("message", ev => this.setState({timestamp: ev.data}));
        // let mp = new Map();
        tradeWs.addEventListener("message", ev => {
            console.log(JSON.parse(ev.data));
        });
        this.setState({timestamp: ""});
    }

    render() {
        console.log(this.state);
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