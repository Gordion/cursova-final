import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class CreateStudent extends Component {
  //   constructor(props) {
  //     super(props);

  //     this.onChangeStudentName = this.onChangeStudentName.bind(this);
  //     this.onChangeStudentPassword = this.onChangeStudentPassword.bind(this);
  //     this.onSubmit = this.onSubmit.bind(this);

  //     this.state = {
  //       name: "",
  //       password: "",
  //     };
  //   }

  //   onChangeStudentName(e) {
  //     this.setState({ name: e.target.value });
  //   }

  //   onChangeStudentPassword(e) {
  //     this.setState({ password: e.target.value });
  //   }

  //   onSubmit(e) {
  //     e.preventDefault();

  //     const studentObject = {
  //       name: this.state.name,
  //       password: this.state.password,
  //     };
  //     axios
  //       .post("http://localhost:4000/user/create-user", studentObject)
  //       .then((res) => console.log(res.data));
  //     this.props.history.push("/login-user");
  //     this.setState({ name: "", password: "" });
  //   }

  render() {
    return (
      <div className="form-wrapper">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              //   value={this.state.name}
              //   onChange={this.onChangeStudentName}
            />
          </Form.Group>

          <Form.Group controlId="Password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              //   value={this.state.password}
              //   onChange={this.onChangeStudentPassword}
            />
          </Form.Group>

          <Button
            variant="danger"
            size="lg"
            block="block"
            type="submit"
            className="mt-4"
          >
            Create Student
          </Button>
        </Form>
      </div>
    );
  }
}
