import React from "react"
import getData from "../js/getData";

let url_trades="wss://ws.coincap.io/trades/binance";
let url_prices = "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin";
let url_prices_ALL = "wss://ws.coincap.io/prices?assets=ALL";

class MainTable extends React.Component {

    constructor(props) {
        super(props);
        this.setData = this.setData.bind(this)
    }

    state = {
        tempData: undefined,
        isLoaded: false,
        timestamp: "",
        size: 50
    };

    setData() {
        this.setState({size: this.state.size + 50});
        getData(this.state.size).then(res => {
                let tempMap = new Map();
                res.data.forEach((el => {
                        let tempObj = {};
                        tempObj.rank = el.rank;
                        tempObj.priceUsd = el.priceUsd;
                        tempObj.marketCapUsd = el.marketCapUsd;
                        tempObj.vwap24Hr = el.vwap24Hr;
                        tempObj.name = el.name;
                        tempMap.set(el.id, tempObj);
                    }
                ));
                this.setState({
                    tempData: tempMap,
                    isLoaded: true
                });
            }
        );
    }

    componentDidMount() {
        this.setData();
        const tradeWs = new WebSocket(url_prices_ALL);

        tradeWs.addEventListener("message", ev => {
            let tempObj = JSON.parse(ev.data);
            let tempMap = this.state.tempData;
            for (let el in tempObj) {
                if (tempMap.get(el)) {
                    let temp = tempMap.get(el);
                    temp.priceUsd = tempObj[el];
                    tempMap.set(el, temp);
                }
            }
            this.setState({tempData: tempMap})
        });
    }

    static formatUsd(el) {
        return new Intl.NumberFormat("en-US",
            {
                style: "currency", currency: "USD",
                minimumFractionDigits: (el > 1) ? 2 : 8
            }).format(el);
    }

    renderTable() {
        let table = [];
        this.state.tempData.forEach((value) => {
            table.push(<tr key={value.id}>
                <td className="app-table__rank">{value.rank}</td>
                <td className="app-table__name">{value.name}</td>
                <td className="app-table__fields">{MainTable.formatUsd(value.priceUsd)}</td>
                <td className="app-table__fields">{MainTable.formatUsd(value.marketCapUsd)}</td>
                <td className="app-table__fields">{MainTable.formatUsd(value.vwap24Hr)}</td>
            </tr>)
        });
        return table;
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="app-table" tabIndex={0}>
                        <table cellPadding={10}>
                            <thead>
                            <tr>
                                <th className="app-table__rank">Rank</th>
                                <th className="app-table__name">Name</th>
                                <th className="app-table__rank">Price</th>
                                <th className="app-table__fields">Market Cap</th>
                                <th className="app-table__fields">VWAP (24h)</th>
                            </tr>
                            </thead>
                            <div className="scroll">
                                <tbody>
                                {this.state.isLoaded ? this.renderTable() : <div>loading...</div>}
                                </tbody>
                            </div>
                        </table>
                    </div>
                </div>
                <div className="container">
                    <div className="app-btn">
                        <button className="app-btn__view" onClick={this.setData}>View more</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainTable;