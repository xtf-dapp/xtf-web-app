import { CandleResolution, DydxClient, Market } from "@dydxprotocol/v3-client";
import { useState } from "react";
import Navbar from "../../navigation/NavigationComponent";
import { Button, Col, Form, Row } from "react-bootstrap";
import DyDxCandleChartComponent from "./DyDxCandleChartComponent";
import { createChart, ColorType, OhlcData } from 'lightweight-charts';

const DYDX_HOST = 'https://api.stage.dydx.exchange';

const markets: string[] = [Market.BTC_USD, Market.ETH_USD]

const resolutions: string[] = [CandleResolution.ONE_MIN, CandleResolution.FIFTEEN_MINS, CandleResolution.THIRTY_MINS, CandleResolution.ONE_HOUR, CandleResolution.FOUR_HOURS, CandleResolution.ONE_DAY]

function DyDxChartComponent(props: any) {
    const [market, setMarket] = useState<any>(Market.ETH_USD)
    const [resolution, setResolution] = useState<any>(CandleResolution.ONE_DAY)
    const [data, setData] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false)

    const updateMarket = (tarEnv: any) => {
        setMarket(tarEnv.target.value)
        load_data_in_time()
    }

    const updateResolution = (tarEnv: any) => {
        setResolution(tarEnv.target.value)
        load_data_in_time()
    }

    const convertDate = (date: string) => {
        const dateObject = new Date(date);
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObject.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    const load_data_in_time = () => {
        setIsLoading(true)
        const public_client = new DydxClient(DYDX_HOST);

        public_client.public.getCandles({
            market: market,
            resolution: resolution,
        }).then((response) => {
            const candles = response.candles;

            candles.sort((a, b) => new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime())

            const updatedData: OhlcData[] = [];

            candles.forEach((item) => {
                const ob = { time: convertDate(item.startedAt), open: Number(item.open), high: Number(item.high), low: Number(item.low), close: Number(item.close) } as OhlcData;
                updatedData.push(ob);
            })
            setData(updatedData);
            setIsLoading(false)
        }).catch((error: any) => {
            console.log("error when getting candle data ", error);
            setIsLoading(false)
        })
    }

    return (
        <>
            <Navbar currentNode="Chart" />
            <Form>
                <Row>
                    <Col>
                        <Form.Label>Market</Form.Label>
                        <Form.Select value={market} onChange={(tarEnv) => updateMarket(tarEnv)} disabled={isLoading}>
                            {markets.map(item => (<option value={item}>{item}</option>))}
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>Duration</Form.Label>
                        <Form.Select value={resolution} onChange={(tarEnv) => updateResolution(tarEnv)} disabled={isLoading}>
                            {resolutions.map(item => (<option value={item}>{item}</option>))}
                        </Form.Select>
                    </Col>
                </Row>
            </Form>
            <br />
            <br />
            <DyDxCandleChartComponent data={data} />
        </>
    );
};



export default DyDxChartComponent;
