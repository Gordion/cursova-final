import React, { Component, useState, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Card from "react-bootstrap/Card";
// import banner from "./maxresdefault.jpg";
// import regions from "./Lviv_regions.svg";
import * as d3 from "d3";
import rd3 from "react-d3-library";
import { queue } from "d3-queue";

export default function LvivMapTable(props) {
  const ref = useRef();
  useEffect(() => {
    // const [mapD3, setMapD3] = useState();

    const tablenode = ref.current; // document.createElement("div");
  }, []);

  return <div>{/* <div id="table_container" class="csvTable"></div> */}</div>;
}
