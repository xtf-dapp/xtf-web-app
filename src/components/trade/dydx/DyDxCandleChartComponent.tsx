import { CandleResolution, DydxClient, Market } from "@dydxprotocol/v3-client";
import { useState } from "react";
import Navbar from "../../navigation/NavigationComponent";
import { createChart, ColorType, OhlcData } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import { Button, Col, Form, Row } from "react-bootstrap";


const DYDX_HOST = 'https://api.stage.dydx.exchange';

var newSeries: any = null;

function DyDxCandleChartComponent(props: any) {
    const [data, setData] = useState<OhlcData[]>([]);

    const {
        colors: {
            backgroundColor = 'white',
            lineColor = '#2962FF',
            textColor = 'black',
            areaTopColor = '#2962FF',
            areaBottomColor = 'rgba(41, 98, 255, 0.28)',
        } = {},
    } = props;

    const chartContainerRef: any = useRef();

    useEffect(
        () => {
            const handleResize = () => {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            };

            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: backgroundColor },
                    textColor,
                },
                width: chartContainerRef.current.clientWidth,
                height: 300,
            });
            chart.timeScale().fitContent();

            newSeries = chart.addCandlestickSeries();
            newSeries.setData(data);

            window.addEventListener('resize', handleResize);

            load_data_in_time()
            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
        [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    );

    const convertDate = (date: string) => {
        const dateObject = new Date(date);
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObject.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    const load_data_in_time = () => {
        const public_client = new DydxClient(DYDX_HOST);

        public_client.public.getCandles({
            market: props.market,
            resolution: props.resolution,
        }).then((response) => {
            const candles = response.candles;

            candles.sort((a, b) => new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime())

            const updatedData: OhlcData[] = [];

            candles.forEach((item) => {
                const ob = { time: convertDate(item.startedAt), open: Number(item.open), high: Number(item.high), low: Number(item.low), close: Number(item.close) } as OhlcData;
                updatedData.push(ob);
                newSeries.update(ob);
            })
            setData(updatedData);
        })
    }

    return (
        <>
            <div
                ref={chartContainerRef}
            />
        </>
    );
};



export default DyDxCandleChartComponent;
