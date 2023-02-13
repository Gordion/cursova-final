import React, { Component, useState, useRef, useEffect, useMemo } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Card from "react-bootstrap/Card";
import * as d3 from "d3";
import rd3 from "react-d3-library";
import { queue } from "d3-queue";
import "./bmap.styles.css";
import csvToJSON from "../utils/csvToJSON";
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
    });
    return null;
  }

  function setColour() {}

  const [lastNews, setLastNews] = useState({});
  const [illR, setIllR] = useState(0);
  const [illH, setIllH] = useState(0);
  const [polTotal, setpolTotal] = useState(0);
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
    async function fetchBMapStatData() {
      const polResp = await axios.get(
        "http://localhost:4000/statistics/get-air"
      );
      if (polResp && polResp.status === 200 && polResp.data) {
        console.log("polResp", polResp.data);
        const polLink = polResp.data[0].statslink;
        const polLinkResp = await axios.get(polLink);
        if (polLinkResp && polLinkResp.status === 200 && polLinkResp.data) {
          const polDataCsv = polLinkResp.data;
          console.log("polDataCsv", polDataCsv);
          const polData = csvToJSON(polDataCsv);
          console.log("polData", polData);
          const polTotal = polData
            .map((item) => parseInt(item.Value))
            .reduce(
              (previousValue, currentValue) => previousValue + currentValue,
              0
            );
          const pm25 = polData.find((item) => item.phenomenon === "pm25");
          console.log("pm25", pm25);
          const pm10 = polData.find((item) => item.phenomenon === "pm10");
          console.log("pm10", pm10);
          const aqi = ((pm10.value / 50) * 100 + (pm25.value / 25) * 100) / 2;
          console.log("polTotal", polTotal);
          setpolTotal(aqi.toFixed(1));
        }
      }
    }

    fetchBMapStatData();
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
          className="red-circle"
          center={[49.210813, 24.663191]}
          radius={2000}
        />
        <Circle
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
              polTotal < 50
                ? "green"
                : (50 < polTotal) & (polTotal < 150)
                ? "#f87e0c"
                : "red",
          }}
        >
          {polTotal}
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
