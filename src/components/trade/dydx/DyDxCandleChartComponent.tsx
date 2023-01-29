import { CandleResolution, DydxClient, Market } from "@dydxprotocol/v3-client";
import { useState } from "react";
import Navbar from "../../navigation/NavigationComponent";
import { createChart, ColorType, OhlcData } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import { Button, Col, Form, Row } from "react-bootstrap";

function DyDxCandleChartComponent(props: any) {

    const {
        data,
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
            console.log("Inside of DyDxCandleChartComponent")
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
            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
        [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    );

    

    return (
        <>
            <div
                ref={chartContainerRef}
            />
        </>
    );
};



export default DyDxCandleChartComponent;
