import NavbarComponent from '../../navigation/NavigationComponent'
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';

function DyDxComponent() {
    const [markets, setMarkets] = useState([])
    const connect = async () => {
        axios.get("http://localhost:8001/api/markets")
            .then(function (response) {
                setMarkets(response.data)
            })
    }
    connect()
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
                        { markets.map((item: any) => (
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
