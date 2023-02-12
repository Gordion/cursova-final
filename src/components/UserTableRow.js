import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

export default class UserTableRow extends Component {
  constructor(props) {
    super(props)
    this.deleteStudent = this.deleteStudent.bind(this)
  }

  deleteStudent() {
    axios
      .delete(
        'http://localhost:4000/user/delete-student/' + this.props.obj._id,
      )
      .then((res) => {
        console.log('Student successfully deleted!')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.grammar}</td>
        <td>{this.props.obj.listening}</td>
        <td>{this.props.obj.reading}</td>
        <td>{this.props.obj.useOfEnglish}</td>
        <td>{this.props.obj.vocabulary}</td>
      </tr>
    )
  }
}
