import React from "react"
import getData from "../functions/getData";


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
        // let tempSize=this.state.size+
        this.setState({size: this.state.size + 50});
        getData(this.state.size).then(res => {
                // console.log(res);
                let tempMap = new Map();
                res.data.forEach((el => {
                        // console.log(el);
                        let tempObj = {};
                        tempObj.rank = el.rank;
                        tempObj.priceUsd = el.priceUsd;
                        tempObj.marketCapUsd = el.marketCapUsd;
                        tempObj.vwap24Hr = el.vwap24Hr;
                        tempObj.name = el.name;
                        tempMap.set(el.id, tempObj);
                    }
                ));

                // let tempArr = [];
                // // let i=0;
                // let size = res.data.length;
                // // console.log(size);
                // // console.log(res.data[0].id);
                // for (let i = 0; i < size; i++) {
                //     let tempObj = {};
                //     tempObj.id = res.data[i].id;
                //     tempObj.rank = res.data[i].rank;
                //     tempObj[tempObj.id] = res.data[i].priceUsd;
                //     tempObj.priceUsd = res.data[i].priceUsd;
                //     tempObj.marketCapUsd = res.data[i].marketCapUsd;
                //     tempObj.vwap24Hr = res.data[i].vwap24Hr;
                //     tempObj.name = res.data[i].name;
                //     // console.log(tempObj);
                //     tempArr.push(tempObj);
                // }
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

            // let tempMap=new Map(JSON.parse(ev.data));
            let tempObj = JSON.parse(ev.data);
            // console.log(tempObj);
            let tempMap = this.state.tempData;
            // console.log("tempMap: ", tempMap);
            // console.log(ev.json());
            for (let el in tempObj) {
                if (tempMap.get(el)) {
                    let temp = tempMap.get(el);
                    temp.priceUsd = tempObj[el];
                    tempMap.set(el, temp);
                }
                // console.log(el.toString());
                // console.log(tempMap[el]);
                // console.log(tempMap[el.toString()]);
                // tempMap[el.toString()].priceUsd = tempObj[el];
            }
            this.setState({tempData: tempMap})
        });

        // tradeWs.stop();
        // this.setState(el);
        // });
        // this.setState(this.state.timestamp.map(el=>this.state[el]));
        // tradeWs.addEventListener("message", ev => console.log({timestamp: ev.data}));
    }

    static formatUsd(el) {
        // console.log(el);
        return new Intl.NumberFormat("en-US",
            {
                style: "currency", currency: "USD",
                minimumFractionDigits: 2
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
        console.log("render");
        console.log(this.state.tempData);
        return (
            <div>
                <div className="container">
                    <div className="app-table" tabIndex={0}>
                        <table cellPadding={10}>
                            <thead>
                            <tr>
                                <th className="app-table__rank">Rank</th>
                                <th className="app-table__name">Name</th>
                                <th className="app-table__fields">Price</th>
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