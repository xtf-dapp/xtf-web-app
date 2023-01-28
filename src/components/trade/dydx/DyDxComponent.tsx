import NavbarComponent from '../../navigation/NavigationComponent'
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';
import { DydxClient } from '@dydxprotocol/v3-client';
import DyDxOrderComponent from './DyDxOrderComponent';

const DYDX_HOST = 'https://api.stage.dydx.exchange';

function DyDxComponent() {
    const [markets, setMarkets] = useState([])

    const retrieveMarkets = async () => {
        const public_client: DydxClient = new DydxClient(
            DYDX_HOST,
            {
                apiTimeout: 3000,
                starkPrivateKey: '01234abcd...',
            },
        );
        if (markets.length <= 0) {
            public_client.public.getMarkets().then((response) => {
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
        retrieveMarkets()
    });

    return (
        <div>
            <NavbarComponent />
            {markets.length > 0 ?
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Market</th>
                            <th>Base Asset</th>
                            <th>type</th>
                            <th>volume24H</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {markets.map((item: any) => (
                            <tr key={item.id}>
                                <td>{item.market}</td>
                                <td>{item.baseAsset}</td>
                                <td>{item.type}</td>
                                <td>{item.volume24H}</td>
                                <td><DyDxOrderComponent market={item.market} /></td>
                            </tr>
                        ))}
                    </tbody>
                </Table> : "Loading..."}
        </div>
    );
}

export default DyDxComponent;
