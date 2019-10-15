import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';

class User extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('users');
    this.unsubscribe = null;
    this.state = {
      users: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      const { id, name, surname, email, isactive, isconfirmed } = doc.data();
      users.push({
        key: doc.id,
        doc, // DocumentSnapshot
        id,
        name,
        surname,
        email,
        isactive,
        isconfirmed
      });
    });
    this.setState({
      users
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              USER LIST
            </h3>
          </div>
          <div className="panel-body">
            <div>
              <h4><Link to="/createuser" className="btn btn-primary">Add User</Link></h4>
              <h4><Link to="/" className="btn btn-info">Return Main</Link></h4>
            </div>
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Email</th>
                  <th>Active</th>
                  <th>Confirmed</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map(user =>
                  <tr key={user.key}>
                    <td><Link to={`/showuser/${user.key}`}>{user.id}</Link></td>
                    <td>{user.name}</td>
                    <td>{user.surname}</td>
                    <td>{user.email}</td>
                    <td>{user.isactive}</td>
                    <td>{user.isconfirmed}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
