import React, { Component, useState, useRef, useEffect, useMemo } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Card from "react-bootstrap/Card";
// import banner from "./maxresdefault.jpg";
// import regions from "./Lviv_regions.svg";
import * as d3 from "d3";
import rd3 from "react-d3-library";
import { queue } from "d3-queue";
import "./lvivmap.styles.css";
import csvToJSON from "../utils/csvToJSON";
// import L from "leaflet";
// import icon from "./constants";
import {
  MapContainer,
  TileLayer,
  useMap,
  Popup,
  Marker,
  useMapEvents,
  Circle,
  CircleMarker,
  MapConsumer,
} from "react-leaflet";

export default function Map(props) {
  const [map, setMap] = useState(null);
  const [coords, setCoords] = useState({});
  const [userMarker, setUserMarker] = useState();
  const position = [49.210813, 24.663191];
  const ref = useRef();
  const addMarker = (e) => {
    setUserMarker(e.latlng);
    console.log("onclick", e.latlng);
  };
  const eventHandlers = useMemo(
    () => ({
      click() {
        console.log("click");
      },
    }),
    []
  );

  function MyComponent() {
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setUserMarker([lat, lng]);
      },
      // locationfound: (location) => {
      //   console.log("location found:", location);
      // },
    });
    return null;
  }

  function setColour() {}

  const [lastNews, setLastNews] = useState({});
  const [casesTotal, setCasesTotal] = useState(0);
  const [curedTotal, setCuredTotal] = useState(0);
  const [deathTotal, setDeathTotal] = useState(0);
  const [illR, setIllR] = useState(0);
  const [illH, setIllH] = useState(0);
  const [vacTotal, setVacTotal] = useState(0);
  const [youtubeID] = useState("nS6NOsHivh4");
  const [buttonText, setButtonText] = useState("Введіть свої дані");
  const circleRef = useRef();
  const mapRef = useRef();

  function onChangeIllH(e) {
    setIllH(e);
  }
  function onChangeIllR(e) {
    setIllR(e);
  }

  useEffect(() => {
    async function fetchCovidStatData() {
      const covResp = await axios.get(
        "http://localhost:4000/statistics/get-cov"
      );
      if (covResp && covResp.status === 200 && covResp.data) {
        console.log("covResp", covResp.data);
        const covLink = covResp.data[0].statslink;
        const covLinkResp = await axios.get(covLink);
        // setLastNews(covResp.data);
        if (covLinkResp && covLinkResp.status === 200 && covLinkResp.data) {
          const covDataCsv = covLinkResp.data;
          console.log("covDataCsv", covDataCsv);
          const covData = csvToJSON(covDataCsv);
          console.log("covData", covData);

          const casesTotal = covData
            .map((item) => parseInt(item.Cases))
            .reduce(
              (previousValue, currentValue) => previousValue + currentValue,
              0
            );
          console.log("casesTotal", casesTotal);
          setCasesTotal(casesTotal);
        }
      }

      const vacResp = await axios.get(
        "http://localhost:4000/statistics/get-air"
      );
      if (vacResp && vacResp.status === 200 && vacResp.data) {
        console.log("vacResp", vacResp.data);
        const vacLink = vacResp.data[0].statslink;
        const vacLinkResp = await axios.get(vacLink);
        // setLastNews(covResp.data);
        if (vacLinkResp && vacLinkResp.status === 200 && vacLinkResp.data) {
          const vacDataCsv = vacLinkResp.data;
          console.log("vacDataCsv", vacDataCsv);
          const vacData = csvToJSON(vacDataCsv);
          console.log("vacData", vacData);
          const vacTotal = vacData
            .map((item) => parseInt(item.Value))
            .reduce(
              (previousValue, currentValue) => previousValue + currentValue,
              0
            );
          const pm25 = vacData.find((item) => item.phenomenon === "pm25");
          console.log("pm25", pm25);
          const pm10 = vacData.find((item) => item.phenomenon === "pm10");
          console.log("pm10", pm10);
          const aqi = ((pm10.value * pm25.value) / 10) * 3;
          console.log("vacTotal", vacTotal);
          setVacTotal(aqi.toFixed(1));
        }
      }
      // setLastNews(vacResp.data);
    }

    fetchCovidStatData();
  }, []);

  function setAqi(e) {
    e.preventDefault();
    console.log("CircleRef", circleRef);
    const latLng = circleRef.current.getLatLng();
    console.log(latLng);
    console.log("Mapref", mapRef);
    console.log("Ill", illR, illH);
    if (
      mapRef.current.distance(userMarker, circleRef.current.getLatLng()) < 2000
    ) {
      setButtonText("Ви в небезпеці");
    } else if (
      (mapRef.current.distance(userMarker, circleRef.current.getLatLng()) >
        2000) &
      (mapRef.current.distance(userMarker, circleRef.current.getLatLng()) <
        10000) &
      (illR === "ill-r-yes" || illH == "ill-h-yes")
    ) {
      setButtonText("Ви в небезпеці");
      console.log("extra");
    } else if (
      (mapRef.current.distance(userMarker, circleRef.current.getLatLng()) >
        2000) &
      (mapRef.current.distance(userMarker, circleRef.current.getLatLng()) <
        10000) &
      (illR === "ill-r-no") &
      (illH === "ill-h-no")
    ) {
      setButtonText("Ви в безпеці");
      console.log("extra");
    } else if (
      (mapRef.current.distance(userMarker, circleRef.current.getLatLng()) >
        10000) &
      (mapRef.current.distance(userMarker, circleRef.current.getLatLng()) <
        20000) &
      (illR === "ill-r-yes") &
      (illH === "ill-h-yes")
    ) {
      setButtonText("Ви в небезпеці");
      console.log("extra");
    } else if (
      (mapRef.current.distance(userMarker, circleRef.current.getLatLng()) >
        10000) &
      (mapRef.current.distance(userMarker, circleRef.current.getLatLng()) <
        20000)
    ) {
      setButtonText("Ви в безпеці");
    } else if (
      mapRef.current.distance(userMarker, circleRef.current.getLatLng()) > 20000
    ) {
      setButtonText("Ви в безпеці");
    }
  }

  return (
    <div className="app-map">
      <MapContainer
        ref={mapRef}
        className="ecomap"
        // onClick={addMarker}
        center={position}
        zoom={11}
        style={{ height: "847px", width: "100%" }}
        whenReady={setMap}
        eventHandlers={eventHandlers}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle
          ref={circleRef}
          className="yellow-circle"
          center={[49.210813, 24.663191]}
          radius={20000}
        />
        <Circle
          // ref={cicleRef}
          className="red-circle"
          center={[49.210813, 24.663191]}
          radius={2000}
        />
        <Circle
          // ref={cicleRef}
          className="orange-circle"
          center={[49.210813, 24.663191]}
          radius={10000}
        />
        <Marker position={[49.210813, 24.663191]}>
          <Popup>Бурштинська ТЕС</Popup>
        </Marker>
        {userMarker && <Marker position={userMarker}></Marker>}
        <MyComponent />
      </MapContainer>
      <div className="ecocalc">
        <h2>
          Індекс якості повітря <br /> на сьогодні:
        </h2>
        <h3
          style={{
            color:
              vacTotal < 50
                ? "green"
                : (50 < vacTotal) & (vacTotal < 150)
                ? "#f87e0c"
                : "red",
          }}
        >
          {vacTotal}
        </h3>
        <div>
          <h2
            style={{
              marginTop: "30px",
            }}
          >
            Перевірте чи ви в безпеці
          </h2>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Ваші координати</Form.Label>
              <Form.Control value={[userMarker]} type="text" />
            </Form.Group>
            <Form.Label>Наявність распіраторних хвороб</Form.Label>
            <Form.Control
              onChange={(e) => onChangeIllR(e.target.value)}
              as="select"
            >
              <option value="ill-r-yes">Так</option>
              <option value="ill-r-no">Ні</option>
            </Form.Control>
            <Form.Label>Наявність серцево-судинних хвороб</Form.Label>
            <Form.Control
              onChange={(e) => onChangeIllH(e.target.value)}
              as="select"
            >
              <option value="ill-h-yes">Так</option>
              <option value="ill-h-no">Ні</option>
            </Form.Control>
            <Button
              variant="primary"
              size="lg"
              block="block"
              type="submit"
              className="mt-4"
              onClick={setAqi}
            >
              Розрахувати
            </Button>
          </Form>
          <p
            className="sidetext-title"
            style={{
              color:
                buttonText == "Ви в безпеці"
                  ? "#7bd492"
                  : buttonText == "Ви в небезпеці"
                  ? "red"
                  : "black",
              marginTop: "30px",
            }}
          >
            {buttonText}
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
}
