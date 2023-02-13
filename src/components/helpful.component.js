import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Slider from "react-slick";

export default class Helpful extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsCollection: [],
    };
  }

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
          <div>
            {/* <h2>Simple slider</h2> */}
            <Slider className="slider-new" {...settings}>
              <div className="slider-div">
                <img className="slider-img" src={"./bursht.jpg"} />
              </div>
              <div className="slider-div">
                <img className="slider-img" src={"./bursht1.jpg"} />
              </div>
              <div className="slider-div">
                <img className="slider-img" src={"./bursht2.jpg"} />
              </div>
              <div className="slider-div">
                <img className="slider-img" src={"./bursht3.jpg"} />
              </div>
              {/* <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
            <div>
              <h3>5</h3>
            </div>
            <div>
              <h3>6</h3>
            </div> */}
            </Slider>
          </div>
        </div>
        <div>
          {/* <div className="slider-div">
            <h1>Бурштинська ТЕС</h1>
            <img className="slider-img" src={"./bursht.jpg"} />
          </div> */}
          <p className="new-line">
            Бурштинська ТЕС розташована в 6 км на південний схід від м. Бурштин
            Галицького району Івано-Франківської області. Бурштинську ТЕС
            споруджено на берегах ріки Гнила Липа із збірного залізобетону у
            рекордно короткий термін (1962-69 р.р.) за новим на той час
            експериментальним методом потокового будівництва. Навесні 1965 р.
            Бурштинська ТЕС дала промисловий струм, а в грудні 1969 р., що на
            рік скоріше запланованого, став до ладу її 12-й енергоблок і станція
            вийшла на проектну потужність 2 млн. 400 тис. кВт. Бурштинська ТЕС є
            найбільшою електростанцією на заході України. Основне призначення –
            надійне і безперебійне постачання електроенергії споживачам
            Західного регіону України, країн Східної Європи та ОЕС України. Крім
            цього – забезпечення тепловою енергією житлового і побутового
            секторів міста енергетиків Бурштина.
          </p>
        </div>
      </div>
    );
  }
}
