import React, { Component } from 'react';
import firebase from '../../Firebase';
import { Link } from 'react-router-dom';

class ShowU extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('users').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          user: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('users').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/user")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
          <h4><Link to="/user">User List</Link></h4>
            <h3 className="panel-title">
              {this.state.user.title}
            </h3>
          </div>
          <div className="panel-body">
            <dl>
              <dt>ID:</dt>
              <dd>{this.state.user.id}</dd>
              <dt>Name:</dt>
              <dd>{this.state.user.name}</dd>
              <dt>Surname:</dt>
              <dd>{this.state.user.surname}</dd>
              <dt>Email:</dt>
              <dd>{this.state.user.email}</dd>
              <dt>Active:</dt>
              <dd>{this.state.user.active}</dd>
              <dt>Confirmed:</dt>
              <dd>{this.state.user.confirmed}</dd>
            </dl>
            <Link to={`/edituser/${this.state.key}`} className="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowU;
