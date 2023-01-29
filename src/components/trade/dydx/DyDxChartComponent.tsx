import { CandleResolution, DydxClient, Market } from "@dydxprotocol/v3-client";
import { useState } from "react";
import Navbar from "../../navigation/NavigationComponent";
import { Button, Col, Form, Row } from "react-bootstrap";
import DyDxCandleChartComponent from "./DyDxCandleChartComponent";


const markets: string[] = [Market.BTC_USD, Market.ETH_USD]

const resolutions: string[] = [CandleResolution.ONE_MIN, CandleResolution.FIFTEEN_MINS, CandleResolution.THIRTY_MINS, CandleResolution.ONE_HOUR, CandleResolution.FOUR_HOURS, CandleResolution.ONE_DAY]

function DyDxChartComponent(props: any) {
    const [market, setMarket] = useState<any>(Market.ETH_USD)
    const [resolution, setResolution] = useState<any>(CandleResolution.ONE_DAY)

    const updateMarket = (tarEnv: any) => {
        console.log(tarEnv.target.value)
    }

    const updateResolution = (tarEnv: any) => {
        console.log(tarEnv.target.value)
    }

    return (
        <>
            <Navbar currentNode="Chart"/>
            <Form>
                <Row>
                    <Col>
                        <Form.Label>Market</Form.Label>
                        <Form.Select value={market} onChange={(tarEnv) => updateMarket(tarEnv)}>
                            {markets.map(item => (<option value={item}>{item}</option>))}
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>Duration</Form.Label>
                        <Form.Select value={resolution} onChange={(tarEnv) => updateResolution(tarEnv)}>
                            {resolutions.map(item => (<option value={item}>{item}</option>))}
                        </Form.Select>
                    </Col>
                </Row>
            </Form>
            <br />
            <br />
            <DyDxCandleChartComponent market={market} resolution={resolution} />
        </>
    );
};



export default DyDxChartComponent;
