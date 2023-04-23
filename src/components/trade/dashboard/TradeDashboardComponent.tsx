import NavbarComponent from '../../navigation/NavigationComponent'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import MarketComponent from './MarketComponent';
import CandleChartComponent from './CandleChartComponent';
import { CandleResolution, Market } from '@dydxprotocol/v3-client';
import DyDxChartComponent from '../dydx/DyDxChartComponent';

function TradeDashboard() {
    const [market, setMarket] = useState<any>("ETHUSDT")

    const handleMarketChange = (marketId: string) => {
        setMarket(marketId)
    };

    return (
        <Container style={{ margin: "10px" }}>
            <Row className="justify-content-md-center">
                <Col>
                    <h4>Markets</h4>
                    <MarketComponent onMarketChange={handleMarketChange} />
                </Col>
                <Col>
                    <h4 style={{textAlign: "center"}}>Chart</h4>
                    <CandleChartComponent symbol={market} /></Col>
                <Col>
                <h4 style={{textAlign: "center"}}>Trade</h4>
                </Col>
            </Row>
        </Container>
    );
}

export default TradeDashboard;
