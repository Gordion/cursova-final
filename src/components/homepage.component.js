import React, { useEffect, useState, Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Card from "react-bootstrap/Card";
import "./homepage.css";

import { useNavigate, Link } from "react-router-dom";
import csvToJSON from "../utils/csvToJSON";
import VideoPlayer from "react-video-js-player";
import YoutubeEmbed from "./YoutubeEmbed";

export default function Homepage() {
  const [lastNews, setLastNews] = useState({});
  const [pm25Total, setPm25Total] = useState(0);
  const [pm10Total, setPm10Total] = useState(0);
  const [tempTotal, setTempTotal] = useState(0);
  const [humTotal, setHumTotal] = useState(0);
  const [youtubeID] = useState("nS6NOsHivh4?rel=0&showinfo=0&autohide=1");

  useEffect(() => {
    async function fetchLastNewsData() {
      const newsResp = await axios.get(
        "http://localhost:4000/news/get-lastnews"
      );
      if (newsResp && newsResp.status === 200 && newsResp.data) {
        console.log("newsrespdata", newsResp.data);
        setLastNews(newsResp.data);
      }
    }

    async function fetchairStatData() {
      const airResp = await axios.get(
        "http://localhost:4000/statistics/get-air"
      );
      if (airResp && airResp.status === 200 && airResp.data) {
        console.log("airResp", airResp.data);
        const airLink = airResp.data[0].statslink;
        const airLinkResp = await axios.get(airLink);
        // setLastNews(covResp.data);
        if (airLinkResp && airLinkResp.status === 200 && airLinkResp.data) {
          const airDataCsv = airLinkResp.data;
          console.log("airDataCsv", airDataCsv);
          const airData = csvToJSON(airDataCsv);
          console.log("airData", airData);
          const airTotal = airData
            .map((item) => parseInt(item.Cases))
            .reduce(
              (previousValue, currentValue) => previousValue + currentValue,
              0
            );
          const pm25 = airData.find((item) => item.phenomenon === "pm25");
          console.log("pm25", pm25);
          const pm10 = airData.find((item) => item.phenomenon === "pm10");
          console.log("pm10", pm10);
          const hum = airData.find((item) => item.phenomenon === "humidity");
          console.log("humidity", hum);
          const temp = airData.find(
            (item) => item.phenomenon === "temperature"
          );
          const pm25v = pm25.value;
          const pm10v = pm10.value;
          const humv = hum.value;
          const tempv = temp.value;
          console.log("temperature", temp);
          console.log("airTotal", airTotal);
          setPm10Total(pm10v);
          setPm25Total(pm25v);
          setTempTotal(tempv);
          setHumTotal(humv);
        }
      }
      // setLastNews(airResp.data);
    }

    fetchairStatData();
    fetchLastNewsData();
  }, []);

  return (
    <div className="App">
      <div className="App-body">
        <div className="sidebars">
          <div className="sidetext">
            <h3>Остання статистика:</h3>
            <p className="sidetext-title"> Температура:</p>
            <p className="sidetext-number color-good">
              {tempTotal}°C
              {/* 302.339 <sup className="color-bad">(+557)</sup> */}
            </p>
            <p className="sidetext-title"> Вологість:</p>
            <p className="sidetext-number color-good">
              {humTotal}%
              {/* {" "}
              239.016 <sup className="color-good">(+2 049)</sup> */}
            </p>
            <p className="sidetext-title"> Кількість частинок pm10:</p>
            <p className="sidetext-number color-bad">
              {pm10Total}
              {/* {" "}
              6.560 <sup className="color-bad">(+15)</sup> */}
            </p>
            <p className="sidetext-title"> Кількість частинок pm2.5:</p>
            <p className="sidetext-number color-bad">
              {pm25Total}
              {/* {" "}
              1.041.068 <sup className="color-good">(+1 334)</sup> */}
            </p>
          </div>
        </div>
        <div className="App-city">
          <div className="youtubeCenter">
            <YoutubeEmbed
              className="youtubeCenter"
              embedId="nS6NOsHivh4?rel=0&controls=0&autoplay=0&loop=1"
            />
          </div>
        </div>
        <div></div>
        <div className="sidebar">
          <div className="card-temp">
            <Card
              classname="card-news"
              border="primary"
              style={{
                display: "flex",
                flex: 1,
                width: "20rem",
              }}
            >
              <Card.Header className="news-timestamp">
                Останні новини
              </Card.Header>
              <Card.Body>
                <Card.Title className="news-title">{lastNews.name}</Card.Title>
                <Card.Text className="news-text">
                  {lastNews.description}
                </Card.Text>
                <Button href="/news" variant="primary">
                  До інших новин
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
