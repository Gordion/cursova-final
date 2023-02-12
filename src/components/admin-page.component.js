import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Card from "react-bootstrap/Card";
import banner from "./maxresdefault.jpg";
import regions from "./Lviv_regions.svg";
import NewsTableRow from "./news-table";
import moment from "moment";

export default class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsCollection: [],
      statsCollection: [],
      name: "",
      description: "",
      timestamp: new Date(),
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { name, description, timestamp } = this.state;
    console.log(name, description, timestamp);

    const newsObject = {
      name: this.state.name,
      description: this.state.description,
      timestamp: this.state.formattedTimestamp,
    };
    axios
      .post("http://localhost:4000/news/set-news", newsObject)
      .then((res) => {
        console.log(res.data);
        this.setState({
          newsCollection: this.state.newsCollection.concat(res.data),
        });
      });
    this.setState({ name: "", description: "", timestamp: new Date() });
  };

  onSubmitStat = (e) => {
    e.preventDefault();
    const { namestat, statstype, timestampstat, statslink } = this.state;
    console.log(namestat, statstype, timestampstat, statslink);

    const statsObject = {
      namestat: this.state.namestat,
      statstype: this.state.statstype,
      timestampstat: this.state.formattedTimestampStat,
      statslink: this.state.statslink,
    };
    axios
      // .post("http://localhost:4000/statistics/set-statistic", {
      //   ...statsObject,
      // })
      .post("http://localhost:4000/statistics/set-statistic", {
        statstype: this.state.statstype,
        statsObject,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          statsCollection: this.state.statsCollection.concat(res.data),
        });
      });
    this.setState({
      namestat: "",
      statstype: "",
      timestamp: new Date(),
      statslink: "",
    });
  };

  onChangeNameStat = (e) => {
    this.setState({ namestat: e.target.value });
  };

  onChangeTimestampStat = (e) => {
    const date = e.target.value;
    const formattedDate = moment(date).format("DD.MM.YYYY");
    this.setState({
      timestampstat: date,
      formattedTimestampStat: formattedDate,
    });
  };

  onChangeStatsType = (e) => {
    this.setState({ statstype: e.target.value });
  };

  onChangeStatsLink = (e) => {
    this.setState({ statslink: e.target.value });
  };

  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };

  onChangeTimestamp = (e) => {
    const date = e.target.value;
    const formattedDate = moment(date).format("DD.MM.YYYY");
    this.setState({
      timestamp: date,
      formattedTimestamp: formattedDate,
    });
  };

  onChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/news")
      .then((res) => {
        this.setState({ newsCollection: res.data });
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("http://localhost:4000/statistics")
      .then((res) => {
        this.setState({ statsCollection: res.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  dataTable = (collection, hideDelete) => {
    return collection.map((data, i) => {
      return (
        <NewsTableRow
          obj={data}
          key={i}
          onRowDelete={!hideDelete ? this.deleteRow : null}
        />
      );
    });
  };

  deleteRow = (rowId) => {
    console.log(rowId, "rowid");
    this.setState({
      newsCollection: this.state.newsCollection.filter(
        (item) => item._id != rowId
      ),
    });
  };

  // onSubmit(e) {
  //   e.preventDefault();
  //   console.log(0);
  //   const userObject = {
  //     name: this.state.name,
  //     password: this.state.password,
  //   };
  //   axios
  //     .post("http://localhost:4000/News/get-news", userObject)
  //     .then((res) => {
  //       console.log("/News/get-news", res);
  //       this.setState({ News: res });
  //       if (localStorage.getItem("News")) {
  //         console.log("test", this.state);
  //         let user = JSON.parse(localStorage.getItem("user"));
  //         console.log("text", user);
  //         axios
  //           .post("http://localhost:4000/News/name", {
  //             _id: user._id,
  //           })
  //           .then((res) => {
  //             console.log("text", res);
  //           });
  //         return;
  //       } else {
  //       }
  //       console.log("onlogin", res.data);
  //       const { _id, name } = res.data.user;
  //       localStorage.setItem("user", JSON.stringify({ _id, name }));
  //       console.log(this.props, "props");
  //       this.props.navigate("/homepage");
  //       this.props.onLogin(name);
  //     });
  //   // .catch((e) => {
  //   //   console.log(">>>", e);
  //   //   alert("Неправильний логін або пароль");
  //   // });

  //   this.setState({ name: "", password: "" });
  // }

  render() {
    return (
      <div className="App">
        <div className="App-admin">
          <div className="form-container">
            <div className="form-admin">
              <h2>News</h2>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    value={this.state.name}
                    onChange={this.onChangeName}
                    type="text"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Timestamp</Form.Label>
                  <Form.Control
                    type="date"
                    value={this.state.timestamp}
                    onChange={this.onChangeTimestamp}
                  ></Form.Control>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>News text</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  size="lg"
                  block="block"
                  type="submit"
                  className="mt-4"
                  onClick={this.onSubmit}
                >
                  Submit
                </Button>
              </Form>
              {/* <ul>
               {this.state.News.map((item) => (
                <li>{item.title}</li>
              ))} 
            </ul> */}
              {/* <tr>
                <td>
                    {this.props.obj._id}
                </td>
                <td>
                    {this.props.obj.name}
                </td>
                <td>
                    {this.props.obj.email}
                </td>
            </tr> */}
            </div>

            <div className="form-admin">
              <h2>Statistic</h2>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    value={this.state.namestat}
                    onChange={this.onChangeNameStat}
                    type="text"
                  />
                </Form.Group>
                <Form.Label>Type of Statistic</Form.Label>
                <Form.Control
                  value={this.state.statstype}
                  onChange={this.onChangeStatsType}
                  as="select"
                >
                  <option value="cov">Covid</option>
                  <option value="vac">Vaccination</option>
                  <option value="map">Map</option>
                </Form.Control>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>Timestamp</Form.Label>
                  <Form.Control
                    value={this.state.timestampstat}
                    onChange={this.onChangeTimestampStat}
                    type="date"
                  ></Form.Control>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea2"
                >
                  <Form.Label>Data link</Form.Label>
                  <Form.Control
                    value={this.state.statslink}
                    onChange={this.onChangeStatsLink}
                    as="textarea"
                    rows={3}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  size="lg"
                  block="block"
                  type="submit"
                  className="mt-4"
                  onClick={this.onSubmitStat}
                >
                  Submit
                </Button>
              </Form>
            </div>
          </div>

          <div className="stats-container">
            <div className="stats-column">
              <table className="table table-striped table-blue">
                <thead className="thead-blue">
                  <tr>
                    <td>Name</td>
                    <td>Timestamp</td>
                    <td>Delete</td>
                  </tr>
                </thead>
                <tbody>
                  {/* <tr>
                      <td>{this.props.obj._id}</td>
                      <td>{this.props.obj.name}</td>
                      <td>{this.props.obj.email}</td>
                    </tr> */}
                  {this.dataTable(this.state.newsCollection)}
                </tbody>
              </table>
            </div>
            <div className="stats-column">
              <table className="table table-striped table-blue">
                <thead className="thead-blue">
                  <tr>
                    <td>Name</td>
                    <td>Timestamp</td>
                  </tr>
                </thead>
                <tbody>
                  {/* <tr>
                      <td>{this.props.obj._id}</td>
                      <td>{this.props.obj.name}</td>
                      <td>{this.props.obj.email}</td>
                    </tr> */}
                  {this.dataTable(this.state.statsCollection, true)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
