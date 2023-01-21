import NavbarComponent from '../../navigation/NavigationComponent'
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';
import { DydxClient } from '@dydxprotocol/v3-client';

const DYDX_HOST = 'https://api.stage.dydx.exchange';

function DyDxComponent() {
    const [markets, setMarkets] = useState([])

    const connect = async () => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_accounts' }).then((accounts: any): void => {
                if (accounts.length) {
                    console.log(`You're connected to: ${accounts[0]}`);
                }
            })
        }
    }

    const retrieveMarkets = async () => {
        const client: DydxClient = new DydxClient(
            DYDX_HOST,
            {
                apiTimeout: 3000,
                starkPrivateKey: '01234abcd...',
            },
        );
        if (markets.length <= 0) {
            client.public.getMarkets().then((response) => {
                console.log(response);
                const local_markets: any = [];
                for (var key in response.markets) {
                    local_markets.push(response.markets[key]);
                }
                setMarkets(local_markets)
            })
        }
    }

    useEffect(() => {
        // call api or anything
        console.log("loaded");
        connect()
        retrieveMarkets()
    });

    return (
        <div>
            <NavbarComponent />
            <h4>Markets</h4>
            {markets.length > 0 ?
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Market</th>
                            <th>Base Asset</th>
                            <th>type</th>
                            <th>volume24H</th>
                        </tr>
                    </thead>
                    <tbody>
                        {markets.map((item: any) => (
                            <tr key={item.id}>
                                <td>{item.market}</td>
                                <td>{item.baseAsset}</td>
                                <td>{item.type}</td>
                                <td>{item.volume24H}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table> : "Loading..."}
        </div>
    );
}

export default DyDxComponent;
