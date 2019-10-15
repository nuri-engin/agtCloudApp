import React, { Component } from 'react';
import firebase from '../../Firebase';
import { Link } from 'react-router-dom';

class CreateU extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('users');
    this.state = {
      id: '',
      name: '',
      surname: '',
      email: '',
      isactive: '',
      isconfirmed: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { id, name, surname, email, isactive, isconfirmed } = this.state;

    this.ref.add({
      id,
      name,
      surname,
      email,
      isactive,
      isconfirmed
    }).then((docRef) => {
      this.setState({
        id: '',
        name: '',
        surname: '',
        email: '',
        isactive: '',
        isconfirmed: ''
      });
      this.props.history.push("/user")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { id, name, surname, email, isactive, isconfirmed } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              ADD USER
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/user" className="btn btn-primary">User List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="id">ID:</label>
                <input type="text" className="form-control" name="id" defaultValue={id} onChange={this.onChange} placeholder="ID" />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <textarea className="form-control" name="name" value={name} onChange={this.onChange} placeholder="Name" />
              </div>
              <div className="form-group">
                <label htmlFor="surname">Surname:</label>
                <input type="text" className="form-control" name="surname" defaultValue={surname} onChange={this.onChange} placeholder="Surname" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="text" className="form-control" name="email" defaultValue={email} onChange={this.onChange} placeholder="Email" />
              </div>
              <div className="form-group">
                <label htmlFor="isactive">Active:</label>
                <input type="checkbox" className="form-control" name="isactive" defaultValue={isactive} onChange={this.onChange} placeholder="Active" />
              </div>
              <div className="form-group">
                <label htmlFor="isconfirmed">Confirmed:</label>
                <input type="checkbox" className="form-control" name="isconfirmed" defaultValue={isconfirmed} onChange={this.onChange} placeholder="Confirmed" />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateU;