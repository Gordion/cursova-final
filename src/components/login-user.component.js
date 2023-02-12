import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Card from "react-bootstrap/Card";
import banner from "./maxresdefault.jpg";
import regions from "./Lviv_regions.svg";
import { withRouter } from "./withRouter";

class LoginUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      password: "",
    };
  }

  onChangeUserName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeUserPassword(e) {
    this.setState({ password: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(0);
    const userObject = {
      name: this.state.name,
      password: this.state.password,
    };
    axios
      .post("http://localhost:4000/user/login-user", userObject)
      .then((res) => {
        console.log("/user/login-user", res);
        if (res.error) {
          alert("Error");
          return;
        }
        console.log("onlogin", res.data);
        const { _id, name } = res.data.user;
        localStorage.setItem("user", JSON.stringify({ _id, name }));
        console.log(this.props, "props");
        this.props.navigate("/admin-page");
        this.props.onLogin(name);
      })
      .catch((e) => {
        console.log(">>>", e);
        alert(/*e.response?.data?.error ||*/ "Неправильний логін або пароль");
      });

    this.setState({ name: "", password: "" });
  }

  render() {
    return (
      <div className="App">
        <div className="App-form">
          <div className="form-wrapper">
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.name}
                  onChange={this.onChangeUserName}
                />
              </Form.Group>

              <Form.Group controlId="Password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={this.state.password}
                  onChange={this.onChangeUserPassword}
                />
              </Form.Group>

              <Button
                variant="primary"
                size="lg"
                block="block"
                type="submit"
                className="mt-4"
              >
                Login
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginUser);
