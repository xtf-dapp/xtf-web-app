import React, { useRef, useEffect } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";

interface ChartProps {
  symbol: string;
}

const CandleChartComponent: React.FC<ChartProps> = ({ symbol }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      chartInstanceRef.current = createChart(chartContainerRef.current, {
        width: 1000,
        height: 700,
        crosshair: {
          mode: CrosshairMode.Normal,
        },
      });

      const candleSeries = chartInstanceRef.current.addCandlestickSeries();

      fetch(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1d`
      )
        .then((response) => response.json())
        .then((data) => {
          const prices = data.map((d: any) => ({
            time: d[0] / 1000,
            open: Number(d[1]),
            high: Number(d[2]),
            low: Number(d[3]),
            close: Number(d[4]),
          }));
          candleSeries.setData(prices);
        });
    }

    // Cleanup function to remove chart instance when component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.remove();
      }
    };
  }, [symbol]);

  return <div ref={chartContainerRef} />;
};

export default CandleChartComponent;
