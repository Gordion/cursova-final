import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default class LoginStudent extends Component {

  constructor(props) {
    super(props)
    this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
    this.onChangeStudentPassword = this.onChangeStudentPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      password: ''
    }
  }

  onChangeUserName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeUserPassword(e) {
    this.setState({ password: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const studentObject = {
      email: this.state.email,
      password: this.state.password
    };
    axios.post('http://localhost:4000/user/login-student', studentObject)
      .then((res) => {
        if (res.error) {
          alert('Error');
          return;
        }
        console.log("onlogin", res.data);
        const { _id, name } = res.data.user;
        localStorage.setItem('user', JSON.stringify({ _id, name }));

        if (name == 'Admin') {
          this.props.history.push('/student-list');
        }
        else {
          this.props.history.push('/user-page');
        }
        this.props.onLogin(name);
      }
    ).catch((e) => {
      console.log('>>>', e);
      alert('Неправильний логін або пароль');
    });

    this.setState({ email: '', password: '' })
  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>

        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeUserName} />
        </Form.Group>

        <Form.Group controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={this.state.password} onChange={this.onChangeUserPassword} />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit" className="mt-4">
          Login
        </Button>
      </Form>
    </div>);
  }
}
