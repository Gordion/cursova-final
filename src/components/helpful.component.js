import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Card from "react-bootstrap/Card";
import banner from "./maxresdefault.jpg";
import regions from "./Lviv_regions.svg";
import Slider from "react-slick";
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";

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

export default class Helpful extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsCollection: [],
    };
  }
  //   componentDidMount() {
  //     axios
  //       .get("http://localhost:4000/news")
  //       .then((res) => {
  //         this.setState({ newsCollection: res.data });
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }

  //   render() {
  //     const settings = {
  //       dots: true,
  //       fade: true,
  //       infinite: true,
  //       speed: 500,
  //       slidesToShow: 1,
  //       slidesToScroll: 1,
  //     };

  render() {
    const settings = {
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <div>
        <div>
          <div className="slider-div">
            <img className="slider-img" src={"./bursht.jpg"} />
          </div>
          <p className="new-line">
            Бурштинська ТЕС розташована в 6 км на південний схід від м. Бурштин
            Галицького району Івано-Франківської області. <br />
            Бурштинську ТЕС споруджено на берегах ріки Гнила Липа із збірного
            залізобетону у рекордно короткий термін (1962-69 р.р.) за новим на
            той час експериментальним методом потокового будівництва. Навесні
            1965 р. Бурштинська ТЕС дала промисловий струм, а в грудні 1969 р.,
            що на рік скоріше запланованого, став до ладу її 12-й енергоблок і
            станція вийшла на проектну потужність 2 млн. 400 тис. кВт. <br />
            Бурштинська ТЕС є найбільшою електростанцією на заході України.{" "}
            <br />
            Основне призначення – надійне і безперебійне постачання
            електроенергії споживачам Західного регіону України, країн Східної
            Європи та ОЕС України. Крім цього – забезпечення тепловою енергією
            житлового і побутового секторів міста енергетиків Бурштина.
          </p>
        </div>
        {/* <div className="App-body-news">
          {this.state.newsCollection.map((item) => (
            <div className="card-temp">
              <Card
                classname="card-news"
                border="primary"
                className={{
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
        </div> */}
      </div>
    );
  }
}
