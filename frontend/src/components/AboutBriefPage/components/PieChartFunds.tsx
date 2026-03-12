"use client";

import React, { useRef, useEffect } from "react";
import Chart, { Plugin } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ChartDataLabels);

import { FUNDS } from "../UseOfFundsSection";
import Image from "next/image";

// TODO: Change this for selected arc in pie chart, the value is the field 'name' in FUNDS list
const MAIN_NAME = "OPERATIoNS";

export default function PieChartFunds() {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = document.getElementById("PieChartFunds") as HTMLCanvasElement;
    if (chartRef.current) {
      // @ts-ignore
      chartRef.current.destroy();
    }

    const getOuterRadiusWithLabel = (name: string) => {
      if (name === MAIN_NAME.toUpperCase()) {
        switch (name) {
          case "OPERATIONS":
            return 128;
          case "MARKETING":
            return 88;
          case "LIQUIDITY":
            return 82;
          case "DEVELOPMENT":
            return 120;
          default:
            return 92;
        }
      }

      switch (name) {
        case "OPERATIONS":
          return 86;
        case "MARKETING":
          return 52;
        case "LIQUIDITY":
          return 24;
        case "DEVELOPMENT":
          return 72;
        default:
          return 48;
      }
    };

    const customLabelPlugin: Plugin<"doughnut"> = {
      id: "customLabelPlugin",
      beforeDatasetDraw(chart) {
        const { ctx } = chart;

        chart.getDatasetMeta(0).data.forEach((_, index) => {
          ctx.save();
          const value = chart.data.datasets[0].data[index] as number;
          const label = (chart.data.labels?.[index] as string).toUpperCase();
          let sum = chart.data.datasets[0].data.reduce(
            (a: number, b: number) => a + b,
            0
          );
          let percentage = (value / sum) * 100 + "%";

          const xCenter = chart.getDatasetMeta(0).data[index].x;
          const yCenter = chart.getDatasetMeta(0).data[index].y;
          // @ts-ignore
          const startAngle = chart.getDatasetMeta(0).data[index]["startAngle"];
          // @ts-ignore
          const endAngle = chart.getDatasetMeta(0).data[index]["endAngle"];
          const centerAngle = (startAngle + endAngle) / 2;
          const outerRadius =
            // @ts-ignore
            chart.getDatasetMeta(0).data[index]["outerRadius"] +
            getOuterRadiusWithLabel(label);

          const xCoordinate = -25 + outerRadius * Math.cos(centerAngle);
          const yCoordinate = -25 + outerRadius * Math.sin(centerAngle);

          ctx.beginPath();
          ctx.translate(xCenter, yCenter);
          ctx.fill();

          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          // Draw percentage
          ctx.fillStyle = "white";
          ctx.font = "900 24px Lato";
          ctx.fillText(percentage, xCoordinate, yCoordinate + 24);

          // Draw label
          ctx.fillStyle = "#CECECE";
          ctx.font = "400 18px Broad";
          ctx.fillText(label, xCoordinate, yCoordinate + 48);

          ctx.restore();
        });
      },
    };

    // @ts-ignore
    chartRef.current = new Chart(ctx as any, {
      type: "doughnut",
      options: {
        responsive: true,
        layout: {
          padding: 80,
        },
        plugins: {
          tooltip: {
            enabled: false,
          },
          legend: {
            display: false,
          },
          datalabels: {
            display: false,
          },
        },
        cutout: "70%",
      },
      plugins: [customLabelPlugin],
      data: {
        labels: FUNDS.map((fund) => fund.name).reverse(),
        datasets: [
          {
            label: "dataset 1",
            data: FUNDS.map((fund) => fund.percent).reverse(),
            backgroundColor: FUNDS.map((fund) => fund.color).reverse(),
            hoverBackgroundColor: FUNDS.map((fund) => fund.color).reverse(),
            borderWidth: 4,
            hoverBorderColor: "white",
            offset: FUNDS.map((fund) =>
              fund.name === MAIN_NAME ? 120 : 0
            ).reverse(),
          },
        ],
      },
    });

    return () => {
      if (chartRef.current) {
        // @ts-ignore
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="size-full flex-col justify-center items-center relative flex min-w-[782px] min-h-[782px] -mt-[240px] scale-[45%] min-[420px]:-mt-[200px] min-[420px]:scale-[52%] min-[480px]:-mt-[160px] min-[480px]:scale-[62%] min-[560px]:-mt-[120px] min-[560px]:scale-[72%] min-[680px]:-mt-[80px] min-[680px]:scale-[88%] lg:mt-0 lg:scale-[60%] min-[1120px]:scale-[75%] xl:scale-85 2xl:scale-100">
      <canvas id="PieChartFunds" />
      <Image
        width={500}
        height={500}
        alt="chart coinkij"
        // src={CoinCenterChartSVG}
        src="/icons/AboutBrief/coin-center-chart.svg"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px]"
      />
    </div>
  );
}
