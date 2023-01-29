import { CandleResolution, DydxClient, Market } from "@dydxprotocol/v3-client";
import { useState } from "react";
import Navbar from "../../navigation/NavigationComponent";
import { createChart, ColorType, OhlcData } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';


const DYDX_HOST = 'https://api.stage.dydx.exchange';

const const_data = [
    { time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
    { time: '2018-12-23', open: 45.12, high: 53.90, low: 45.12, close: 48.09 },
    { time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
    { time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.50 },
    { time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
    { time: '2018-12-27', open: 91.04, high: 121.40, low: 82.70, close: 111.40 },
    { time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
];

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

            const newSeries = chart.addCandlestickSeries();
            newSeries.setData(data);

            window.addEventListener('resize', handleResize);

            load_data_in_time(newSeries)
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

    const load_data_in_time = (series: any) => {
        const public_client = new DydxClient(DYDX_HOST);
        public_client.public.getCandles({
            market: Market.BTC_USD,
            resolution: CandleResolution.ONE_DAY,
        }).then((response) => {
            const candles = response.candles;
            console.log("incoming candles {}", JSON.stringify(candles))

            candles.sort((a, b) => new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime())

            console.log("sorting call ", JSON.stringify(candles));

            const updatedData: OhlcData[] = [];

            candles.forEach((item) => {
                const ob = { time: convertDate(item.startedAt), open: Number(item.open), high: Number(item.high), low: Number(item.low), close: Number(item.close) } as OhlcData;
                updatedData.push(ob);
                series.update(ob);
            })
            setData(updatedData);
        })
    }

    return (
        <>
            <Navbar />
            <div
                ref={chartContainerRef}
            />
        </>
    );
};



export default DyDxCandleChartComponent;
