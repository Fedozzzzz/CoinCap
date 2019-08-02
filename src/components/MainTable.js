import React from "react"
import getData from "../functions/getData";

class MainTable extends React.Component {

    state = {
        tempData: undefined,
        isLoaded: false
    };

    setData() {
        getData().then(res => {
                this.setState({
                    tempData: res,
                    isLoaded: true
                });
            }
        );
    }

    componentDidMount() {
        this.setData();
    }

    static formatUsd(el) {
        return new Intl.NumberFormat("en-US",
            {
                style: "currency", currency: "USD",
                minimumFractionDigits: 2
            }).format(el);
    }

    render() {
        return (
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
                            {this.state.isLoaded ? this.state.tempData.data.map(el => (
                                <tr key={el.rank}>
                                    <td className="app-table__rank">{el.rank}</td>
                                    <td className="app-table__name">{el.name}</td>
                                    <td className="app-table__fields">{MainTable.formatUsd(el.priceUsd)}</td>
                                    <td className="app-table__fields">{MainTable.formatUsd(el.marketCapUsd)}</td>
                                    <td className="app-table__fields">{MainTable.formatUsd(el.vwap24Hr)}</td>
                                </tr>)
                            ) : <div>loading...</div>}
                            </tbody>
                        </div>
                    </table>
                </div>
            </div>
        );
    }
}

export default MainTable;