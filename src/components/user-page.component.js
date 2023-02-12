import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import UserTableRow from './UserTableRow';


export default class UserPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      users: []
    };
  }




  componentDidMount() {
    let user= JSON.parse(localStorage.getItem('user'));
  axios.post('http://localhost:4000/user/get-lessons/', {_id:user._id})
      .then(res => {
        console.log("res", res);
        this.setState({

          users: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    return this.state.users.map((res, i) => {
      return <UserTableRow obj={res} key={i} />;
    });
  }


  render() {
    return (<div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Grammar</th>
            <th>Listening</th>
            <th>Reading</th>
            <th>Use of English</th>
            <th>Vocabulary</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}
