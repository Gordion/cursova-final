import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Card from "react-bootstrap/Card";
import banner from "./maxresdefault.jpg";

// const data = [
//   {
//     timestamp: "17.06.2022",
//     title: "На Львівщині продовжується вакцинальна кампанія проти Covid-19",
//     text: "Центри масової вакцинації населення зараз не працюють, проте провакцинуватися можна у пунктах щеплення,",
//   },
//   {
//     timestamp: "17.06.2022",
//     title: "На Львівщині продовжується вакцинальна кампанія проти Covid-19",
//     text: "Центри масової вакцинації населення зараз не працюють, проте провакцинуватися можна у пунктах щеплення,",
//   },
//   {
//     timestamp: "17.06.2022",
//     title: "На Львівщині продовжується вакцинальна кампанія проти Covid-19",
//     text: "Центри масової вакцинації населення зараз не працюють, проте провакцинуватися можна у пунктах щеплення,",
//   },
// ];

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsCollection: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/news")
      .then((res) => {
        this.setState({ newsCollection: res.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-body-news">
          {this.state.newsCollection.reverse().map((item) => (
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
                  {item.timestamp}
                </Card.Header>
                <Card.Body>
                  <Card.Title className="news-title">{item.name}</Card.Title>
                  <Card.Text className="news-text">
                    {item.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
