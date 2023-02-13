import React, { Component, useState, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Card from "react-bootstrap/Card";
import * as d3 from "d3";
import rd3 from "react-d3-library";
import { queue } from "d3-queue";
// import { tip } from "d3-tip";
// import { tip as d3tip } from "d3-v6-tip";
import d3Tip from "d3-tip";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import "./air-statistic.styles.css";
import d3legend from "d3-legend";
import { Pie } from "react-chartjs-2";
import { Doughnut, PolarArea } from "react-chartjs-2";
import csvToJSON from "../utils/csvToJSON";

// var d3legend = require("d3-legend")(d3);
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  RadialLinearScale,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Статистика забруднення повітря в Бурштині",
    },
  },
};

function convertPieData(chartData) {
  const cases = chartData.map((d) => parseInt(d.Amount));
  return {
    labels: [
      "Пил",
      "Діоксид Сірки",
      "Сірководень",
      "Оксид вуглецю",
      "Аміак",
      "Формальдегід",
    ],
    datasets: [
      {
        label: "Кількість",
        data: cases,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(59, 227, 149, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(59, 227, 149, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
}

function convertBarData(chartData) {
  const cases = chartData.map((d) => parseInt(d.Amount));
  const labels = [
    "Пил",
    "Діоксид Сірки",
    "Сірководень",
    "Оксид вуглецю",
    "Аміак",
    "Формальдегід",
  ];
  return {
    labels,
    datasets: [
      {
        label: "Кількість",
        data: cases,
        borderColor: "rgb(41, 128, 185)",
        backgroundColor: "rgba(41, 128, 185, 0.5)",
      },
    ],
  };
}

export default function ChemStat() {
  const [value, setValue] = useState(1);
  const [barData, setBarData] = useState({});
  const [pieData, setPieData] = useState({});

  const handleChange = (val) => setValue(val);

  useEffect(() => {
    async function fetchchemData() {
      const chemResp = await axios.get(
        "http://localhost:4000/statistics/get-chem"
      );
      if (chemResp && chemResp.status === 200 && chemResp.data) {
        const dataLink = chemResp.data[0].statslink;
        const dataLinkResp = await axios.get(dataLink);
        if (dataLinkResp && dataLinkResp.status === 200 && dataLinkResp.data) {
          const chartDataCsv = dataLinkResp.data;
          console.log("chartDataCsv", chartDataCsv);
          const chartData = csvToJSON(chartDataCsv);
          console.log("chartData", chartData);

          const convertedBarData = chartData ? convertBarData(chartData) : {};
          console.log("bar data", convertedBarData);
          setBarData(convertedBarData);

          const convertedPieData = chartData ? convertPieData(chartData) : {};
          console.log("pie data", convertedPieData);
          setPieData(convertedPieData);
        }
      }
    }

    fetchchemData();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        // width: value === 2 ? 500 : "100%",
        ...(value === 2 && { width: 500 }),
        margin: "auto",
      }}
    >
      {value === 1 && barData?.datasets && (
        <Bar
          classname="bardiagram"
          options={options}
          data={barData}
          style={{ marginTop: 30 }}
        />
      )}
      {value === 2 && pieData?.datasets && (
        <PolarArea
          data={pieData}
          // width={"500px"}
          // height={"500px"}
          classname="piechart"
          style={{ marginTop: 30 }}
        />
      )}

      <div class="button-group">
        <ToggleButtonGroup
          type="radio"
          name="options"
          defaultValue={1}
          value={value}
          onChange={handleChange}
        >
          <ToggleButton
            variant="outline-primary"
            classnmae="radio-button-st"
            id="tbg-radio-1"
            value={1}
          >
            Bar diagram
          </ToggleButton>
          <ToggleButton
            variant="outline-primary"
            classnmae="radio-button-st"
            id="tbg-radio-2"
            value={2}
          >
            Polar Area
          </ToggleButton>
          {/* <ToggleButton
            variant="outline-primary"
            classnmae="radio-button-st"
            id="tbg-radio-3"
            value={3}
          >
            Radio 3
          </ToggleButton> */}
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
