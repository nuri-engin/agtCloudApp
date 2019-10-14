import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';

class Farm extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('farms');
    this.unsubscribe = null;
    this.state = {
      farms: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const farms = [];
    querySnapshot.forEach((doc) => {
      const { title, description, id } = doc.data();
      farms.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        id,
      });
    });
    this.setState({
      farms
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
              FARM LIST
            </h3>
          </div>
          <div className="panel-body">
            <div>
              <h4><Link to="/createfarm" className="btn btn-primary">Add Farm</Link></h4>
              <h4><Link to="/" className="btn btn-info">Return Main</Link></h4>
            </div>
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>ID</th>
                </tr>
              </thead>
              <tbody>
                {this.state.farms.map(farms =>
                  <tr key={farms.key}>
                    <td><Link to={`/showfarm/${farms.key}`}>{farms.title}</Link></td>
                    <td>{farms.description}</td>
                    <td>{farms.id}</td>
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

export default Farm;
