import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Card from "react-bootstrap/Card";
import banner from "./maxresdefault.jpg";
import regions from "./Lviv_regions.svg";

export default class News extends Component {
  render() {
    return (
      <div className="App">
        <div className="card-temp">
          <Card border="primary" style={{ width: "20rem", fontsize: "1.5rem" }}>
            <Card.Header>Останні новини</Card.Header>
            <Card.Body>
              <Card.Title>
                На Львівщині продовжується вакцинальна кампанія проти Covid-19.
              </Card.Title>
              <Card.Text>
                Центри масової вакцинації населення зараз не працюють, проте
                провакцинуватися можна у пунктах щеплення,
              </Card.Text>
              <Button variant="primary">Більше про новину</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
