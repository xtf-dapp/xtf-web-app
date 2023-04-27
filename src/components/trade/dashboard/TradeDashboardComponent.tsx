import NavbarComponent from '../../navigation/NavigationComponent'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import MarketComponent from './MarketComponent';
import CandleChartComponent from './CandleChartComponent';
import { CandleResolution, Market } from '@dydxprotocol/v3-client';
import DyDxChartComponent from '../dydx/DyDxChartComponent';
import TradeFormComponent from './TradeFormComponent';
import { NOTIFICATION_TYPE, Store } from 'react-notifications-component';
import TradeOrdersComponent from './TradeOrdersComponent';

function TradeDashboard() {
    const [market, setMarket] = useState<any>("ETHUSDT")

    const handleMarketChange = (marketId: string) => {
        setMarket(marketId)
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h4>Markets</h4>
                    <MarketComponent onMarketChange={handleMarketChange} />
                </Col>
                <Col>
                    <h4 style={{ textAlign: "center" }}>Chart</h4>
                    <CandleChartComponent symbol={market} /></Col>
                <Col>
                    <h4 style={{ textAlign: "center", width: "150px" }}>Create Order</h4>
                    <TradeFormComponent symbol={market} />
                </Col>
            </Row>
        </Container>
    );
}

export default TradeDashboard;
