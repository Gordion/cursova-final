import React, { Component, useState, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Card from "react-bootstrap/Card";
import * as d3 from "d3";
import rd3 from "react-d3-library";
import { queue } from "d3-queue";
import d3Tip from "d3-tip";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import "./covid-statistic.styles.css";
import d3legend from "d3-legend";
import { Pie } from "react-chartjs-2";
import csvToJSON from "../utils/csvToJSON";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  annotationPlugin,
  PointElement,
  LineElement
);

// export const data1 = {
//   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Test"],
//   datasets: [
//     {
//       label: "# of Votes",
//       data: [cases],
//       backgroundColor: [
//         "rgba(255, 99, 132, 0.2)",
//         "rgba(54, 162, 235, 0.2)",
//         "rgba(255, 206, 86, 0.2)",
//         "rgba(75, 192, 192, 0.2)",
//         "rgba(153, 102, 255, 0.2)",
//         "rgba(255, 159, 64, 0.2)",
//       ],
//       borderColor: [
//         "rgba(255, 99, 132, 1)",
//         "rgba(54, 162, 235, 1)",
//         "rgba(255, 206, 86, 1)",
//         "rgba(75, 192, 192, 1)",
//         "rgba(153, 102, 255, 1)",
//         "rgba(255, 159, 64, 1)",
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Забруднення Бурштинського водосховища",
    },
    // annotation: {
    //   annotations: {
    //     line1: {
    //       type: "line",
    //       yMin: 4000,
    //       yMax: 500,
    //       borderColor: "rgb(255, 99, 5)",
    //       borderWidth: 2,
    //     },
    //   },
    // },
  },
  responsive: true,
  scales: {
    x: {
      stacked: false,
    },
    y: {
      stacked: false,
    },
  },
};

const labels = ["2018", "2019", "2020", "2021"];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "Cases",
//       data: [1825, 140, 179, 212, 138, 233, 66],
//       backgroundColor: "rgb(255, 99, 132)",
//     },
//     {
//       label: "Cured",
//       data: [108, 26, 59, 36, 17, 15, 34],
//       backgroundColor: "rgb(75, 192, 192)",
//     },
//     {
//       label: "Deaths",
//       data: [30, 10, 20, 10, 10, 15, 10],
//       backgroundColor: "rgb(0, 0, 0)",
//     },
//   ],
// };

function convertPieData(chartData) {
  const cases = chartData.map((d) => parseInt(d.Amount));
  const sulfates = chartData.map((d) => parseInt(d.sulfates));
  const chlorides = chartData.map((d) => parseInt(d.chlorides));
  return {
    labels: ["2018", "2019", "2020", "2021"],
    datasets: [
      {
        label: "Sulfates",
        data: sulfates,
        backgroundColor: "rgb(174, 176, 51)",
      },
      {
        label: "Chlorides",
        data: chlorides,
        backgroundColor: "rgb(121, 173, 173)",
      },
    ],
  };
}

function convertBarData(chartData) {
  const sulfates = chartData.map((d) => parseInt(d.sulfates));
  const chlorides = chartData.map((d) => parseInt(d.chlorides));
  // const cured = chartData.map((d) => parseInt(d.Cured));
  // const death = chartData.map((d) => parseInt(d.Death));
  return {
    labels,
    datasets: [
      {
        label: "Sulfates",
        data: sulfates,
        backgroundColor: "rgb(174, 176, 51)",
      },
      {
        label: "Chlorides",
        data: chlorides,
        backgroundColor: "rgb(121, 173, 173)",
      },

      // {
      //   label: "Dataset 1",
      //   type: "line",
      //   borderColor: "rgb(255, 99, 132)",
      //   borderWidth: 2,
      //   fill: false,
      //   data: [1000, 500, 5000, 6000],
      // },
      // {
      //   label: "Cured",
      //   data: cured,
      //   backgroundColor: "rgb(75, 192, 192)",
      // },
      // {
      //   label: "Death",
      //   data: death,
      //   backgroundColor: "rgb(0, 0, 0)",
      // },
    ],
  };
}

export default function CovidStat() {
  const [value, setValue] = useState(1);
  const [barData, setBarData] = useState({});
  const [pieData, setPieData] = useState({});

  const handleChange = (val) => setValue(val);

  useEffect(() => {
    async function fetchCovData() {
      const covResp = await axios.get(
        "http://localhost:4000/statistics/get-water"
      );
      if (covResp && covResp.status === 200 && covResp.data) {
        const dataLink = covResp.data[0].statslink;
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

    fetchCovData();
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
        <Line
          width={"2000px"}
          height={"1500px"}
          // classname="piechart"
          data={pieData}
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
            Line chart
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
